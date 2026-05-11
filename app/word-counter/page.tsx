"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = words === 0 ? 0 : Math.ceil(words / 200);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Word Counter</h1>
      <p className="text-gray-500 mb-6">Count words, characters, sentences, paragraphs and reading time instantly. Free, no login required.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
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
            { q: "How are words counted?", a: "Words are counted by splitting your text on spaces and line breaks. Each continuous sequence of non-space characters counts as one word." },
            { q: "What is reading time?", a: "Reading time is estimated at 200 words per minute, which is the average reading speed for adults." },
            { q: "Is there a word limit?", a: "No limit. Paste as much text as you need — the counter handles documents of any length." },
            { q: "Does it work in real time?", a: "Yes, all six metrics update instantly as you type or paste." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Word Counter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A word counter is an online tool that instantly counts the number of words, characters, sentences, paragraphs, and estimated reading time in any piece of text. It is an essential tool for writers, students, bloggers, and professionals who need to meet specific length requirements.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Word Counter</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Simply paste or type your text into the input box above. The word count, character count, sentence count, paragraph count, and reading time update instantly as you type. No button clicks required.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses a Word Counter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Students use it to meet essay word limits. Bloggers use it to optimize post length for SEO. Social media managers use it to fit platform character limits. Authors use it to track manuscript progress. SEO professionals use it to ensure optimal content length.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits of Using TextToolsMax Word Counter</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Unlike basic word processors, our word counter gives you six metrics simultaneously — words, characters, characters without spaces, sentences, paragraphs, and reading time. It works instantly with no login required and handles documents of any length.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Word Count Guidelines</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Blog posts perform best between 1,500 and 2,500 words. Academic essays typically require 500 to 5,000 words. Social media posts are limited to 280 characters on X (Twitter). Meta descriptions should be between 150 and 160 characters. LinkedIn posts perform best under 700 words.</p>
        </div>
      </div>
    </div>
  );
}
