"use client";
import { useState } from "react";

interface KeywordData {
  word: string;
  count: number;
  density: string;
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "is", "it", "its", "was", "are", "be", "been", "has", "had", "have", "will", "would", "could", "should", "may", "might", "do", "did", "does", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "my", "your", "his", "her", "our", "their", "as", "if", "so", "not", "no", "up", "out", "about", "into", "than", "then", "when", "where", "who", "which", "what", "how", "all", "each", "more", "also", "just", "can"]);

  const getKeywords = (): KeywordData[] => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    const total = words.length;
    if (total === 0) return [];
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(2),
      }));
  };

  const keywords = getKeywords();
  const totalWords = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Keyword Density Checker</h1>
      <p className="text-gray-500 mb-6">Analyse keyword frequency and density in your content. Perfect for SEO optimization.</p>

      <textarea
        className="w-full h-64 p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 mb-6"
        placeholder="Paste your content here to analyse keyword density..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {text && (
        <button onClick={() => setText("")} className="mb-6 text-sm text-red-500 hover:text-red-700">
          Clear text
        </button>
      )}

      {keywords.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-700">Top Keywords</h2>
            <span className="text-sm text-gray-400">{totalWords} total words</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">#</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Keyword</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Count</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Density</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Bar</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw, i) => (
                <tr key={kw.word} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{kw.word}</td>
                  <td className="px-5 py-3 text-gray-600">{kw.count}</td>
                  <td className="px-5 py-3 text-gray-600">{kw.density}%</td>
                  <td className="px-5 py-3 w-32">
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, parseFloat(kw.density) * 10)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is keyword density?", a: "Keyword density is the percentage of times a keyword appears in your text compared to the total word count. It helps measure how focused your content is on a particular topic." },
            { q: "What is the ideal keyword density for SEO?", a: "Most SEO experts recommend a keyword density of 1% to 2%. Overusing keywords can be seen as keyword stuffing and may hurt your search rankings." },
            { q: "Why are common words excluded?", a: "Common words like 'the', 'and', 'is' are called stop words. They are excluded because they add no SEO value and would dominate the results." },
            { q: "How many keywords should I target per page?", a: "Focus on one primary keyword and two to three secondary keywords per page for the best SEO results." },
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