import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TextToolsMax — Free Online Text Tools",
  description: "Free online text tools including word counter, character counter, paraphrasing tool, grammar checker, and more. Fast, free, no login required.",
  verification: {
    google: "rD48nDF0KHxd9vHfk5rGlBYETnI384ZQLOae47VCPh8",
  },
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
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
