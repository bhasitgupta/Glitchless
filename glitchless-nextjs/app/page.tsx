"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HolographicCard from "@/components/HolographicCard";

type DemoType = "analysis" | "plain" | "autofix" | "cicd" | "howitworks" | "service" | "featuresPopup" | null;
type HowItWorksStep = "upload" | "ai" | "fix" | "deploy" | null;
type ServiceStatus = "disconnected" | "connecting" | "connected" | "syncing";

interface ServiceState {
  name: string;
  status: ServiceStatus;
  lastSync: string;
  logsToday: number;
  autoFixed: number;
}

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const [activeDemo, setActiveDemo] = useState<DemoType>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [fixApplied, setFixApplied] = useState(false);
  const [howItWorksStep, setHowItWorksStep] = useState<HowItWorksStep>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deployStatus, setDeployStatus] = useState<"idle" | "building" | "success">("idle");
  const [services, setServices] = useState<Record<string, ServiceState>>({
    GitHub: { name: "GitHub", status: "connected", lastSync: "2 min ago", logsToday: 24, autoFixed: 5 },
    Vercel: { name: "Vercel", status: "connected", lastSync: "Just now", logsToday: 18, autoFixed: 3 },
    Slack: { name: "Slack", status: "connected", lastSync: "5 min ago", logsToday: 12, autoFixed: 2 },
    GitLab: { name: "GitLab", status: "disconnected", lastSync: "Never", logsToday: 0, autoFixed: 0 },
    Netlify: { name: "Netlify", status: "disconnected", lastSync: "Never", logsToday: 0, autoFixed: 0 },
    Discord: { name: "Discord", status: "disconnected", lastSync: "Never", logsToday: 0, autoFixed: 0 },
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <main className="min-h-screen pt-24">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stop squinting at logs.
              <br />
              <span className="hologram-text">Start shipping code.</span>
            </h1>
            <p className="text-xl text-[var(--secondary)] mb-8 max-w-[500px]">
              Glitchless turns deployment nightmares into one-click resolutions.
              AI-powered log analysis that actually fixes your bugs.
            </p>
            <div className="flex gap-4 flex-wrap">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-[0_4px_15px_rgba(0,102,204,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 no-underline"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-[0_4px_15px_rgba(0,102,204,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 no-underline"
                >
                  Login with GitHub
                </Link>
              )}
              <Link
                href="/#how-it-works"
                className="border border-[var(--glass-border)] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] no-underline"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Hero Terminal */}
          <HolographicCard intensity="high" className="animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
            <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="bg-[rgba(255,255,255,0.03)] p-4 flex items-center gap-4 border-b border-[var(--glass-border)]">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--error)]"></span>
                  <span className="w-3 h-3 rounded-full bg-[var(--warning)]"></span>
                  <span className="w-3 h-3 rounded-full bg-[var(--success)]"></span>
                </div>
                <span className="font-black text-2xl inline-block bg-gradient-to-br from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  G
                </span>
                <span className="font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">Glitchless</span>
                <span className="font-mono text-sm text-[var(--secondary)]">build.log</span>
              </div>
            <div className="p-6 font-mono text-sm relative min-h-[250px]">
              {[
                { time: "[10:23:45]", text: "npm ERR! code ERESOLVE", type: "error" },
                { time: "[10:23:46]", text: "npm ERR! ERESOLVE unable to resolve dependency tree", type: "error" },
                { time: "[10:23:47]", text: "npm ERR! While resolving: glitchless@1.0.0", type: "warning" },
                { time: "[10:23:48]", text: "Found: react@18.2.0", type: "info" },
                { time: "[10:23:49]", text: "✓ Glitchless: Dependency conflict detected and fixed", type: "success" },
                { time: "[10:23:50]", text: "✓ Build successful in 2.3s", type: "success" },
              ].map((line, i) => (
                <div
                  key={i}
                  className={`py-1 flex gap-2 opacity-0 animate-[slideIn_0.5s_ease-out_forwards]`}
                  style={{ animationDelay: `${0.5 + i * 0.5}s` }}
                >
                  <span className="text-[var(--secondary)] opacity-70">{line.time}</span>
                  <span
                    className={
                      line.type === "error"
                        ? "text-[var(--error)]"
                        : line.type === "warning"
                        ? "text-[var(--warning)]"
                        : line.type === "success"
                        ? "text-[var(--success)]"
                        : "text-[var(--secondary)]"
                    }
                  >
                    {line.text}
                  </span>
                </div>
              ))}
              <div className="scanning-line"></div>
            </div>
          </div>
          </HolographicCard>
        </div>
      </main>

      {/* Animated Section Divider */}
      <div className="relative h-[300px] overflow-hidden">
        {/* Centered Giant Glitchless Logo with Spin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 animate-[spinLogo_12s_linear_infinite]" style={{ perspective: '1000px' }}>
            <span className="font-black text-[12rem] leading-none inline-block bg-gradient-to-br from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(0,242,255,0.6)] filter brightness-110">
              G
            </span>
            <span className="text-6xl font-bold bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,242,255,0.4)]">
              Glitchless
            </span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Rotating Hologram Title */}
          <div className="text-center mb-12">
            <div 
              className="relative inline-block cursor-pointer group"
              onClick={() => setActiveDemo("featuresPopup")}
            >
              {/* Rotating hologram container */}
              <div 
                className="relative px-12 py-6"
                style={{
                  perspective: '1000px',
                }}
              >
                {/* Main rotating text with gradient effect */}
                <h2 
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all duration-500 group-hover:scale-105"
                  style={{
                    animation: 'hologramRotate 8s linear infinite',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  Why Developers Love Glitchless
                </h2>
                
                {/* Gradient reflection layer */}
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-20 blur-sm"
                  style={{
                    animation: 'hologramRotate 8s linear infinite reverse',
                    transform: 'translateY(10px) scaleY(-0.3)',
                  }}
                >
                  <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                    Why Developers Love Glitchless
                  </span>
                </div>

                {/* Floating particles around title */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-[var(--accent)] rounded-full animate-ping opacity-60"></div>
                <div className="absolute -bottom-2 -right-6 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 -left-8 w-2 h-2 bg-[var(--success)] rounded-full animate-bounce"></div>
              </div>
              
              <p className="text-[var(--accent)] text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to see all features ✨
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🔍", title: "Instant Analysis", desc: "AI scans your logs in seconds, identifying the root cause of failures instantly.", demo: "analysis" },
              { icon: "🎯", title: "Plain English", desc: "Technical jargon translated into human-readable explanations anyone can understand.", demo: "plain" },
              { icon: "⚡", title: "Auto-Fix", desc: "One-click fixes with detailed diff views. Copy, paste, and deploy.", demo: "autofix" },
              { icon: "🔄", title: "CI/CD Integration", desc: "Connect your pipeline and prevent glitches before they reach production.", demo: "cicd" },
            ].map((feature) => (
              <HolographicCard 
                key={feature.title} 
                intensity="medium" 
                className="p-8 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setActiveDemo(feature.demo as DemoType)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 hologram-text">{feature.title}</h3>
                <p className="text-[var(--secondary)]">{feature.desc}</p>
                <p className="text-[var(--accent)] text-sm mt-4 font-medium">Click to try demo →</p>
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-center mb-4">
              How Glitchless Works
            </h2>
            <p className="text-center text-[var(--secondary)] mb-12">
              Click any step to see it in action
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: "1", title: "Upload Your Logs", desc: "Drag and drop your log files or paste a GitHub repository URL", step: "upload" },
                { num: "2", title: "AI Analysis", desc: "Our AI scans and identifies the exact cause of your deployment failure", step: "ai" },
                { num: "3", title: "Get the Fix", desc: "Receive a clear, actionable solution with code diffs and explanations", step: "fix" },
                { num: "4", title: "Deploy", desc: "Apply the fix and ship your code with confidence", step: "deploy" },
              ].map((step) => (
                <div 
                  key={step.num} 
                  className="text-center cursor-pointer group"
                  onClick={() => {
                    setHowItWorksStep(step.step as HowItWorksStep);
                    setActiveDemo("howitworks");
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[#00C8D4] rounded-full flex items-center justify-center text-2xl font-bold text-[var(--primary)] mx-auto mb-4 transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,242,255,0.5)]">
                    {step.num}
                  </div>
                  <h3 className="mb-2 font-semibold group-hover:text-[var(--accent)] transition-colors">{step.title}</h3>
                  <p className="text-[var(--secondary)]">{step.desc}</p>
                  <p className="text-[var(--accent)] text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to try →</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[rgba(0,0,0,0.2)]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Integrations & Services</h2>
            <p className="text-[var(--secondary)] text-lg max-w-2xl mx-auto">
              Connect your favorite tools and let Glitchless monitor them 24/7. 
              Click any service to connect or manage it.
            </p>
          </div>
          
          {/* Live Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.values(services).map((svc) => (
              <HolographicCard 
                key={svc.name} 
                intensity={svc.status === "connected" ? "medium" : "low"} 
                className="p-6 cursor-pointer group transition-all hover:scale-[1.02]"
                onClick={() => {
                  setActiveService(svc.name);
                  setActiveDemo("service");
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition-transform group-hover:scale-110 ${
                        svc.status === "connected" 
                          ? "bg-[var(--accent)]/20 text-[var(--accent)]" 
                          : svc.status === "connecting"
                          ? "bg-[var(--warning)]/20 text-[var(--warning)]"
                          : "bg-black/40 text-[var(--secondary)]"
                      }`}
                    >
                      {svc.status === "connecting" ? (
                        <span style={{ animation: 'smoothSpin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                      ) : svc.name === "GitHub" ? "🔗" : svc.name === "Vercel" ? "▲" : svc.name === "Slack" ? "💬" : svc.name === "GitLab" ? "🦊" : svc.name === "Netlify" ? "🌐" : "🎮"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{svc.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          svc.status === "connected" ? "bg-[var(--success)] animate-pulse" :
                          svc.status === "connecting" ? "bg-[var(--warning)] animate-pulse" :
                          "bg-[var(--secondary)]"
                        }`}></span>
                        <span className={`text-xs capitalize ${
                          svc.status === "connected" ? "text-[var(--success)]" :
                          svc.status === "connecting" ? "text-[var(--warning)]" :
                          "text-[var(--secondary)]"
                        }`}>
                          {svc.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity text-xl">→</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--secondary)]">Last sync</span>
                    <span className="font-medium">{svc.lastSync}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--secondary)]">Activity</span>
                    <span className="font-medium text-[var(--accent)]">{svc.logsToday} logs today</span>
                  </div>
                </div>
                
                {svc.status === "connected" && (
                  <div className="flex gap-2 pt-4 border-t border-[var(--border-color)]">
                    <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-[var(--secondary)]">Auto-Fixed</p>
                      <p className="font-bold text-[var(--success)]">{svc.autoFixed}</p>
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-[var(--secondary)]">Success Rate</p>
                      <p className="font-bold text-[var(--accent)]">98%</p>
                    </div>
                  </div>
                )}
                
                {svc.status === "disconnected" && (
                  <button className="w-full mt-4 bg-[var(--accent)] text-black py-2 rounded-lg font-medium text-sm hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all">
                    Connect Now
                  </button>
                )}
              </HolographicCard>
            ))}
          </div>

          {/* Connection Flow */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-semibold mb-6">Connect in 3 Simple Steps</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {[
                { step: "1", title: "Choose Service", desc: "Select from 20+ integrations" },
                { step: "2", title: "Authenticate", desc: "Secure OAuth connection" },
                { step: "3", title: "Monitor", desc: "Glitchless watches 24/7" },
              ].map((s, i) => (
                <div key={s.step} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[#00C8D4] rounded-full flex items-center justify-center text-2xl font-bold text-[var(--primary)] mx-auto mb-2">
                      {s.step}
                    </div>
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-sm text-[var(--secondary)]">{s.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block text-3xl text-[var(--accent)]">→</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link 
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-block bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-[0_4px_15px_rgba(0,102,204,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 no-underline"
              >
                {isLoggedIn ? "Go to Dashboard →" : "Connect Your First Service →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {activeDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-8" onClick={() => setActiveDemo(null)}>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold hologram-text">
                {activeDemo === "analysis" && "🔍 Live Analysis Demo"}
                {activeDemo === "plain" && "🎯 Plain English Translation"}
                {activeDemo === "autofix" && "⚡ Auto-Fix Demo"}
                {activeDemo === "cicd" && "🔄 CI/CD Integration"}
                {activeDemo === "howitworks" && "🎬 How Glitchless Works"}
                {activeDemo === "featuresPopup" && "✨ Why Developers Love Glitchless"}
              </h3>
              <button onClick={() => setActiveDemo(null)} className="text-[var(--secondary)] hover:text-[var(--accent)] text-2xl">×</button>
            </div>
            
            {/* Instant Analysis Demo */}
            {activeDemo === "analysis" && (
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <p className="text-[var(--error)]">[ERROR] Build failed with exit code 1</p>
                  <p className="text-[var(--secondary)]">npm ERR! Cannot read property 'map' of undefined</p>
                  <p className="text-[var(--warning)]">Warning: React version mismatch detected</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setAnalysisStep(prev => Math.min(prev + 1, 3))}
                    className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-semibold"
                  >
                    {analysisStep === 0 ? "Start Analysis" : analysisStep === 3 ? "Complete" : "Next Step"}
                  </button>
                  {analysisStep > 0 && (
                    <button 
                      onClick={() => setAnalysisStep(0)}
                      className="border border-[var(--border-color)] px-4 py-2 rounded-lg"
                    >
                      Reset
                    </button>
                  )}
                </div>
                {analysisStep >= 1 && (
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-[var(--success)] font-semibold">✓ Step 1: Dependencies scanned</p>
                    <p className="text-sm text-[var(--secondary)]">Found 247 packages, 3 conflicts detected</p>
                  </div>
                )}
                {analysisStep >= 2 && (
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-[var(--success)] font-semibold">✓ Step 2: Error patterns identified</p>
                    <p className="text-sm text-[var(--secondary)]">TypeError in utils/format.js:42 - undefined array access</p>
                  </div>
                )}
                {analysisStep >= 3 && (
                  <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-[var(--accent)] font-semibold">✓ Analysis Complete!</p>
                    <p className="text-sm text-[var(--secondary)]">Root cause: Missing null check before array.map()</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Plain English Demo */}
            {activeDemo === "plain" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 rounded-lg p-4">
                    <p className="text-[var(--error)] font-semibold mb-2">Technical Error:</p>
                    <p className="font-mono text-sm text-[var(--secondary)]">
                      TypeError: Cannot read property 'map' of undefined
                      at formatData (utils/format.js:42:15)
                      at Array.map (&lt;anonymous&gt;)
                    </p>
                  </div>
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4">
                    <p className="text-[var(--success)] font-semibold mb-2">Plain English:</p>
                    <p className="text-sm">
                      Your code tried to process a list of items, but the list was empty. 
                      You need to check if data exists before trying to loop through it.
                    </p>
                  </div>
                </div>
                <div className="bg-[var(--accent)]/10 rounded-lg p-4">
                  <p className="font-semibold mb-2">💡 AI Explanation:</p>
                  <p className="text-[var(--secondary)]">
                    The function <code>formatData</code> received <code>undefined</code> instead of an array. 
                    This usually happens when an API call fails or returns unexpected data. 
                    Always validate your data before processing it.
                  </p>
                </div>
              </div>
            )}
            
            {/* Auto-Fix Demo */}
            {activeDemo === "autofix" && (
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <p className="text-red-400">- const formatted = data.map(item =&gt; item.name);</p>
                  <p className="text-green-400">+ const formatted = data?.map(item =&gt; item.name) ?? [];</p>
                </div>
                <button 
                  onClick={() => setFixApplied(!fixApplied)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    fixApplied 
                      ? "bg-[var(--success)] text-black" 
                      : "bg-[var(--accent)] text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.5)]"
                  }`}
                >
                  {fixApplied ? "✓ Fix Applied!" : "⚡ Apply Fix"}
                </button>
                {fixApplied && (
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-[var(--success)] font-semibold">✓ Fix successfully applied!</p>
                    <p className="text-sm text-[var(--secondary)] mt-2">Changes saved. Your build should now pass.</p>
                    <div className="flex gap-2 mt-4">
                      <button className="bg-[var(--accent)]/20 text-[var(--accent)] px-3 py-1 rounded text-sm">Copy Code</button>
                      <button className="bg-[var(--accent)]/20 text-[var(--accent)] px-3 py-1 rounded text-sm">View Diff</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* CI/CD Demo */}
            {activeDemo === "cicd" && (
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-4 text-center">
                    <p className="text-3xl mb-2">🔗</p>
                    <p className="font-semibold">GitHub</p>
                    <p className="text-sm text-[var(--secondary)]">Connected</p>
                  </div>
                  <div className="flex-1 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-4 text-center">
                    <p className="text-3xl mb-2">🚀</p>
                    <p className="font-semibold">Vercel</p>
                    <p className="text-sm text-[var(--secondary)]">Connected</p>
                  </div>
                  <div className="flex-1 bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4 text-center">
                    <p className="text-3xl mb-2">✓</p>
                    <p className="font-semibold">Glitchless</p>
                    <p className="text-sm text-[var(--success)]">Active</p>
                  </div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-[var(--success)] animate-pulse"></div>
                    <p className="font-mono text-sm">Monitoring pipeline: <span className="text-[var(--accent)]">main</span> branch</p>
                  </div>
                  <p className="text-[var(--secondary)] text-sm mt-2 ml-7">
                    Auto-detects build failures • Instant analysis • Prevents bad deploys
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[var(--accent)] text-black py-2 rounded-lg font-semibold">
                    Configure Webhook
                  </button>
                  <button className="flex-1 border border-[var(--border-color)] py-2 rounded-lg">
                    View Docs
                  </button>
                </div>
              </div>
            )}
            
            {/* Service Detail Modal */}
            {activeDemo === "service" && activeService && (
              <div className="space-y-6">
                {(() => {
                  const svc = services[activeService];
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-3xl">
                          {activeService === "GitHub" ? "🔗" : activeService === "Vercel" ? "▲" : activeService === "Slack" ? "💬" : activeService === "GitLab" ? "🦊" : activeService === "Netlify" ? "🌐" : "🎮"}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{activeService}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${svc.status === "connected" ? "bg-[var(--success)] animate-pulse" : svc.status === "connecting" ? "bg-[var(--warning)]" : "bg-[var(--secondary)]"}`}></span>
                            <span className={`text-sm capitalize ${svc.status === "connected" ? "text-[var(--success)]" : svc.status === "connecting" ? "text-[var(--warning)]" : "text-[var(--secondary)]"}`}>
                              {svc.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {svc.status === "connected" ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black/30 rounded-lg p-4 text-center">
                              <p className="text-3xl font-bold text-[var(--accent)]">{svc.logsToday}</p>
                              <p className="text-xs text-[var(--secondary)]">Logs Today</p>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4 text-center">
                              <p className="text-3xl font-bold text-[var(--success)]">{svc.autoFixed}</p>
                              <p className="text-xs text-[var(--secondary)]">Auto-Fixed</p>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4 text-center">
                              <p className="text-3xl font-bold text-[var(--warning)]">98%</p>
                              <p className="text-xs text-[var(--secondary)]">Success Rate</p>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4 text-center">
                              <p className="text-3xl font-bold text-[var(--accent)]">{svc.lastSync}</p>
                              <p className="text-xs text-[var(--secondary)]">Last Sync</p>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold mb-3">Recent Activity</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-[var(--success)]">✓</span>
                                <span>Fixed TypeError in auth.js</span>
                                <span className="text-[var(--secondary)] ml-auto">2 min ago</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[var(--success)]">✓</span>
                                <span>Resolved dependency conflict</span>
                                <span className="text-[var(--secondary)] ml-auto">15 min ago</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[var(--accent)]">ℹ</span>
                                <span>Analyzed build logs</span>
                                <span className="text-[var(--secondary)] ml-auto">32 min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                setServices(prev => ({
                                  ...prev,
                                  [activeService]: { ...prev[activeService], status: "syncing", lastSync: "Just now" }
                                }));
                                setTimeout(() => {
                                  setServices(prev => ({
                                    ...prev,
                                    [activeService]: { ...prev[activeService], status: "connected" }
                                  }));
                                }, 2000);
                              }}
                              className="flex-1 bg-[var(--accent)] text-black py-3 rounded-lg font-semibold"
                            >
                              🔄 Sync Now
                            </button>
                            <button 
                              onClick={() => {
                                setServices(prev => ({
                                  ...prev,
                                  [activeService]: { ...prev[activeService], status: "disconnected", lastSync: "Never", logsToday: 0, autoFixed: 0 }
                                }));
                              }}
                              className="border border-[var(--error)] text-[var(--error)] px-6 py-3 rounded-lg hover:bg-[var(--error)]/10"
                            >
                              Disconnect
                            </button>
                          </div>
                        </>
                      ) : svc.status === "connecting" ? (
                        <div className="text-center py-8">
                          <div 
                            className="w-16 h-16 border-4 border-[var(--warning)]/30 border-t-[var(--warning)] rounded-full mx-auto mb-4"
                            style={{ animation: 'smoothSpin 1s linear infinite' }}
                          ></div>
                          <p className="font-semibold">Connecting to {activeService}...</p>
                          <p className="text-sm text-[var(--secondary)]">Authorizing via OAuth</p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-black/20 rounded-lg p-6 mb-6">
                            <h4 className="font-semibold mb-2">What you'll get:</h4>
                            <ul className="space-y-2 text-sm text-[var(--secondary)]">
                              <li className="flex items-center gap-2">
                                <span className="text-[var(--accent)]">✓</span> Real-time error monitoring
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-[var(--accent)]">✓</span> Automatic fix suggestions
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-[var(--accent)]">✓</span> Instant notifications
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-[var(--accent)]">✓</span> 24/7 log analysis
                              </li>
                            </ul>
                          </div>
                          <button 
                            onClick={() => {
                              setServices(prev => ({
                                ...prev,
                                [activeService]: { ...prev[activeService], status: "connecting" }
                              }));
                              setTimeout(() => {
                                setServices(prev => ({
                                  ...prev,
                                  [activeService]: { 
                                    ...prev[activeService], 
                                    status: "connected", 
                                    lastSync: "Just now",
                                    logsToday: Math.floor(Math.random() * 20) + 5,
                                    autoFixed: Math.floor(Math.random() * 5) + 1
                                  }
                                }));
                              }, 2500);
                            }}
                            className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all"
                          >
                            🔗 Connect {activeService}
                          </button>
                        </>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* How It Works Interactive Demo */}
            {activeDemo === "howitworks" && (
              <div className="space-y-4">
                {/* Step navigation */}
                <div className="flex gap-2 mb-6">
                  {[
                    { id: "upload", label: "1. Upload", icon: "📁" },
                    { id: "ai", label: "2. Analyze", icon: "🤖" },
                    { id: "fix", label: "3. Fix", icon: "⚡" },
                    { id: "deploy", label: "4. Deploy", icon: "🚀" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setHowItWorksStep(s.id as HowItWorksStep)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        howItWorksStep === s.id
                          ? "bg-[var(--accent)] text-black"
                          : "bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <span className="mr-1">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
                
                {/* Upload Step */}
                {howItWorksStep === "upload" && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="bg-[var(--card-bg)] border-2 border-dashed border-[var(--accent)]/50 rounded-xl p-8 text-center">
                      <p className="text-4xl mb-4">📁</p>
                      <p className="font-semibold mb-2">Drag & drop your log files here</p>
                      <p className="text-[var(--secondary)] text-sm mb-4">or paste a GitHub repository URL</p>
                      <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        className="w-full max-w-md bg-black/50 border border-[var(--border-color)] rounded-lg px-4 py-2 text-center"
                        readOnly
                        value="https://github.com/acme-corp/ecommerce-app"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        let progress = 0;
                        const interval = setInterval(() => {
                          progress += 10;
                          setUploadProgress(progress);
                          if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => setHowItWorksStep("ai"), 500);
                          }
                        }, 100);
                      }}
                      className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-semibold"
                    >
                      {uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress}%...` : "Start Upload Demo"}
                    </button>
                    {uploadProgress > 0 && (
                      <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--accent)] transition-all duration-100"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* AI Analysis Step */}
                {howItWorksStep === "ai" && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></div>
                        <span className="font-black text-lg bg-gradient-to-br from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent">G</span>
                        <span className="text-[var(--accent)]">AI analyzing logs...</span>
                      </div>
                      <p className="text-[var(--secondary)]">Scanning 1,247 lines of build output</p>
                      <p className="text-[var(--secondary)]">Checking dependencies: react, next, typescript...</p>
                      <p className="text-[var(--error)]">⚠ Found: TypeError in pages/index.tsx:42</p>
                    </div>
                    <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-4">
                      <p className="font-semibold text-[var(--accent)] mb-2">🔍 Root Cause Identified</p>
                      <p className="text-sm">Missing null check before accessing user.profile.name</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setHowItWorksStep("fix")}
                        className="flex-1 bg-[var(--accent)] text-black py-2 rounded-lg font-semibold"
                      >
                        See the Fix →
                      </button>
                      <button 
                        onClick={() => setHowItWorksStep("upload")}
                        className="border border-[var(--border-color)] px-4 py-2 rounded-lg"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Fix Step */}
                {howItWorksStep === "fix" && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                      <p className="text-red-400 mb-1">- const displayName = user.profile.name;</p>
                      <p className="text-green-400">+ const displayName = user?.profile?.name ?? "Anonymous";</p>
                    </div>
                    <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4">
                      <p className="text-sm text-[var(--success)] mb-2">✓ Safe optional chaining applied</p>
                      <p className="text-sm text-[var(--secondary)]">This prevents crashes when user or profile is undefined</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setHowItWorksStep("deploy")}
                        className="flex-1 bg-[var(--accent)] text-black py-2 rounded-lg font-semibold"
                      >
                        Deploy Fix →
                      </button>
                      <button 
                        onClick={() => setHowItWorksStep("ai")}
                        className="border border-[var(--border-color)] px-4 py-2 rounded-lg"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Deploy Step */}
                {howItWorksStep === "deploy" && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    {deployStatus === "idle" && (
                      <div className="text-center py-8">
                        <p className="text-6xl mb-4">🚀</p>
                        <p className="font-semibold mb-2">Ready to deploy</p>
                        <p className="text-[var(--secondary)] mb-6">Your fix has been applied and tested</p>
                        <button 
                          onClick={() => {
                            setDeployStatus("building");
                            setTimeout(() => setDeployStatus("success"), 2000);
                          }}
                          className="bg-[var(--accent)] text-black px-8 py-3 rounded-lg font-semibold"
                        >
                          Deploy to Production
                        </button>
                      </div>
                    )}
                    {deployStatus === "building" && (
                      <div className="text-center py-8">
                        <div 
                          className="w-16 h-16 border-4 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full mx-auto mb-4"
                          style={{ animation: 'smoothSpin 1.5s linear infinite' }}
                        ></div>
                        <p className="font-semibold">Building...</p>
                        <p className="text-[var(--secondary)] text-sm">Compiling and running tests</p>
                      </div>
                    )}
                    {deployStatus === "success" && (
                      <div className="text-center py-8 animate-[fadeIn_0.3s_ease-out]">
                        <p className="text-6xl mb-4">✅</p>
                        <p className="font-semibold text-[var(--success)] mb-2">Deployed Successfully!</p>
                        <p className="text-[var(--secondary)] mb-6">Your fix is now live in production</p>
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => {
                              setDeployStatus("idle");
                              setHowItWorksStep(null);
                              setActiveDemo(null);
                            }}
                            className="bg-[var(--success)] text-black px-6 py-2 rounded-lg font-semibold"
                          >
                            Finish
                          </button>
                          <button 
                            onClick={() => {
                              setDeployStatus("idle");
                              setHowItWorksStep("upload");
                              setUploadProgress(0);
                            }}
                            className="border border-[var(--border-color)] px-6 py-2 rounded-lg"
                          >
                            Start Over
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {!howItWorksStep && (
                  <div className="text-center py-8">
                    <p className="text-[var(--secondary)] mb-4">Select a step above to see how Glitchless works</p>
                    <button 
                      onClick={() => setHowItWorksStep("upload")}
                      className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-semibold"
                    >
                      Start from Upload →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Features Popup - All 4 Unique Uses */}
            {activeDemo === "featuresPopup" && (
              <div className="space-y-6">
                <p className="text-[var(--secondary)] text-center mb-6">
                  Discover the 4 powerful features that make Glitchless the #1 choice for developers
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Feature 1: Instant Analysis */}
                  <div className="bg-black/30 border border-[var(--accent)]/30 rounded-xl p-6 hover:bg-black/40 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🔍
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2 text-[var(--accent)]">Instant Analysis</h4>
                        <p className="text-sm text-[var(--secondary)] mb-3">
                          AI scans your logs in seconds, identifying the root cause of failures instantly.
                        </p>
                        <ul className="text-xs text-[var(--secondary)] space-y-1">
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Sub-second processing</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Multi-format support</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Pattern recognition</li>
                        </ul>
                        <button 
                          onClick={() => setActiveDemo("analysis")}
                          className="mt-4 text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)]/20 transition-all"
                        >
                          Try Demo →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2: Plain English */}
                  <div className="bg-black/30 border border-[var(--accent)]/30 rounded-xl p-6 hover:bg-black/40 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🎯
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2 text-[var(--accent)]">Plain English</h4>
                        <p className="text-sm text-[var(--secondary)] mb-3">
                          Technical jargon translated into human-readable explanations anyone can understand.
                        </p>
                        <ul className="text-xs text-[var(--secondary)] space-y-1">
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> No tech-speak</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Actionable advice</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Team-friendly</li>
                        </ul>
                        <button 
                          onClick={() => setActiveDemo("plain")}
                          className="mt-4 text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)]/20 transition-all"
                        >
                          Try Demo →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3: Auto-Fix */}
                  <div className="bg-black/30 border border-[var(--accent)]/30 rounded-xl p-6 hover:bg-black/40 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[var(--success)]/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        ⚡
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2 text-[var(--success)]">Auto-Fix</h4>
                        <p className="text-sm text-[var(--secondary)] mb-3">
                          One-click fixes with detailed diff views. Copy, paste, and deploy.
                        </p>
                        <ul className="text-xs text-[var(--secondary)] space-y-1">
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Ready-to-use code</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Side-by-side diffs</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Safe rollbacks</li>
                        </ul>
                        <button 
                          onClick={() => setActiveDemo("autofix")}
                          className="mt-4 text-xs bg-[var(--success)]/10 text-[var(--success)] px-3 py-1.5 rounded-lg hover:bg-[var(--success)]/20 transition-all"
                        >
                          Try Demo →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feature 4: CI/CD Integration */}
                  <div className="bg-black/30 border border-[var(--accent)]/30 rounded-xl p-6 hover:bg-black/40 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[var(--warning)]/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🔄
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2 text-[var(--warning)]">CI/CD Integration</h4>
                        <p className="text-sm text-[var(--secondary)] mb-3">
                          Connect your pipeline and prevent glitches before they reach production.
                        </p>
                        <ul className="text-xs text-[var(--secondary)] space-y-1">
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> GitHub/Vercel/Slack</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Pre-deploy checks</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> Auto-notifications</li>
                        </ul>
                        <button 
                          onClick={() => setActiveDemo("cicd")}
                          className="mt-4 text-xs bg-[var(--warning)]/10 text-[var(--warning)] px-3 py-1.5 rounded-lg hover:bg-[var(--warning)]/20 transition-all"
                        >
                          Try Demo →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--border-color)]">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--accent)]">50K+</p>
                    <p className="text-xs text-[var(--secondary)]">Developers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--success)]">2M+</p>
                    <p className="text-xs text-[var(--secondary)]">Logs Analyzed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--warning)]">98%</p>
                    <p className="text-xs text-[var(--secondary)]">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--accent)]">&lt;3s</p>
                    <p className="text-xs text-[var(--secondary)]">Avg Response</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link 
                    href="/login"
                    className="flex-1 bg-[var(--accent)] text-black py-3 rounded-lg font-semibold text-center hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all"
                  >
                    Get Started Free →
                  </Link>
                  <button 
                    onClick={() => setActiveDemo(null)}
                    className="px-6 py-3 border border-[var(--border-color)] rounded-lg hover:border-[var(--accent)] transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
