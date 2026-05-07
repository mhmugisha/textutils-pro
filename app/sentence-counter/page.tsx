"use client";
import { useState } from "react";

export default function SentenceCounter() {
  const [text, setText] = useState("");

  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const avgWordsPerSentence = sentences === 0 ? 0 : Math.round(words / sentences);
  const avgSentencesPerParagraph = paragraphs === 0 ? 0 : Math.round(sentences / paragraphs);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sentence Counter</h1>
      <p className="text-gray-500 mb-6">Count sentences, paragraphs and get average sentence length instantly.</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Sentences", value: sentences },
          { label: "Words", value: words },
          { label: "Paragraphs", value: paragraphs },
          { label: "Avg Words/Sentence", value: avgWordsPerSentence },
          { label: "Avg Sentences/Para", value: avgSentencesPerParagraph },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <textarea
        className="w-full h-72 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {text && (
        <button onClick={() => setText("")} className="mt-3 text-sm text-red-500 hover:text-red-700">
          Clear text
        </button>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How are sentences counted?", a: "Sentences are counted by detecting punctuation marks such as periods, exclamation marks and question marks." },
            { q: "What is a good average sentence length?", a: "For clear, readable writing, aim for an average of 15 to 20 words per sentence. Shorter sentences are easier to read." },
            { q: "How are paragraphs counted?", a: "Paragraphs are counted by detecting line breaks in your text. Each block of text separated by a blank line counts as one paragraph." },
            { q: "Can I use this for essays and articles?", a: "Yes, this tool is perfect for checking the structure and readability of essays, articles, and blog posts." },
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