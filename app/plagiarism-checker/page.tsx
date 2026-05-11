"use client";
import { useState } from "react";

export default function AIContentChecker() {
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState("");
  const [flagged, setFlagged] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkContent = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setScore(null);
    setVerdict("");
    setFlagged([]);
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "plagiarism", text }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        const clean = data.result.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        setScore(parsed.score ?? null);
        setVerdict(parsed.verdict || "");
        setFlagged(parsed.flagged || []);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (s >= 50) return { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };

  const getVerdict = (s: number) => {
    if (s >= 80) return "Likely Human Written";
    if (s >= 50) return "Possibly AI Assisted";
    return "Likely AI Generated";
  };

  const colors = score !== null ? getScoreColor(score) : null;

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">AI Content Checker</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>
      </div>
      <p className="text-gray-500 mb-2">Detect AI-generated content in any text instantly. Find out if a document was written by ChatGPT, Claude, or other AI tools.</p>
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
        <p className="text-xs text-blue-600">ℹ️ This tool analyses text for patterns commonly associated with AI-generated content such as those from ChatGPT, Claude, Gemini and other AI writing tools.</p>
      </div>

      <textarea
        className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 mb-2"
        placeholder="Paste your text here to check for AI content..."
        value={text}
        maxLength={10000}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">{text.length}/10000 characters</span>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={checkContent}
          disabled={!text.trim() || loading}
          className="w-full sm:w-auto px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Analysing..." : "Check for AI Content"}
        </button>
        {text && (
          <button onClick={() => { setText(""); setScore(null); setVerdict(""); setFlagged([]); setError(""); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      {score !== null && colors && (
        <div className="mt-8 space-y-4">
          <div className={`${colors.bg} border ${colors.border} rounded-xl p-6 flex items-center gap-6`}>
            <div className="text-center">
              <div className={`text-5xl font-bold ${colors.text}`}>{score}%</div>
              <div className="text-sm text-gray-500 mt-1">Human Score</div>
            </div>
            <div>
              <p className={`font-semibold ${colors.text} mb-1`}>{getVerdict(score)}</p>
              <p className="text-sm text-gray-600">{verdict}</p>
            </div>
          </div>

          {flagged.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-700 mb-3">AI Patterns Detected ({flagged.length})</h2>
              <ul className="space-y-2">
                {flagged.map((phrase, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 w-5 h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">!</span>
                    {phrase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {flagged.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700 font-medium">✓ No AI patterns detected.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What does the AI Content Checker do?", a: "It uses AI to analyse your text and determine whether it was likely written by a human or generated by an AI tool such as ChatGPT, Claude, or Gemini." },
            { q: "What does the Human Score mean?", a: "A score of 80 or above suggests the text is likely written by a human. Between 50 and 79 suggests the text may be partially AI-assisted. Below 50 suggests the text is likely AI-generated." },
            { q: "What AI tools can it detect?", a: "The checker looks for patterns common to all major AI writing tools including ChatGPT, Claude, Gemini, Llama, and others. It detects writing style patterns rather than specific tool signatures." },
            { q: "What are the flagged patterns?", a: "Flagged patterns are characteristics commonly associated with AI-generated writing such as overly formal tone, generic transitions, lack of personal voice, and perfect grammar throughout." },
            { q: "Is this tool free?", a: "Yes, completely free with no login or account required." },
          ].map((faq) => (
            <div key={faq.q} className="bg-white border border-gray-100 rounded-xl p-4">
              <h3 className="font-medium text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">What is an AI Content Checker?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">An AI content checker analyses text to determine whether it was written by a human or generated by an AI tool such as ChatGPT, Claude, Gemini, or other large language models. It identifies patterns and characteristics commonly associated with AI-generated writing.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the AI Content Checker</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste the text you want to analyse into the box above and click Check for AI Content. The tool returns a Human Score from 0 to 100, a verdict, and a list of phrases or patterns that suggest AI generation.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">What Does the Human Score Mean?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A score of 80 to 100 suggests the text is likely written by a human. A score of 50 to 79 suggests the text may be partially AI-assisted. A score below 50 suggests the text is likely AI-generated.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Signs of AI-Generated Text</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Overly formal and consistent tone throughout. Perfect grammar with no natural imperfections. Generic transitions like "Furthermore", "Moreover", and "In conclusion". Lack of personal voice, anecdotes, or opinions. Repetitive sentence structures. Unusually comprehensive coverage of a topic without depth.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses AI Content Checkers?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Teachers and professors checking student submissions. Editors reviewing freelance writer submissions. Publishers verifying content authenticity. HR professionals screening job applications. Content managers auditing website copy.</p>
        </div>
      </div>
    </div>
  );
}
