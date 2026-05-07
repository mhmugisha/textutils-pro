export const metadata = {
  title: "Privacy Policy | TextToolsMax",
  description: "Privacy Policy for TextToolsMax — Free Online Text Tools.",
};

export default function PrivacyPolicy() {
  return (
    <div className="py-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 7, 2026</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
          <p>Welcome to TextToolsMax ("we", "our", or "us"). We operate the website texttoolsmax.com (the "Site"). This Privacy Policy explains how we collect, use, and protect information when you use our Site.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We do not require you to create an account or provide personal information to use our tools. However, we may collect the following information automatically:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type and version</li>
            <li>Pages visited and time spent on the Site</li>
            <li>Referring website addresses</li>
            <li>General geographic location (country/city level)</li>
            <li>Device type and operating system</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Text You Enter Into Our Tools</h2>
          <p>Text you enter into our free tools (Word Counter, Character Counter, etc.) is processed entirely in your browser and is never stored or transmitted to our servers.</p>
          <p className="mt-3">Text submitted to our AI-powered tools (Paraphrasing Tool, Grammar Checker, Article Summarizer, Originality Checker, Text Expander) is sent to Anthropic's API for processing. This text is not stored by us. Please review <a href="https://www.anthropic.com/privacy" target="_blank" className="text-blue-600 hover:underline">Anthropic's Privacy Policy</a> for details on how they handle data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Cookies and Advertising</h2>
          <p className="mb-3">We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" className="text-blue-600 hover:underline">Google Ads Settings</a>.</p>
          <p>We may also use Google Analytics to understand how visitors use our Site. Google Analytics uses cookies to collect information such as how often users visit the Site and what pages they visit.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To improve the functionality and user experience of our Site</li>
            <li>To understand how our tools are being used</li>
            <li>To display relevant advertisements via Google AdSense</li>
            <li>To monitor and prevent abuse of our AI tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Third Party Services</h2>
          <p className="mb-3">Our Site uses the following third party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google AdSense</strong> — for displaying advertisements</li>
            <li><strong>Google Analytics</strong> — for website traffic analysis</li>
            <li><strong>Anthropic API</strong> — for powering AI text tools</li>
            <li><strong>Vercel</strong> — for website hosting and delivery</li>
          </ul>
          <p className="mt-3">Each of these services has their own Privacy Policy governing their use of data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Data Retention</h2>
          <p>We do not store any text you enter into our tools. Analytics data collected via Google Analytics is retained according to Google's standard data retention policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Children's Privacy</h2>
          <p>Our Site is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the following rights regarding your data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access information we hold about you</li>
            <li>The right to request deletion of your data</li>
            <li>The right to opt out of personalized advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2 font-medium text-gray-800">privacy@texttoolsmax.com</p>
        </section>

      </div>
    </div>
  );
}