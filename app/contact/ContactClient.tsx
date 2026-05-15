"use client";
// app/contact/ContactClient.tsx

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="py-6 max-w-none lg:max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-sm text-gray-400 mb-8">We would love to hear from you</p>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-green-600 text-2xl">✓</span>
            <h2 className="text-lg font-semibold text-gray-800">Message sent</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Thanks for reaching out. We will get back to you within 24 to 48 hours on business days.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-sm text-blue-600 hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={handleChange("name")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Your email
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={200}
              value={form.email}
              onChange={handleChange("email")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              maxLength={150}
              value={form.subject}
              onChange={handleChange("subject")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Bug report, tool request, partnership, or other"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              maxLength={5000}
              rows={7}
              value={form.message}
              onChange={handleChange("message")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
              placeholder="Your message..."
            />
            <div className="text-xs text-gray-400 mt-1 text-right">
              {form.message.length} / 5000
            </div>
          </div>

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By submitting, you agree to our{" "}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mt-6">
        <p className="text-sm text-blue-700">
          We typically respond within 24 to 48 hours on business days.
        </p>
      </div>
    </div>
  );
}