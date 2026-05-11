"use client";
import { useState } from "react";

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [corrected, setCorrected] = useState("");
  const [changes, setChanges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const checkGrammar = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setCorrected("");
    setChanges([]);
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "grammar", text }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        const clean = data.result.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        setCorrected(parsed.corrected || "");
        setChanges(parsed.changes || []);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Grammar Checker</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>
      </div>
      <p className="text-gray-500 mb-6">Fix grammar and spelling errors instantly using AI. See exactly what was changed.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Input Text <span className="text-gray-400">({text.length}/10000)</span>
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Paste your text here to check grammar..."
            value={text}
            maxLength={10000}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Corrected Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800"
            placeholder="Corrected text will appear here..."
            value={loading ? "Checking grammar..." : corrected}
            readOnly
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={checkGrammar}
          disabled={!text.trim() || loading}
          className="w-full sm:w-auto px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Checking..." : "Check Grammar"}
        </button>
        {corrected && (
          <button onClick={copyToClipboard} className="text-sm text-purple-600 hover:text-purple-800">
            {copied ? "Copied!" : "Copy corrected text"}
          </button>
        )}
        {text && (
          <button onClick={() => { setText(""); setCorrected(""); setChanges([]); setError(""); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      {changes.length > 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-gray-700 mb-3">
            Changes Made <span className="text-purple-600">({changes.length})</span>
          </h2>
          <ul className="space-y-2">
            {changes.map((change, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-0.5 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                {change}
              </li>
            ))}
          </ul>
        </div>
      )}

      {corrected && changes.length === 0 && !loading && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700 font-medium">✓ No grammar errors found. Your text looks great!</p>
        </div>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What errors does the grammar checker fix?", a: "Our AI grammar checker fixes spelling mistakes, punctuation errors, subject-verb agreement, tense inconsistencies, and sentence structure issues." },
            { q: "Does it show what was changed?", a: "Yes, every correction is listed below the result so you can see exactly what was fixed and why." },
            { q: "Is it suitable for academic writing?", a: "Yes, the grammar checker works well for essays, reports, emails, blog posts, and academic writing." },
            { q: "What is the maximum text length?", a: "You can check up to 10000 characters at a time for best results." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Grammar Checker?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A grammar checker is a tool that scans your text for grammatical errors, spelling mistakes, punctuation issues, and sentence structure problems, then provides corrections and explains what was changed.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Grammar Checker</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your text into the left box and click Check Grammar. The AI analyses your writing, displays the corrected version on the right, and lists every change made below so you can learn from each correction.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">What Errors Does It Fix?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Subject-verb agreement errors. Incorrect tense usage. Missing or misplaced punctuation. Spelling mistakes. Run-on sentences. Sentence fragments. Incorrect article usage (a vs an). Misused homophones (their, there, they're).</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Grammar Checkers?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Students proofreading essays and assignments. Professionals polishing emails and reports. Non-native English speakers improving writing confidence. Bloggers ensuring error-free content. Job seekers reviewing cover letters and CVs.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits Over Basic Spell Checkers</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Unlike basic spell checkers in word processors, our AI grammar checker understands context. It can detect correctly spelled words used incorrectly, identify grammatical structure issues, and provide a full list of every correction made with explanations.</p>
        </div>
      </div>
    </div>
  );
}