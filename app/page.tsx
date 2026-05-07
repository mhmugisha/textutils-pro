import Link from "next/link";
import {
  Type, Hash, AlignLeft, Trash2, List,
  BookOpen, Search, FileText, RotateCcw,
  ArrowUpDown, Wand2, CheckSquare, Scissors,
  Shield, Expand
} from "lucide-react";

const freeTools = [
  { name: "Word Counter", slug: "word-counter", icon: Type, description: "Count words, characters, sentences and paragraphs instantly." },
  { name: "Character Counter", slug: "character-counter", icon: Hash, description: "Count characters with and without spaces in any text." },
  { name: "Text Case Converter", slug: "text-case-converter", icon: AlignLeft, description: "Convert text to UPPER, lower, Title or Sentence case." },
  { name: "Remove Duplicate Lines", slug: "remove-duplicate-lines", icon: Trash2, description: "Clean up lists by removing all duplicate lines instantly." },
  { name: "Sentence Counter", slug: "sentence-counter", icon: List, description: "Count sentences and calculate average words per sentence." },
  { name: "Readability Checker", slug: "readability-checker", icon: BookOpen, description: "Get Flesch-Kincaid readability score and grade level." },
  { name: "Keyword Density", slug: "keyword-density-checker", icon: Search, description: "Analyse keyword frequency and density in your content." },
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator", icon: FileText, description: "Generate placeholder lorem ipsum text for your designs." },
  { name: "Text Reverser", slug: "text-reverser", icon: RotateCcw, description: "Reverse any text or string instantly." },
  { name: "Line Sorter", slug: "line-sorter", icon: ArrowUpDown, description: "Sort lines alphabetically, reverse, or randomly." },
];

const aiTools = [
  { name: "Paraphrasing Tool", slug: "paraphrasing-tool", icon: Wand2, description: "Rewrite your text in Standard, Formal or Creative tone." },
  { name: "Grammar Checker", slug: "grammar-checker", icon: CheckSquare, description: "Fix grammar errors and get a list of all corrections made." },
  { name: "Article Summarizer", slug: "article-summarizer", icon: Scissors, description: "Summarize long articles into short, medium or detailed form." },
  { name: "Plagiarism Checker", slug: "plagiarism-checker", icon: Shield, description: "Check text originality and flag suspicious phrases." },
  { name: "Text Expander", slug: "text-expander", icon: Expand, description: "Expand short text into a fuller, enriched version." },
];

function ToolCard({ name, slug, icon: Icon, description, ai = false }: {
  name: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  ai?: boolean;
}) {
  return (
    <Link href={`/${slug}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all group">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${ai ? "bg-purple-50" : "bg-blue-50"}`}>
          <Icon size={18} className={ai ? "text-purple-600" : "text-blue-600"} />
        </div>
        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{name}</h3>
        {ai && <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">AI</span>}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="py-6">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Free Online Text Tools</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Fast, free, no login required. 15 powerful text utilities for writers, students, developers and marketers.
        </p>
      </div>

      {/* Free Tools */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Free Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} ai />
          ))}
        </div>
      </div>
    </div>
  );
}