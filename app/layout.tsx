import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TextUtils Pro — Free Online Text Tools",
  description: "Free online text tools including word counter, character counter, paraphrasing tool, grammar checker, and more. Fast, free, no login required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar />
        <div className="flex min-h-screen pt-16">
          <Sidebar />
          <main className="flex-1 ml-64 p-6 max-w-5xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
