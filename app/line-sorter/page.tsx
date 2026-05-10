"use client";
import { useState } from "react";

export default function LineSorter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const sort = (type: "az" | "za" | "random" | "length" | "reverse") => {
    const lines = text.split("\n");
    let sorted: string[];
    if (type === "az") sorted = [...lines].sort((a, b) => a.localeCompare(b));
    else if (type === "za") sorted = [...lines].sort((a, b) => b.localeCompare(a));
    else if (type === "random") sorted = [...lines].sort(() => Math.random() - 0.5);
    else if (type === "length") sorted = [...lines].sort((a, b) => a.length - b.length);
    else sorted = [...lines].reverse();
    setResult(sorted.join("\n"));
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    { label: "A → Z", type: "az" as const },
    { label: "Z → A", type: "za" as const },
    { label: "Reverse Order", type: "reverse" as const },
    { label: "By Length", type: "length" as const },
    { label: "Randomize", type: "random" as const },
  ];

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Line Sorter</h1>
      <p className="text-gray-500 mb-6">Sort lines alphabetically, by length, in reverse order, or randomly. Free, no login required.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => sort(btn.type)}
            disabled={!text}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Input Lines</label>
          <textarea
            className="w-full h-72 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Paste your lines here, one item per line..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Sorted Lines</label>
          <textarea
            className="w-full h-72 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Sorted lines will appear here..."
            value={result}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        {result && (
          <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:text-blue-800">
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        )}
        {text && (
          <button onClick={() => { setText(""); setResult(""); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How does alphabetical sorting work?", a: "Lines are sorted from A to Z based on the first character of each line. Numbers come before letters in ascending order." },
            { q: "What does sorting by length do?", a: "Lines are arranged from shortest to longest based on the number of characters in each line." },
            { q: "Can I sort a large list?", a: "Yes, there is no limit on the number of lines you can sort." },
            { q: "What is randomize used for?", a: "Randomizing lines is useful for shuffling lists, creating random question orders, or mixing up content for creative purposes." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Line Sorter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A line sorter is a text tool that reorganises lines of text into a different order. It can sort lines alphabetically from A to Z or Z to A, arrange them by length, reverse their current order, or shuffle them randomly.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Line Sorter</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your list into the left box, then click any sorting button: A to Z, Z to A, Reverse Order, By Length, or Randomize. The sorted result appears instantly in the right box ready to copy.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Five Sorting Modes</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A to Z: alphabetical ascending order. Z to A: alphabetical descending order. Reverse Order: flips the current sequence of lines. By Length: shortest lines first. Randomize: shuffles lines in a random order — useful for creating random question sets or shuffling lists.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Line Sorters?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Teachers randomising quiz questions. Developers sorting configuration entries. Writers organising bullet point lists. Data analysts sorting exported text data. SEO professionals organising keyword lists alphabetically.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Sorts lists of any size instantly, supports five different sorting modes, preserves the exact text of each line, and includes a copy to clipboard button.</p>
        </div>
      </div>
    </div>
  );
}