"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

export default function AnalysisPage() {
  const [plainEnglish, setPlainEnglish] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [copyText, setCopyText] = useState("Copy Fix");

  const fixProgress = (checkedItems.filter(Boolean).length / checkedItems.length) * 100;

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const handleCopy = () => {
    const commands = "npm uninstall node-sass\nnpm install sass\nUpdate package.json devDependencies";
    navigator.clipboard.writeText(commands).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Fix"), 2000);
    });
  };

  return (
    <>
      <DashboardNav />

      <main className="min-h-screen pt-20">
        <div className="max-w-[1600px] mx-auto p-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <Link href="/dashboard" className="text-[var(--secondary)] no-underline font-medium transition-colors hover:text-[var(--accent)]">
                ← Back to Dashboard
              </Link>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={plainEnglish}
                  onChange={(e) => setPlainEnglish(e.target.checked)}
                  className="hidden"
                />
                <span className={`relative w-[50px] h-[26px] rounded-full transition-colors ${plainEnglish ? "bg-[var(--accent)]" : "bg-[rgba(255,255,255,0.1)]"}`}>
                  <span className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full transition-transform ${plainEnglish ? "translate-x-[24px] bg-[var(--primary)]" : "bg-[var(--secondary)]"}`} />
                </span>
                <span className="text-[var(--secondary)] font-medium">Plain English Mode</span>
              </label>
            </div>

          {/* Three-Panel Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[calc(100vh-200px)]">
            {/* Left: Log Terminal */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="text-xl">Log Terminal</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[rgba(255,76,76,0.2)] text-[var(--error)]">Filtered View</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-y-auto flex-1">
                {[
                  { num: "1", text: "npm ERR! code ERESOLVE", type: "error" },
                  { num: "2", text: "npm ERR! ERESOLVE unable to resolve dependency tree", type: "error" },
                  { num: "3", text: "npm ERR! While resolving: glitchless@1.0.0", type: "warning" },
                  { num: "4", text: "npm ERR! Found: react@18.2.0", type: "info" },
                  { num: "5", text: "npm ERR! node-sass@6.0.0 requires react@17.x", type: "info" },
                  { num: "6", text: "✓ Glitchless: Identified dependency mismatch", type: "success" },
                ].map((line) => (
                  <div key={line.num} className="flex gap-3 py-2 border-b border-[var(--border-color)]">
                    <span className="text-[var(--secondary)] opacity-50 min-w-[30px]">{line.num}</span>
                    <span className={
                      line.type === "error" ? "text-[var(--error)]" :
                      line.type === "warning" ? "text-[var(--warning)]" :
                      line.type === "success" ? "text-[var(--success)]" :
                      "text-[var(--secondary)]"
                    }>
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Insight Stream */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="text-xl">Insight Stream</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[rgba(255,76,76,0.2)] text-[var(--error)]">2 Critical Issues</span>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {/* Critical insight */}
                <div className="bg-[var(--card-bg)] border border-[var(--error)] rounded-lg p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase bg-[rgba(255,76,76,0.2)] text-[var(--error)]">Critical</span>
                    <span className="text-[var(--secondary)] text-sm">Dependency Mismatch</span>
                  </div>
                  {!plainEnglish ? (
                    <div>
                      <h4 className="mb-2">ERESOLVE Dependency Conflict</h4>
                      <p className="text-[var(--secondary)] text-sm leading-relaxed">node-sass@6.0.0 is incompatible with react@18.2.0. The peer dependency requirements cannot be satisfied in the current dependency tree.</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="mb-2">Dependency Version Conflict</h4>
                      <p className="text-[var(--secondary)] text-sm leading-relaxed">Your project uses React version 18, but one of your tools (node-sass) only works with React version 17. This is like trying to fit a square peg in a round hole.</p>
                    </div>
                  )}
                  <button className="mt-4 bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-4 py-2 rounded text-sm font-semibold cursor-pointer border-none">View Fix</button>
                </div>

                {/* Warning insight */}
                <div className="bg-[var(--card-bg)] border border-[var(--warning)] rounded-lg p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase bg-[rgba(245,158,11,0.2)] text-[var(--warning)]">Warning</span>
                    <span className="text-[var(--secondary)] text-sm">Outdated Package</span>
                  </div>
                  {!plainEnglish ? (
                    <div>
                      <h4 className="mb-2">node-sass Deprecated</h4>
                      <p className="text-[var(--secondary)] text-sm leading-relaxed">node-sass is deprecated and should be replaced with sass (Dart Sass) for better compatibility and future support.</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="mb-2">Old Tool Needs Update</h4>
                      <p className="text-[var(--secondary)] text-sm leading-relaxed">The tool you&apos;re using for CSS processing is old and no longer maintained. You should switch to the newer version to avoid future problems.</p>
                    </div>
                  )}
                  <button className="mt-4 border border-[var(--glass-border)] text-white px-4 py-2 rounded text-sm font-semibold cursor-pointer bg-transparent">View Fix</button>
                </div>
              </div>
            </div>

            {/* Right: Auto-Fix Sidebar */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl flex flex-col overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="text-xl">Auto-Fix</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[rgba(16,185,129,0.2)] text-[var(--success)]">Ready to Apply</span>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="mb-6">
                  <h4 className="text-lg mb-2">Suggested Fix</h4>
                  <p className="text-[var(--secondary)] text-sm">Replace node-sass with sass and update peer dependencies</p>
                </div>

                <div className="mb-6 space-y-3">
                  {[
                    { label: "Uninstall node-sass", cmd: "npm uninstall node-sass" },
                    { label: "Install sass (Dart Sass)", cmd: "npm install sass" },
                    { label: "Update package.json", cmd: "Update devDependencies" },
                  ].map((item, i) => (
                    <div key={i} className={`bg-[var(--input-bg)] border rounded-lg p-4 transition-all ${checkedItems[i] ? "border-[var(--success)] opacity-70" : "border-[var(--border-color)]"}`}>
                      <label className="flex items-center gap-3 cursor-pointer font-medium">
                        <input
                          type="checkbox"
                          checked={checkedItems[i]}
                          onChange={() => toggleCheck(i)}
                          className="w-[18px] h-[18px] accent-[var(--accent)]"
                        />
                        <span className={checkedItems[i] ? "line-through text-[var(--success)]" : ""}>{item.label}</span>
                      </label>
                      <code className="block mt-2 p-2 bg-[var(--bg-glass)] rounded font-mono text-xs text-[var(--accent)]">{item.cmd}</code>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--success)] transition-all" style={{ width: `${fixProgress}%` }} />
                  </div>
                  <span className="block text-center text-[var(--secondary)] text-sm mt-2">
                    {checkedItems.filter(Boolean).length} of {checkedItems.length} steps completed
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3">Code Diff</h4>
                  <div className="bg-[var(--bg-glass)] rounded-lg p-4 font-mono text-sm">
                    <div className="py-1 flex gap-2 text-[var(--error)]">
                      <span className="font-bold">-</span>
                      <code>&quot;node-sass&quot;: &quot;^6.0.0&quot;</code>
                    </div>
                    <div className="py-1 flex gap-2 text-[var(--success)]">
                      <span className="font-bold">+</span>
                      <code>&quot;sass&quot;: &quot;^1.69.0&quot;</code>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <button
                    onClick={handleCopy}
                    className={`w-full px-6 py-3 rounded-lg font-semibold cursor-pointer border-none transition-all ${copyText === "Copied!" ? "bg-[var(--success)]" : "bg-gradient-to-br from-[var(--accent)] to-[#0052A3]"} text-white`}
                  >
                    {copyText}
                  </button>
                  <button className="w-full border border-[var(--glass-border)] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer bg-transparent transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    Create Pull Request
                  </button>
                </div>

                <div>
                  <h4 className="mb-3">Terminal Preview</h4>
                  <div className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-lg p-4 font-mono text-xs">
                    <div className="py-1 text-[var(--secondary)]">$ npm uninstall node-sass</div>
                    <div className="py-1 text-[var(--success)]">removed 45 packages</div>
                    <div className="py-1 text-[var(--secondary)]">$ npm install sass</div>
                    <div className="py-1 text-[var(--success)]">added 12 packages</div>
                    <div className="py-1 text-[var(--secondary)]">$ npm run build</div>
                    <div className="py-1 text-[var(--success)]">✓ Build successful in 2.3s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
