"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex min-h-screen pt-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 lg:ml-64 min-w-0 px-6 pt-8 pb-0 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <footer className="mt-8 py-5 px-6 bg-gray-100 border-t border-gray-200 -mx-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">© 2026 TextToolsMax. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-700">About</Link>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">All Tools</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}