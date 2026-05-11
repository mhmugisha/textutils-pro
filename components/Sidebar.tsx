"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Video } from "lucide-react";
import {
  Type, Hash, AlignLeft, Trash2, List,
  BookOpen, Search, FileText, RotateCcw,
  ArrowUpDown, Wand2, CheckSquare, Scissors,
  Shield, Expand
} from "lucide-react";

const tools = [
  { category: "Text Tools", color: "blue", items: [
    { name: "Word Counter", slug: "word-counter", icon: Type },
    { name: "Character Counter", slug: "character-counter", icon: Hash },
    { name: "Text Case Converter", slug: "text-case-converter", icon: AlignLeft },
    { name: "Remove Duplicate Lines", slug: "remove-duplicate-lines", icon: Trash2 },
    { name: "Sentence Counter", slug: "sentence-counter", icon: List },
    { name: "Readability Checker", slug: "readability-checker", icon: BookOpen },
    { name: "Keyword Density", slug: "keyword-density-checker", icon: Search },
    { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator", icon: FileText },
    { name: "Text Reverser", slug: "text-reverser", icon: RotateCcw },
    { name: "Line Sorter", slug: "line-sorter", icon: ArrowUpDown },
  ]},
  { category: "AI-Powered Tools", color: "purple", items: [
    { name: "Paraphrasing Tool", slug: "paraphrasing-tool", icon: Wand2 },
    { name: "Grammar Checker", slug: "grammar-checker", icon: CheckSquare },
    { name: "Article Summarizer", slug: "article-summarizer", icon: Scissors },
    { name: "AI Content Checker", slug: "plagiarism-checker", icon: Shield },
    { name: "Text Expander", slug: "text-expander", icon: Expand },
    { name: "YouTube Transcript", slug: "youtube-transcript", icon: Video },
  ]},
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-100 overflow-y-auto shadow-sm transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4">
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Navigation links for mobile */}
          <div className="lg:hidden mb-6 pb-4 border-b border-gray-100">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {tools.map((group) => (
            <div key={group.category} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-1 w-4 rounded-full ${group.color === "purple" ? "bg-purple-500" : "bg-blue-500"}`} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {group.category}
                </p>
              </div>
              <ul className="space-y-0.5">
                {group.items.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === `/${tool.slug}`;
                  const isAI = group.color === "purple";
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/${tool.slug}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? isAI
                              ? "bg-purple-50 text-purple-700 font-semibold border border-purple-100"
                              : "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon size={14} className={isActive ? (isAI ? "text-purple-500" : "text-blue-500") : "text-gray-400"} />
                        {tool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-4 mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <p className="text-xs font-semibold text-gray-700 mb-1">✨ AI-Powered Tools</p>
          <p className="text-xs text-gray-500">6 tools powered by Claude AI for smarter text processing.</p>
        </div>
      </aside>
    </>
  );
}