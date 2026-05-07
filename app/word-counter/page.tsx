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
      className={`group relative bg-white rounded-2xl border-2 p-5 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 ${
        ai ? "border-purple-100 hover:border-purple-400" : "border-gray-100 hover:border-blue-400"
      }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          ai ? "bg-gradient-to-br from-purple-500 to-purple-600" : "bg-gradient-to-br from-blue-500 to-blue-600"
        }`}>
          <Icon size={18} className="text-white" />
        </div>
        {ai && (
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">AI</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
        ai ? "bg-gradient-to-r from-purple-400 to-purple-600" : "bg-gradient-to-r from-blue-400 to-blue-600"
      }`} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="py-2">
      {/* Hero */}
      <div className="relative mb-10 p-10 rounded-3xl overflow-hidden w-full"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #7c3aed 100%)" }}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs px-3 py-1.5 rounded-full mb-5 border border-white/30">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            15 Tools Available — Free Forever
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Free Online Text Tools
          </h1>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl">
            Fast, free, no login required. Powerful text utilities for writers, students, developers and marketers.
          </p>
          <div className="flex flex-wrap gap-2">
            {freeTools.map((tool) => (
              <Link key={tool.slug} href={`/${tool.slug}`}
                className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/25 transition-colors">
                {tool.name}
              </Link>
            ))}
            <span className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
              +{aiTools.length} more
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-40 translate-x-40" />
        <div className="absolute bottom-0 right-20 w-48 h-48 bg-purple-400/20 rounded-full translate-y-24" />
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-blue-300/20 rounded-full" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value: "15", label: "Free Tools", color: "text-blue-600" },
          { value: "5", label: "AI-Powered", color: "text-purple-600" },
          { value: "0", label: "Login Required", color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Text Tools */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 bg-blue-500 rounded-full" />
          <h2 className="text-xl font-bold text-gray-800">Text Tools</h2>
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">10 tools</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {freeTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 bg-purple-500 rounded-full" />
          <h2 className="text-xl font-bold text-gray-800">AI-Powered Tools</h2>
          <span className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full font-medium">5 tools</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {aiTools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} ai />
          ))}
        </div>
      </div>
    </div>
  );
}