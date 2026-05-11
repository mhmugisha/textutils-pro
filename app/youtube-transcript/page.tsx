"use client";
import { useState } from "react";
import { Copy, Download, Video } from "lucide-react";

const faqItems = [
  {
    question: "How does the YouTube transcript generator work?",
    answer: "It fetches the video captions and uses AI to clean and format them into readable text.",
  },
  {
    question: "Does the video need captions?",
    answer: "Yes, the video must have captions or auto-generated subtitles enabled by the video owner.",
  },
  {
    question: "What is the maximum video length?",
    answer: "Videos up to 1 hour long are supported.",
  },
  {
    question: "How many videos can I transcribe?",
    answer: "You can transcribe 1 video per hour for free with no login required.",
  },
  {
    question: "What can I use transcripts for?",
    answer: "Transcripts are useful for study notes, blog posts, subtitles, content repurposing, and making video content searchable.",
  },
];

const extractVideoId = (url: string) => {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase();
    if (host.includes("youtu.be")) return parsed.pathname.slice(1).split(/[?#]/)[0];
    if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const parts = parsed.pathname.split("/").filter(Boolean);
      const embedIndex = parts.indexOf("embed");
      if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
      const shortsIndex = parts.indexOf("shorts");
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
    }
  } catch {
    // ignore invalid URLs
  }
  const regex = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match?.[1] ?? null;
};

export default function YouTubeTranscriptPage() {
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setError("");
    setTranscript("");
    setWordCount(null);

    if (!url.trim()) {
      setError("Please paste a valid YouTube video URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/youtube-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: url }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setTranscript(data.transcript || "");
        setWordCount(data.wordCount || 0);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!transcript) return;
    const id = extractVideoId(url) ?? "transcript";
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `youtube-transcript-${id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-2xl font-bold text-gray-900">YouTube Transcript Generator</h1>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
              <Video size={14} /> AI
            </span>
          </div>
          <p className="text-gray-500 max-w-2xl">Convert any YouTube video to text instantly. Supports videos up to 1 hour long.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 mb-6 shadow-sm">
        <p className="text-sm text-gray-600">
          Free to use · Videos up to 1 hour · 1 transcription per hour · No login required
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">YouTube Video URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-2xl text-sm font-medium hover:bg-purple-700 disabled:opacity-60 transition-colors"
        >
          {loading ? "Transcribing video..." : "Generate Transcript"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {transcript && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                {wordCount ?? 0} words
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy size={16} /> {copied ? "Copied" : "Copy Transcript"}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors"
                >
                  <Download size={16} /> Download .txt
                </button>
              </div>
            </div>

            <textarea
              value={transcript}
              readOnly
              className="w-full h-96 rounded-3xl border border-gray-200 bg-slate-50 p-5 text-sm leading-6 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-3xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-800">{item.question}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What is a YouTube Transcript Generator?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">A YouTube transcript generator converts spoken audio from YouTube videos into written text. It is useful for students, content creators, researchers, and anyone who wants to read rather than watch video content.</p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Who Uses YouTube Transcript Generators?</h3>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li>Students taking notes from lecture videos.</li>
              <li>Bloggers repurposing video content into articles.</li>
              <li>Researchers extracting information from interviews.</li>
              <li>Content creators generating subtitles.</li>
              <li>Non-native speakers following along with difficult content.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits of Video Transcription</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Transcripts make video content searchable and accessible. They help with SEO when published alongside videos. They allow readers to consume content faster than watching. They provide accessibility for deaf and hard of hearing viewers.</p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Get the Best Results</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Use videos with clear speech and good audio quality. Educational content, interviews, and lectures tend to have the most accurate captions. Avoid videos with heavy background music or multiple overlapping speakers.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
