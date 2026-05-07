"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Type, Hash, AlignLeft, Trash2, List,
  BookOpen, Search, FileText, RotateCcw,
  ArrowUpDown, Wand2, CheckSquare, Scissors,
  Shield, Expand
} from "lucide-react";

const tools = [
  { category: "Free Tools", items: [
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
  { category: "AI Tools", items: [
    { name: "Paraphrasing Tool", slug: "paraphrasing-tool", icon: Wand2 },
    { name: "Grammar Checker", slug: "grammar-checker", icon: CheckSquare },
    { name: "Article Summarizer", slug: "article-summarizer", icon: Scissors },
    { name: "Plagiarism Checker", slug: "plagiarism-checker", icon: Shield },
    { name: "Text Expander", slug: "text-expander", icon: Expand },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {tools.map((group) => (
          <div key={group.category} className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.items.map((tool) => {
                const Icon = tool.icon;
                const isActive = pathname === `/${tool.slug}`;
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={15} />
                      {tool.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}