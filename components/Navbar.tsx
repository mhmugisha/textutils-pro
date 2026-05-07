import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-6 shadow-sm"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow">
          <span className="text-blue-600 font-black text-base">T</span>
        </div>
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          TextUtils <span className="text-blue-200">Pro</span>
        </Link>
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