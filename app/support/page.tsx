"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I upload log files?", a: "Navigate to your Dashboard and drag & drop your .log or .txt files into the upload zone, or click to browse. You can also paste a GitHub repository URL." },
    { q: "What file formats are supported?", a: "Glitchless currently supports .log and .txt files. We're working on adding support for JSON, XML, and YAML log formats." },
    { q: "How does Plain English Mode work?", a: "Plain English Mode translates technical jargon and error codes into simple, human-readable explanations. Toggle it on from the Analysis page." },
    { q: "Can I integrate with my CI/CD pipeline?", a: "Yes! Glitchless supports integration with GitHub Actions, Jenkins, GitLab CI, and more. Configure your pipeline in Settings > Integration." },
    { q: "Is my data secure?", a: "Absolutely. All log files are encrypted in transit and at rest. We never store your logs after analysis is complete unless you explicitly choose to." },
    { q: "How accurate is the AI analysis?", a: "Our AI achieves over 95% accuracy in identifying root causes. For complex issues, we provide confidence scores and multiple possible explanations." },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-[var(--secondary)] text-lg mb-12">Find answers to common questions and get help with Glitchless</p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "📖", title: "Documentation", desc: "Browse our comprehensive guides", href: "/documentation" },
              { icon: "💬", title: "Community", desc: "Join our developer community", href: "#" },
              { icon: "🐛", title: "Report Bug", desc: "Found an issue? Let us know", href: "#" },
            ].map((link) => (
              <Link key={link.title} href={link.href} className="glass-card glass-card-hover p-8 no-underline transition-all duration-300 block">
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                <p className="text-[var(--secondary)]">{link.desc}</p>
              </Link>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left bg-transparent border-none text-white cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-medium text-lg pr-4">{faq.q}</span>
                    <span className={`text-2xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-[var(--secondary)] animate-[fadeIn_0.3s_ease-out]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}
              className="max-w-[600px] space-y-6"
            >
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <input type="text" required placeholder="Your name" className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input type="email" required placeholder="your@email.com" className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Subject</label>
                <select className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 text-white cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Account Issue</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Message</label>
                <textarea required rows={5} placeholder="Describe your issue..." className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent)] resize-y" />
              </div>
              <button type="submit" className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer border-none transition-all hover:shadow-[0_4px_15px_rgba(0,102,204,0.3)]">
                Send Message
              </button>
            </form>
          </div>

          {/* System Status */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">System Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: "API Service", status: "Operational", type: "success" },
                { name: "Analysis Engine", status: "Operational", type: "success" },
                { name: "GitHub Integration", status: "Operational", type: "success" },
              ].map((service) => (
                <div key={service.name} className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-lg p-6 flex justify-between items-center">
                  <span className="font-medium">{service.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
                    <span className="text-[var(--success)] text-sm">{service.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
