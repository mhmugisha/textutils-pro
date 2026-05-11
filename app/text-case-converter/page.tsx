"use client";
import { useState } from "react";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [converted, setConverted] = useState("");

  const toUpperCase = () => setConverted(text.toUpperCase());
  const toLowerCase = () => setConverted(text.toLowerCase());
  const toTitleCase = () => setConverted(text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
  const toSentenceCase = () => setConverted(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  const toAlternatingCase = () => setConverted(text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(""));

  const copyToClipboard = () => navigator.clipboard.writeText(converted);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Text Case Converter</h1>
      <p className="text-gray-500 mb-6">Convert your text to uppercase, lowercase, title case or sentence case instantly.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "UPPER CASE", fn: toUpperCase },
          { label: "lower case", fn: toLowerCase },
          { label: "Title Case", fn: toTitleCase },
          { label: "Sentence case", fn: toSentenceCase },
          { label: "aLtErNaTiNg", fn: toAlternatingCase },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.fn}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {btn.label}
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Converted Text</label>
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            placeholder="Converted text will appear here..."
            value={converted}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        {converted && (
          <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:text-blue-800">
            Copy to clipboard
          </button>
        )}
        {text && (
          <button onClick={() => { setText(""); setConverted(""); }} className="text-sm text-red-500 hover:text-red-700">
            Clear
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is title case?", a: "Title case capitalizes the first letter of every word. It is commonly used for headings, titles, and proper nouns." },
            { q: "What is sentence case?", a: "Sentence case capitalizes only the first letter of each sentence, just like normal writing." },
            { q: "Can I convert large amounts of text?", a: "Yes, there is no limit on the amount of text you can convert." },
            { q: "Does it work in real time?", a: "The conversion happens instantly when you click any of the case buttons." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Text Case Converter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A text case converter is a tool that transforms the capitalization of your text into different formats instantly. Instead of manually retyping or editing text letter by letter, you can convert entire documents in one click.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Text Case Converter</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your text in the left box, then click any of the five conversion buttons: UPPER CASE, lower case, Title Case, Sentence case, or aLtErNaTiNg case. The converted text appears instantly in the right box ready to copy.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">When to Use Each Case</h2>
          <p className="text-sm text-gray-500 leading-relaxed">UPPER CASE: headings, acronyms, emphasis. lower case: casual writing, code variables. Title Case: article titles, book titles, headings. Sentence case: normal prose, emails, blog posts. Alternating case: memes, sarcastic social media posts.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Text Case Converters?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Writers fixing accidentally capitalized text. Developers formatting variable names. Social media managers creating visual emphasis. Students correcting copy-pasted text. Designers formatting headlines consistently.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Converts entire documents in one click, supports five different case formats, shows both input and output simultaneously, and includes a copy to clipboard button for instant use.</p>
        </div>
      </div>
    </div>
  );
}