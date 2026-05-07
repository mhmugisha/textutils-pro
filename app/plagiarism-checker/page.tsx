"use client";
import { useState } from "react";

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState("");
  const [flagged, setFlagged] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkOriginality = async () => {
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
    if (s >= 60) return { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };

  const colors = score !== null ? getScoreColor(score) : null;

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Originality Checker</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>
      </div>
      <p className="text-gray-500 mb-2">Analyse your text for original expression and natural writing patterns using AI.</p>
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
        <p className="text-xs text-blue-600">ℹ️ This tool analyses writing originality and expression patterns using AI. It does not search the internet or compare against external databases.</p>
      </div>

      <textarea
        className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 mb-2"
        placeholder="Paste your text here to check originality..."
        value={text}
        maxLength={3000}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">{text.length}/3000 characters</span>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={checkOriginality}
          disabled={!text.trim() || loading}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Analysing..." : "Check Originality"}
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
              <div className="text-sm text-gray-500 mt-1">Originality Score</div>
            </div>
            <div>
              <p className={`font-semibold ${colors.text} mb-1`}>
                {score >= 80 ? "Highly Original" : score >= 60 ? "Mostly Original" : "Low Originality"}
              </p>
              <p className="text-sm text-gray-600">{verdict}</p>
            </div>
          </div>

          {flagged.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-700 mb-3">Flagged Phrases ({flagged.length})</h2>
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
              <p className="text-sm text-green-700 font-medium">✓ No low-originality phrases detected.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What does the Originality Checker do?", a: "It uses AI to analyse your text for original expression, natural writing patterns, and creative language use. It identifies phrases that feel generic or overly common." },
            { q: "Is this the same as a plagiarism checker?", a: "No. This tool analyses writing originality and expression using AI. It does not search the internet or compare your text against external databases like Copyscape or Turnitin." },
            { q: "What does the originality score mean?", a: "A score of 80 or above means your text uses highly original expression. Between 60 and 79 means mostly original with some generic phrasing. Below 60 suggests the writing relies heavily on common or formulaic language." },
            { q: "What are flagged phrases?", a: "Flagged phrases are sections of your text that appear overly generic, formulaic, or lacking in original expression." },
            { q: "Is this tool free?", a: "Yes, completely free with no login or account required." },
          ].map((faq) => (
            <div key={faq.q} className="bg-white border border-gray-100 rounded-xl p-4">
              <h3 className="font-medium text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}