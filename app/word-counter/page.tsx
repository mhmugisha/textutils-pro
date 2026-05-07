"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Word Counter</h1>
      <p className="text-gray-500 mb-6">Count words, characters, sentences and paragraphs instantly. Free, no login required.</p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: characters },
          { label: "No Spaces", value: charactersNoSpaces },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Read Time", value: `${readingTime} min` },
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
            { q: "How does the word counter work?", a: "Our word counter splits your text by whitespace to count words, and analyses punctuation to count sentences and paragraphs in real time." },
            { q: "Is there a character limit?", a: "No. You can paste as much text as you need — there is no character limit on this tool." },
            { q: "Does it count spaces as characters?", a: "Yes, we show both characters with spaces and characters without spaces so you can use whichever metric you need." },
            { q: "How is reading time calculated?", a: "Reading time is based on an average reading speed of 200 words per minute." },
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