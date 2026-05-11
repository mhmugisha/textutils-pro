"use client";
import { useState } from "react";

const loremWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit", "fugit", "magni", "dolores", "ratione", "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem"];

function generateSentence() {
  const length = Math.floor(Math.random() * 10) + 8;
  const words = Array.from({ length }, () => loremWords[Math.floor(Math.random() * loremWords.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph() {
  const sentenceCount = Math.floor(Math.random() * 3) + 3;
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      result = Array.from({ length: count }, generateParagraph).join("\n\n");
    } else if (type === "sentences") {
      result = Array.from({ length: count }, generateSentence).join(" ");
    } else {
      const words = Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]);
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      result = words.join(" ") + ".";
    }
    setOutput(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
      <p className="text-gray-500 mb-6">Generate placeholder lorem ipsum text for your designs and mockups instantly.</p>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Generate</label>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "paragraphs" | "sentences" | "words")}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <button
            onClick={generate}
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Generate
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Generated Text</span>
            <button onClick={copyToClipboard} className="text-sm text-blue-600 hover:text-blue-800">
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{output}</p>
        </div>
      )}

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is placeholder text commonly used in design and publishing. It has been used since the 1500s to demonstrate visual form without relying on meaningful content." },
            { q: "Why do designers use Lorem Ipsum?", a: "Designers use it to fill layouts during the design process so the focus stays on visual elements rather than the actual content." },
            { q: "Is Lorem Ipsum real Latin?", a: "It is derived from a work by Cicero written in 45 BC, but has been altered and scrambled so it is not actual readable Latin." },
            { q: "Can I generate just a few words?", a: "Yes, you can generate paragraphs, sentences, or individual words depending on what your design requires." },
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
          <h2 className="font-semibold text-gray-800 mb-2">What is Lorem Ipsum?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Lorem Ipsum is standard placeholder text used in design and publishing since the 1500s. It is derived from a Latin text by Cicero but deliberately scrambled so the reader focuses on the visual layout rather than the content.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">How to Use the Lorem Ipsum Generator</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Select how many paragraphs, sentences, or words you want to generate, then click Generate. The placeholder text appears instantly and can be copied to your clipboard with one click.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Why Designers Use Lorem Ipsum</h2>
          <p className="text-sm text-gray-500 leading-relaxed">When designing a website, app, or document, real content is often not available yet. Lorem Ipsum fills the space so designers and clients can evaluate the visual layout without being distracted by the actual words.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Who Uses Lorem Ipsum?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Web designers building page templates. App developers creating UI mockups. Graphic designers laying out print materials. WordPress theme developers. Presentation designers filling slide layouts.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-2">Lorem Ipsum Alternatives</h2>
          <p className="text-sm text-gray-500 leading-relaxed">While Lorem Ipsum is the industry standard, some designers prefer language-specific placeholder text, or "blind text" in their target language, to better simulate how real content will look in their designs.</p>
        </div>
      </div>
    </div>
  );
}