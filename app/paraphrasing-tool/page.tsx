"use client";
import { useState } from "react";

const tones = ["Standard", "Formal", "Creative"];

export default function ParaphrasingTool() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Standard");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const paraphrase = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "paraphrase", text, option: tone.toLowerCase() }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Paraphrasing Tool</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>
      </div>
      <p className="text-gray-500 mb-6">Rewrite your text in Standard, Formal or Creative tone using AI. Free, no login required.</p>

      <div className="flex gap-2 mb-6">
        {tones.map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tone === t
                ? "bg-purple-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Input Text <span className="text-gray-400">({text.length}/3000)</span>
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Paste your text here to paraphrase..."
            value={text}
            maxLength={3000}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Paraphrased Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Paraphrased text will appear here..."
            value={loading ? "Paraphrasing..." : result}
            readOnly
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={paraphrase}
          disabled={!text.trim() || loading}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Paraphrasing..." : "Paraphrase"}
        </button>
        {result && (
          <button onClick={copyToClipboard} className="text-sm text-purple-600 hover:text-purple-800">
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        )}
        {text && (
          <button onClick={() => { setText(""); setResult(""); setError(""); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is a paraphrasing tool?", a: "A paraphrasing tool rewrites your text while keeping the same meaning. It is useful for avoiding repetition, improving clarity, and adapting content for different audiences." },
            { q: "What is the difference between the tones?", a: "Standard tone rewrites naturally, Formal tone uses professional language suitable for business or academic writing, and Creative tone uses more expressive and varied language." },
            { q: "Is the paraphrased text plagiarism free?", a: "Our AI rewrites text in a unique way, but we always recommend reviewing the output and adding your own voice before publishing." },
            { q: "What is the maximum text length?", a: "You can paraphrase up to 3000 characters at a time for best results." },
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