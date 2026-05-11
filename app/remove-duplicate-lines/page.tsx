"use client";
import { useState } from "react";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [removedCount, setRemovedCount] = useState<number | null>(null);

  const removeDuplicates = () => {
    const lines = text.split("\n");
    const unique = [...new Set(lines)];
    setRemovedCount(lines.length - unique.length);
    setResult(unique.join("\n"));
  };

  const copyToClipboard = () => navigator.clipboard.writeText(result);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Remove Duplicate Lines</h1>
      <p className="text-gray-500 mb-6">Paste your list and instantly remove all duplicate lines. Free, no login required.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Input Text</label>
          <textarea
            className="w-full h-72 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Paste your list here, one item per line..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Result {removedCount !== null && (
              <span className="text-green-600 font-semibold">— {removedCount} duplicate{removedCount !== 1 ? "s" : ""} removed</span>
            )}
          </label>
          <textarea
            className="w-full h-72 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Cleaned list will appear here..."
            value={result}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={removeDuplicates}
          disabled={!text}
          className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition-colors"
        >
          Remove Duplicates
        </button>
        {result && (
          <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:text-blue-800">
            Copy result
          </button>
        )}
        {text && (
          <button onClick={() => { setText(""); setResult(""); setRemovedCount(null); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How does duplicate line removal work?", a: "The tool splits your text by line breaks and removes any line that appears more than once, keeping the first occurrence." },
            { q: "Is it case sensitive?", a: "Yes, the comparison is case sensitive. 'Apple' and 'apple' are treated as different lines." },
            { q: "Can I use it for large lists?", a: "Yes, there is no limit on the number of lines you can process." },
            { q: "Will it change the order of my lines?", a: "No, the original order is preserved. Only duplicate lines are removed." },
            { q: "Is this tool free?", a: "Completely free with no account or login required." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Duplicate Line Remover?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A duplicate line remover is a text cleaning tool that scans your list or document and removes any lines that appear more than once, keeping only the first occurrence of each unique line.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Duplicate Line Remover</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your list or text into the left box and click Remove Duplicates. The tool instantly shows the cleaned list in the right box and tells you exactly how many duplicate lines were removed.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Common Use Cases</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Cleaning email lists before a campaign. Removing duplicate keywords from an SEO list. Cleaning up exported database entries. Deduplicating product lists. Removing repeated lines from log files. Cleaning scraped data.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses This Tool?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Digital marketers cleaning mailing lists. Data analysts processing exported data. Developers cleaning log files. SEO professionals deduplicating keyword lists. Virtual assistants cleaning client spreadsheets.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Processes lists of any size instantly, preserves the original order of lines, shows a count of removed duplicates, and requires no login or account.</p>
        </div>
      </div>
    </div>
  );
}