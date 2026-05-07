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
    <Link href={`/${slug}`}
      className={`group relative bg-white rounded-2xl border p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
        ai ? "border-purple-100 hover:border-purple-200" : "border-gray-100 hover:border-blue-200"
      }`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${ai ? "bg-purple-50" : "bg-blue-50"}`}>
          <Icon size={18} className={ai ? "text-purple-600" : "text-blue-600"} />
        </div>
        {ai && (
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">AI</span>
        )}
      </div>
      <h3 className={`font-semibold text-gray-800 mb-1.5 group-hover:${ai ? "text-purple-600" : "text-blue-600"} transition-colors`}>
        {name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
        ai ? "bg-purple-400" : "bg-blue-400"
      }`} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="py-6 max-w-6xl">
      {/* Hero */}
      <div className="relative mb-10 p-8 rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #7c3aed 100%)" }}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs px-3 py-1.5 rounded-full mb-4 border border-white/30">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            15 Tools Available — Free Forever
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Free Online Text Tools
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Fast, free, no login required. Powerful text utilities for writers, students, developers and marketers.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {["Word Counter", "Grammar Checker", "Paraphrasing Tool", "Readability Checker"].map((tool) => (
              <span key={tool} className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                {tool}
              </span>
            ))}
            <span className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
              +11 more
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 right-16 w-32 h-32 bg-purple-400/20 rounded-full translate-y-16" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value: "15", label: "Free Tools" },
          { value: "5", label: "AI-Powered" },
          { value: "0", label: "Login Required" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Free Tools */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-1 w-5 bg-blue-500 rounded-full" />
          <h2 className="text-lg font-bold text-gray-800">Free Tools</h2>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">10 tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {freeTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-1 w-5 bg-purple-500 rounded-full" />
          <h2 className="text-lg font-bold text-gray-800">AI-Powered Tools</h2>
          <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">5 tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {aiTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} ai />
          ))}
        </div>
      </div>
    </div>
  );
}