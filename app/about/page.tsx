export const metadata = {
  title: "About Us | TextToolsMax",
  description: "Learn about TextToolsMax — free online text tools for writers, students, developers and marketers.",
};

export default function About() {
  return (
    <div className="py-6 max-w-none lg:max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">About TextToolsMax</h1>
      <p className="text-sm text-gray-400 mb-8">Free Online Text Tools for Everyone</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Who We Are</h2>
          <p>TextToolsMax is a free online platform offering 15 powerful text utilities for writers, students, developers, marketers, and anyone who works with text. We believe that professional-grade text tools should be accessible to everyone — free, fast, and without requiring an account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
          <p>Our mission is simple — to make everyday text tasks faster and easier. Whether you need to count words for an essay, check the readability of a blog post, rewrite content in a different tone, or generate placeholder text for a design, TextToolsMax has a tool for you.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { title: "10 Free Text Tools", desc: "Word counter, character counter, case converter, line sorter, and more — all completely free." },
              { title: "5 AI-Powered Tools", desc: "Paraphraser, grammar checker, summarizer, originality checker, and text expander powered by Claude AI." },
              { title: "No Login Required", desc: "All tools are available instantly. No account, no signup, no barriers." },
              { title: "Privacy First", desc: "Text entered into our free tools never leaves your browser. AI tools are processed securely." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Word Counter", "Character Counter", "Text Case Converter",
              "Remove Duplicate Lines", "Sentence Counter", "Readability Checker",
              "Keyword Density Checker", "Lorem Ipsum Generator", "Text Reverser",
              "Line Sorter", "Paraphrasing Tool (AI)", "Grammar Checker (AI)",
              "Article Summarizer (AI)", "Originality Checker (AI)", "Text Expander (AI)",
            ].map((tool) => (
              <div key={tool} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                {tool}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Technology</h2>
          <p>TextToolsMax is built with Next.js and hosted on Vercel for fast, reliable performance globally. Our AI-powered tools are powered by Anthropic's Claude AI — one of the most capable and safe AI models available today.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Get In Touch</h2>
          <p>Have a suggestion, found a bug, or want to request a new tool? We'd love to hear from you. Visit our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a> to reach out.</p>
        </section>

      </div>
    </div>
  );
}