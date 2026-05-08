import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-6 shadow-sm"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow group-hover:scale-105 transition-transform">
            <span className="text-blue-600 font-black text-base">T</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            TextTools <span className="text-blue-200">Max</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1 ml-6">
          <Link href="/"
            className="text-blue-200 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
            All Tools
          </Link>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-blue-200 text-sm hidden md:block">15 Free Text Tools</span>
        <div className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full border border-white/30">
          No Login Required
        </div>
      </div>
    </nav>
  );
}