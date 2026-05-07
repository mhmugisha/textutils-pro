import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = RATE_LIMIT.get(ip);
  if (!limit || now > limit.resetTime) {
    RATE_LIMIT.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }
  if (limit.count >= 10) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 });
  }

  const { tool, text, option } = await req.json();

  if (!text || text.length > 3000) {
    return NextResponse.json({ error: "Text must be between 1 and 3000 characters." }, { status: 400 });
  }

  const prompts: Record<string, string> = {
    paraphrase: `Rewrite the following text in a ${option || "standard"} tone. Return only the rewritten text with no explanation:\n\n${text}`,
    grammar: `Correct all grammar and spelling errors in the following text. Return a JSON object with two fields: "corrected" (the corrected text) and "changes" (an array of strings describing each change made). Return only valid JSON:\n\n${text}`,
    summarize: `Summarize the following text in a ${option || "short"} summary. Return only the summary with no explanation:\n\n${text}`,
    plagiarism: `Analyse the following text for originality. Return a JSON object with: "score" (a number 0-100 representing originality percentage), "verdict" (a one-line verdict), and "flagged" (an array of phrases that seem unoriginal or overly common). Return only valid JSON:\n\n${text}`,
    expand: `Expand the following text into a fuller, more detailed version. Make it approximately ${option || "2"}x longer while keeping the same meaning and tone. Return only the expanded text:\n\n${text}`,
  };

  const prompt = prompts[tool];
  if (!prompt) {
    return NextResponse.json({ error: "Invalid tool." }, { status: 400 });
  }

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
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const result = data.content?.[0]?.text || "";
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}