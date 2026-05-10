"use client";
import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const characters = text.length;
  const noSpaces = text.replace(/\s/g, "").length;
  const letters = text.replace(/[^a-zA-Z]/g, "").length;
  const numbers = text.replace(/[^0-9]/g, "").length;
  const spaces = text.split(" ").length - 1;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Character Counter</h1>
      <p className="text-gray-500 mb-6">Count characters, letters, numbers and spaces instantly. Free, no login required.</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Characters", value: characters },
          { label: "No Spaces", value: noSpaces },
          { label: "Letters", value: letters },
          { label: "Numbers", value: numbers },
          { label: "Spaces", value: spaces },
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
            { q: "Why count characters?", a: "Character counts are essential for social media posts, SMS messages, meta descriptions, and any platform with a character limit." },
            { q: "Does it count spaces?", a: "Yes. We show both total characters including spaces and characters excluding spaces." },
            { q: "Is there a limit to how much text I can enter?", a: "No limit. Paste as much text as you need." },
            { q: "Does it work in real time?", a: "Yes, all counts update instantly as you type or paste." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Character Counter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A character counter is a tool that counts every individual character in your text including letters, numbers, spaces, and punctuation marks. It is especially useful for platforms that enforce strict character limits.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Character Counter</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste or type your text into the box above. The tool instantly displays the total character count, characters without spaces, letters only, numbers only, and space count in real time.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses a Character Counter?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Social media managers counting Twitter and Instagram characters. Developers testing input field limits. SEO professionals crafting meta titles and descriptions. SMS marketers staying within 160 character message limits. App developers writing push notification copy.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Character Limits on Popular Platforms</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Twitter/X: 280 characters per tweet. SMS: 160 characters per message. Meta description: 155-160 characters. Page title tag: 50-60 characters. Instagram caption: 2,200 characters. LinkedIn post: 3,000 characters. YouTube title: 100 characters.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Benefits</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Our character counter shows five different metrics simultaneously, updates in real time, and works with text of any length without requiring an account or login.</p>
        </div>
      </div>
    </div>
  );
}