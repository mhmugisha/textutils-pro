import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import Script from "next/script";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HN5CFR863G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HN5CFR863G');
          `}
        </Script>
        <Navbar />
        <div className="flex min-h-screen pt-20">
          <Sidebar />
          <main className="flex-1 ml-64 min-w-0 px-6 pt-8 pb-0 flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <footer className="mt-8 py-5 px-6 bg-gray-100 border-t border-gray-200 -mx-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-500">© 2026 TextToolsMax. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-gray-700">About</Link>
                  <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
                  <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">All Tools</Link>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}