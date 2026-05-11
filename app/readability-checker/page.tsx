"use client";
import { useState } from "react";

function getReadabilityLevel(score: number) {
  if (score >= 90) return { level: "Very Easy", color: "text-green-600", bg: "bg-green-50", description: "Easily understood by an average 11-year-old student." };
  if (score >= 80) return { level: "Easy", color: "text-green-500", bg: "bg-green-50", description: "Conversational English for consumers." };
  if (score >= 70) return { level: "Fairly Easy", color: "text-lime-600", bg: "bg-lime-50", description: "Fairly easy to read." };
  if (score >= 60) return { level: "Standard", color: "text-yellow-600", bg: "bg-yellow-50", description: "Easily understood by 13 to 15 year old students." };
  if (score >= 50) return { level: "Fairly Difficult", color: "text-orange-500", bg: "bg-orange-50", description: "Fairly difficult to read." };
  if (score >= 30) return { level: "Difficult", color: "text-red-500", bg: "bg-red-50", description: "Best understood by college graduates." };
  return { level: "Very Difficult", color: "text-red-700", bg: "bg-red-50", description: "Best understood by university graduates." };
}

function getGradeLevel(score: number) {
  if (score >= 90) return "5th grade";
  if (score >= 80) return "6th grade";
  if (score >= 70) return "7th grade";
  if (score >= 60) return "8th-9th grade";
  if (score >= 50) return "10th-12th grade";
  if (score >= 30) return "College level";
  return "Professional";
}

export default function ReadabilityChecker() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const syllables = text.toLowerCase().replace(/[^a-z]/g, " ").split(/\s+/).reduce((count, word) => {
    if (!word) return count;
    const matches = word.match(/[aeiouy]{1,2}/g);
    return count + (matches ? matches.length : 1);
  }, 0);

  const avgWordsPerSentence = sentences === 0 ? 0 : words / sentences;
  const avgSyllablesPerWord = words === 0 ? 0 : syllables / words;
  const fleschScore = sentences === 0 ? 0 : Math.round(206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord);
  const clampedScore = Math.min(100, Math.max(0, fleschScore));
  const readability = getReadabilityLevel(clampedScore);
  const grade = getGradeLevel(clampedScore);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Readability Checker</h1>
      <p className="text-gray-500 mb-6">Check the Flesch-Kincaid readability score and grade level of your text instantly.</p>

      <textarea
        className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 mb-6"
        placeholder="Paste your text here to check readability..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {text.trim() && sentences > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${readability.bg} border border-gray-200 rounded-xl p-5 text-center`}>
            <div className={`text-4xl font-bold ${readability.color}`}>{clampedScore}</div>
            <div className="text-sm text-gray-500 mt-1">Flesch Score</div>
            <div className={`text-sm font-semibold mt-2 ${readability.color}`}>{readability.level}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-4xl font-bold text-blue-600">{grade}</div>
            <div className="text-sm text-gray-500 mt-1">Grade Level</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-4xl font-bold text-blue-600">{Math.round(avgWordsPerSentence)}</div>
            <div className="text-sm text-gray-500 mt-1">Avg Words/Sentence</div>
          </div>
        </div>
      )}

      {text.trim() && sentences > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">{readability.description}</p>
        </div>
      )}

      {text && (
        <button onClick={() => setText("")} className="text-sm text-red-500 hover:text-red-700">
          Clear text
        </button>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is the Flesch Reading Ease score?", a: "The Flesch Reading Ease score rates text on a scale of 0 to 100. Higher scores mean the text is easier to read. A score of 60 to 70 is considered ideal for general audiences." },
            { q: "What is a good readability score?", a: "For most web content and blog posts, aim for a score between 60 and 70. This makes your content accessible to a wide audience." },
            { q: "How is the score calculated?", a: "The score is calculated using the Flesch-Kincaid formula, which considers the average number of words per sentence and the average number of syllables per word." },
            { q: "Why does readability matter?", a: "Readable content keeps visitors engaged longer, reduces bounce rates, and improves SEO performance. Google favors content that is easy to read." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is a Readability Checker?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">A readability checker analyses your text and gives it a score based on how easy it is to read and understand. Our tool uses the Flesch-Kincaid Reading Ease formula — the most widely used readability measurement in the world.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Readability Checker</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Paste your text into the box above. The tool instantly calculates your Flesch Reading Ease score, assigns a grade level, and tells you the average words per sentence. No button clicks required.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Understanding the Flesch Reading Ease Score</h2>
          <p className="text-sm text-gray-500 leading-relaxed">90-100: Very easy, suitable for 5th graders. 70-80: Easy, conversational English. 60-70: Standard, ideal for most web content. 50-60: Fairly difficult, suitable for high school students. 30-50: Difficult, college level. 0-30: Very difficult, professional or academic.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Why Readability Matters for SEO</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Google favours content that is easy to read. Pages with better readability scores tend to have lower bounce rates, longer session times, and higher rankings. Most successful blog posts score between 60 and 70 on the Flesch scale.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Readability Checkers?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Bloggers optimising content for Google. Teachers checking student writing complexity. Technical writers simplifying documentation. Marketing teams improving conversion copy. Authors targeting specific reading audiences.</p>
        </div>
      </div>
    </div>
  );
}