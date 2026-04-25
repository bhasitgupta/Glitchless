"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "uploading-logs", label: "Uploading Logs" },
    { id: "github-integration", label: "GitHub Integration" },
    { id: "plain-english", label: "Plain English Mode" },
    { id: "auto-fix", label: "Auto-Fix" },
    { id: "cicd", label: "CI/CD Pipeline" },
    { id: "api", label: "API Reference" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-[var(--secondary)] text-lg mb-12">Everything you need to know about using Glitchless</p>

          <div className="flex gap-8">
            {/* Sidebar */}
            <nav className="w-[250px] shrink-0 hidden md:block">
              <div className="sticky top-24 bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-lg p-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left bg-transparent border-none p-3 rounded-md cursor-pointer transition-colors block ${
                      activeSection === section.id
                        ? "bg-[rgba(0,242,255,0.1)] text-[var(--accent)]"
                        : "text-[var(--secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 space-y-12">
              <section id="getting-started" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Getting Started</h2>
                <div className="glass-card p-8 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Start Guide</h3>
                  <p className="text-[var(--secondary)] mb-4">Get up and running with Glitchless in under 5 minutes:</p>
                  <ol className="list-decimal list-inside space-y-3 text-[var(--secondary)]">
                    <li>Sign in with your GitHub account</li>
                    <li>Navigate to your Dashboard</li>
                    <li>Upload a log file or paste a repository URL</li>
                    <li>Review the AI-generated analysis</li>
                    <li>Apply suggested fixes with one click</li>
                  </ol>
                </div>
              </section>

              <section id="uploading-logs" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Uploading Logs</h2>
                <div className="glass-card p-8 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Supported Formats</h3>
                  <p className="text-[var(--secondary)] mb-4">Glitchless currently supports the following log file formats:</p>
                  <ul className="space-y-2 text-[var(--secondary)]">
                    <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> .log files (standard log format)</li>
                    <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> .txt files (plain text logs)</li>
                    <li className="flex items-center gap-2"><span className="text-[var(--warning)]">⏳</span> JSON format (coming soon)</li>
                    <li className="flex items-center gap-2"><span className="text-[var(--warning)]">⏳</span> XML format (coming soon)</li>
                  </ul>
                </div>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">Upload Methods</h3>
                  <div className="space-y-4 text-[var(--secondary)]">
                    <div>
                      <h4 className="font-medium text-white mb-2">Drag & Drop</h4>
                      <p>Simply drag your log file onto the upload zone on the Dashboard page.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">File Browser</h4>
                      <p>Click the upload zone to open a file browser and select your log file.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">GitHub URL</h4>
                      <p>Paste a GitHub repository URL and Glitchless will fetch the logs directly.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="github-integration" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">GitHub Integration</h2>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">Connecting Your Account</h3>
                  <p className="text-[var(--secondary)] mb-4">Connect your GitHub account for seamless integration:</p>
                  <ol className="list-decimal list-inside space-y-3 text-[var(--secondary)]">
                    <li>Go to Settings &gt; Integration</li>
                    <li>Click &quot;Connect&quot; next to GitHub Integration</li>
                    <li>Authorize Glitchless in the GitHub OAuth popup</li>
                    <li>Select repositories to monitor</li>
                  </ol>
                </div>
              </section>

              <section id="plain-english" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Plain English Mode</h2>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">What is Plain English Mode?</h3>
                  <p className="text-[var(--secondary)] mb-4">Plain English Mode translates technical error messages and jargon into simple, easy-to-understand explanations. This is especially useful for:</p>
                  <ul className="space-y-2 text-[var(--secondary)]">
                    <li>• Junior developers who are still learning</li>
                    <li>• Non-technical team members who need to understand issues</li>
                    <li>• Quick reviews where you want the gist without the details</li>
                  </ul>
                </div>
              </section>

              <section id="auto-fix" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Auto-Fix</h2>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">How Auto-Fix Works</h3>
                  <p className="text-[var(--secondary)] mb-4">When Glitchless identifies an issue, it generates a suggested fix with:</p>
                  <ul className="space-y-2 text-[var(--secondary)]">
                    <li>• Step-by-step instructions</li>
                    <li>• Code diffs showing exactly what to change</li>
                    <li>• Terminal preview of the fix in action</li>
                    <li>• One-click copy to clipboard</li>
                    <li>• Option to create a Pull Request directly</li>
                  </ul>
                </div>
              </section>

              <section id="cicd" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">CI/CD Pipeline Integration</h2>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">Supported Platforms</h3>
                  <p className="text-[var(--secondary)] mb-4">Glitchless integrates with popular CI/CD platforms:</p>
                  <ul className="space-y-2 text-[var(--secondary)]">
                    <li>• GitHub Actions</li>
                    <li>• Jenkins</li>
                    <li>• GitLab CI</li>
                    <li>• CircleCI</li>
                    <li>• Vercel</li>
                    <li>• Netlify</li>
                  </ul>
                </div>
              </section>

              <section id="api" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 gradient-text">API Reference</h2>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">REST API</h3>
                  <p className="text-[var(--secondary)] mb-4">The Glitchless API allows you to integrate log analysis into your own tools and workflows.</p>
                  <div className="bg-[var(--bg-glass)] rounded-lg p-4 font-mono text-sm mb-4">
                    <div className="text-[var(--accent)]">POST /api/v1/analyze</div>
                    <div className="text-[var(--secondary)] mt-2">Content-Type: multipart/form-data</div>
                    <div className="text-[var(--secondary)]">Authorization: Bearer YOUR_API_KEY</div>
                  </div>
                  <p className="text-[var(--secondary)]">Full API documentation is available upon request. Contact support for API access.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
