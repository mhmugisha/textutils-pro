import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript, YoutubeTranscriptDisabledError, YoutubeTranscriptNotAvailableError } from "youtube-transcript";

const RATE_LIMIT = new Map<string, number>();

function getRequestIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function isAllowed(ip: string) {
  const now = Date.now();
  const resetTime = RATE_LIMIT.get(ip) ?? 0;
  return now >= resetTime;
}

function markSuccess(ip: string) {
  RATE_LIMIT.set(ip, Date.now() + 60 * 60 * 1000);
}

const YOUTUBE_ID_REGEX = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/;

function extractVideoId(url?: string) {
  if (!url || typeof url !== "string") return null;

  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.toLowerCase();
    if (hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split(/[?#]/)[0];
    }
    if (hostname.includes("youtube.com") || hostname.includes("youtube-nocookie.com")) {
      const params = parsed.searchParams.get("v");
      if (params) return params;
      const parts = parsed.pathname.split("/").filter(Boolean);
      const embedIndex = parts.indexOf("embed");
      if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
      const shortsIndex = parts.indexOf("shorts");
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
    }
  } catch (error) {
    // ignore invalid URL parsing
  }

  const match = url.match(YOUTUBE_ID_REGEX);
  return match?.[1] ?? null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const videoUrl = typeof body.videoUrl === "string" ? body.videoUrl.trim() : "";
  const providedIp = typeof body.ip === "string" ? body.ip.trim() : "";
  const ip = providedIp || getRequestIp(req);

  if (!videoUrl) {
    return NextResponse.json({ error: "Please provide a valid YouTube URL." }, { status: 400 });
  }

  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    return NextResponse.json({ error: "Please provide a valid YouTube URL." }, { status: 400 });
  }

  let rawTranscriptItems;
  try {
    rawTranscriptItems = await fetchTranscript(videoId);
  } catch (error) {
    if (
      error instanceof YoutubeTranscriptNotAvailableError ||
      error instanceof YoutubeTranscriptDisabledError
    ) {
      return NextResponse.json(
        { error: "This video does not have captions available. Please try a different video." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "This video does not have captions available. Please try a different video." },
      { status: 400 }
    );
  }

  if (!Array.isArray(rawTranscriptItems) || rawTranscriptItems.length === 0) {
    return NextResponse.json(
      { error: "This video does not have captions available. Please try a different video." },
      { status: 404 }
    );
  }

  const durationMs = Math.max(...rawTranscriptItems.map((item: any) => {
    const offset = typeof item.offset === "number" ? item.offset : Number(item.offset) || 0;
    const duration = typeof item.duration === "number" ? item.duration : Number(item.duration) || 0;
    return offset + duration;
  }));
  const durationSeconds = Math.round(durationMs / 1000);
  if (durationSeconds > 3600) {
    return NextResponse.json(
      { error: "This video exceeds the 1 hour limit. Please try a shorter video." },
      { status: 400 }
    );
  }

  if (!isAllowed(ip)) {
    return NextResponse.json(
      { error: "You have reached the free limit of 1 transcription per hour. Please try again in an hour." },
      { status: 429 }
    );
  }

  const rawTranscript = rawTranscriptItems
    .map((item: any) => String(item.text || "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!rawTranscript) {
    return NextResponse.json(
      { error: "This video does not have captions available. Please try a different video." },
      { status: 404 }
    );
  }

  const prompt = `Clean up and format the following YouTube video transcript. Add proper punctuation, fix capitalization, remove filler words like 'um' and 'uh', and organize into proper paragraphs. Return only the cleaned transcript with no explanation or preamble:\n\n${rawTranscript}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const transcript = data?.content?.[0]?.text?.trim();

    if (!transcript) {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    markSuccess(ip);
    const wordCount = transcript.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({ transcript, wordCount, duration: durationSeconds });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
