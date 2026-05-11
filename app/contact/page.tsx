export const metadata = {
  title: "Contact Us | TextToolsMax",
  description: "Get in touch with the TextToolsMax team.",
};

export default function Contact() {
  return (
    <div className="py-6 max-w-none lg:max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-sm text-gray-400 mb-8">We would love to hear from you</p>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Get In Touch</h2>
          <p className="mb-4">Whether you have a question, a suggestion, found a bug, or want to request a new tool, we are always happy to hear from our users.</p>
          <p className="mb-6">Send us an email and we will get back to you as soon as possible.</p>
          <a href="mailto:mhmugisha@gmail.com" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            mhmugisha@gmail.com
          </a>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">What Can You Contact Us About?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Bug Reports</p>
                <p className="text-sm text-gray-500">Found something that is not working correctly? Let us know.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Tool Requests</p>
                <p className="text-sm text-gray-500">Have an idea for a new text tool? We would love to hear it.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Partnerships</p>
                <p className="text-sm text-gray-500">Interested in collaborating or advertising? Get in touch.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">General Questions</p>
                <p className="text-sm text-gray-500">Any other questions about TextToolsMax or our tools.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm text-blue-700">We typically respond within 24 to 48 hours on business days.</p>
        </div>
      </div>
    </div>
  );
}
