"use client";
import { useState } from "react";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"characters" | "words" | "lines">("characters");
  const [copied, setCopied] = useState(false);

  const getReversed = () => {
    if (!text.trim()) return "";
    if (mode === "characters") return text.split("").reverse().join("");
    if (mode === "words") return text.split(" ").reverse().join(" ");
    if (mode === "lines") return text.split("\n").reverse().join("\n");
    return "";
  };

  const reversed = getReversed();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reversed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Text Reverser</h1>
      <p className="text-gray-500 mb-6">Reverse any text by characters, words or lines instantly. Free, no login required.</p>

      <div className="flex gap-2 mb-6">
        {(["characters", "words", "lines"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Reverse {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Input Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Reversed Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Reversed text will appear here..."
            value={reversed}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        {reversed && (
          <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:text-blue-800">
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        )}
        {text && (
          <button onClick={() => setText("")} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What does reversing characters do?", a: "Reversing characters flips every single character in your text so the last character becomes the first. For example 'hello' becomes 'olleh'." },
            { q: "What does reversing words do?", a: "Reversing words keeps each word intact but flips the order so the last word becomes the first." },
            { q: "What does reversing lines do?", a: "Reversing lines keeps each line intact but flips the order so the last line becomes the first. Useful for reversing lists." },
            { q: "What is text reversal used for?", a: "Text reversal is used for puzzles, encoding messages, testing string functions in programming, and creative writing effects." },
            { q: "Is this tool free?", a: "Completely free with no account or login required." },
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