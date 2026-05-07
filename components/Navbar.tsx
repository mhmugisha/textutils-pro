import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          TextUtils Pro
        </Link>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        Free Online Text Tools
      </div>
    </nav>
  );
}
