"use client";
import { useState } from "react";

const multipliers = ["2", "3", "4"];

export default function TextExpander() {
  const [text, setText] = useState("");
  const [multiplier, setMultiplier] = useState("2");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const expand = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "expand", text, option: multiplier }),
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
        <h1 className="text-2xl font-bold text-gray-900">Text Expander</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>
      </div>
      <p className="text-gray-500 mb-6">Expand short text into a fuller, more detailed version using AI. Perfect for blog posts, emails and more.</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Expand to approximately</label>
        <div className="flex gap-2">
          {multipliers.map((m) => (
            <button
              key={m}
              onClick={() => setMultiplier(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                multiplier === m
                  ? "bg-purple-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m}x longer
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Input Text <span className="text-gray-400">({text.length}/10000)</span>
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Paste your short text here to expand..."
            value={text}
            maxLength={10000}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Expanded Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Expanded text will appear here..."
            value={loading ? "Expanding..." : result}
            readOnly
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={expand}
          disabled={!text.trim() || loading}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Expanding..." : "Expand Text"}
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
            { q: "What is a text expander?", a: "A text expander takes short or brief text and rewrites it into a longer, more detailed version while keeping the original meaning and tone intact." },
            { q: "What can I use text expansion for?", a: "Text expansion is great for turning bullet points into paragraphs, expanding email drafts, fleshing out blog post outlines, and enriching short product descriptions." },
            { q: "Will the expanded text sound natural?", a: "Yes, our AI maintains the original tone and voice while adding relevant detail and context to make the expanded text read naturally." },
            { q: "What is the maximum input length?", a: "You can expand up to 10000 characters at a time for best results." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Text Expander?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A text expander uses AI to take short, brief text and rewrite it into a longer, more detailed version while preserving the original meaning, tone, and intent. It is like having an AI writing assistant that fleshes out your ideas.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Text Expander</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your short text into the left box, select how much longer you want it (2x, 3x, or 4x), and click Expand Text. The AI generates an expanded version that maintains your original voice and meaning.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Three Expansion Levels</h2>
          <p className="text-sm text-gray-500 leading-relaxed">2x longer: adds supporting detail and context to your original text. 3x longer: significantly expands with examples, explanations, and elaboration. 4x longer: produces a comprehensive, fully developed version of your original text.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Text Expanders?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Bloggers expanding outline bullet points into full paragraphs. Email marketers fleshing out campaign drafts. Students developing brief notes into full essays. Social media managers creating longer LinkedIn posts from short ideas. Business professionals expanding brief summaries into full reports.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits of AI Text Expansion</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Unlike simply adding filler words, our AI expander adds genuine value — relevant details, context, examples, and explanations that make the expanded text more informative and engaging than the original.</p>
        </div>
      </div>
    </div>
  );
}