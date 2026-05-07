import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TextToolsMax — Free Online Text Tools",
  description: "Free online text tools including word counter, character counter, paraphrasing tool, grammar checker, and more. Fast, free, no login required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-gray-900`}>
        <Navbar />
        <div className="flex min-h-screen pt-20">
          <Sidebar />
          <main className="flex-1 ml-64 min-w-0 px-6 pt-8 pb-6">
            {children}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-400">© 2026 TextToolsMax. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-gray-600">Privacy Policy</Link>
                  <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">All Tools</Link>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}