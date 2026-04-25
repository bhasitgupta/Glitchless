"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DashboardNav from "@/components/DashboardNav";
import HolographicCard from "@/components/HolographicCard";

type ServiceStatus = "disconnected" | "connecting" | "connected" | "syncing";

interface ServiceState {
  name: string;
  status: ServiceStatus;
  lastSync: string;
  logsToday: number;
  autoFixed: number;
}

export default function DashboardPage() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Connecting to repository...");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [services, setServices] = useState<Record<string, ServiceState>>({
    GitHub: { name: "GitHub", status: "connected", lastSync: "2 min ago", logsToday: 24, autoFixed: 5 },
    Vercel: { name: "Vercel", status: "connected", lastSync: "Just now", logsToday: 18, autoFixed: 3 },
    Slack: { name: "Slack", status: "connected", lastSync: "5 min ago", logsToday: 12, autoFixed: 2 },
  });

  useEffect(() => {
    // Handle OAuth callback params - only run once on mount
    const params = new URLSearchParams(window.location.search);
    if (params.get("user_id")) {
      login({
        id: params.get("user_id") || "",
        name: params.get("user_name") || "Developer",
        email: params.get("user_email") || "",
        avatar: params.get("user_avatar") || "",
      });
      window.history.replaceState({}, "", "/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      startScanning();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    startScanning();
  };

  const startScanning = () => {
    setScanning(true);
    setProgress(0);
    const statuses = [
      "Connecting to repository...",
      "Scanning log files...",
      "Analyzing error patterns...",
      "Identifying root cause...",
      "Generating insights...",
    ];
    let p = 0;
    let idx = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p % 20 === 0 && idx < statuses.length) {
        setStatusText(statuses[idx]);
        idx++;
      }
      if (p >= 100) {
        clearInterval(interval);
        setStatusText("Analysis complete!");
        setTimeout(() => {
          window.location.href = "/analysis";
        }, 500);
      }
    }, 40);
  };

  const chipTemplates: Record<string, string> = {
    Vercel: "https://vercel.com/username/project",
    Netlify: "https://app.netlify.com/sites/your-site",
    Jenkins: "https://jenkins.example.com/job/your-job",
    "GitHub Actions": "https://github.com/username/repository/actions",
  };

  return (
    <>
      <DashboardNav />

      <main className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Command Center</h1>
              <p className="text-[var(--secondary)] text-lg">
                Drop your deployment logs or paste a repository URL to begin analysis
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--secondary)] font-medium">
                {user?.name || "Developer"}
              </span>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 mb-12">
            <div className="flex gap-4 mb-8 border-b border-[var(--border-color)] pb-4">
              <button
                onClick={() => setActiveTab("file")}
                className={`bg-transparent border-none px-6 py-3 text-base font-medium cursor-pointer rounded-lg transition-all ${
                  activeTab === "file"
                    ? "bg-[rgba(0,242,255,0.1)] text-[var(--accent)]"
                    : "text-[var(--secondary)] hover:text-[var(--accent)]"
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setActiveTab("url")}
                className={`bg-transparent border-none px-6 py-3 text-base font-medium cursor-pointer rounded-lg transition-all ${
                  activeTab === "url"
                    ? "bg-[rgba(0,242,255,0.1)] text-[var(--accent)]"
                    : "text-[var(--secondary)] hover:text-[var(--accent)]"
                }`}
              >
                GitHub URL
              </button>
            </div>

            {activeTab === "file" ? (
              <HolographicCard intensity="medium" className="p-16 text-center cursor-pointer transition-all">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                    dragOver
                      ? "border-[var(--accent)] bg-[rgba(0,242,255,0.05)]"
                      : "border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[rgba(0,242,255,0.05)]"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={handleFileUpload}
                >
                  <div className="text-6xl mb-4">📁</div>
                  <h3 className="text-2xl mb-2 hologram-text">Drag & Drop Log Files</h3>
                  <p className="text-[var(--secondary)] mb-1">or click to browse</p>
                  <p className="text-[var(--secondary)] text-sm opacity-70">Supports .log and .txt files</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".log,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </HolographicCard>
            ) : (
              <div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="flex-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 text-white text-base font-mono focus:outline-none focus:border-[var(--accent)]"
                  />
                  <button
                    onClick={startScanning}
                    className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer border-none transition-all hover:shadow-[0_4px_15px_rgba(0,102,204,0.3)]"
                  >
                    Analyze
                  </button>
                </div>
                <div className="mt-6">
                  <p className="text-[var(--secondary)] text-sm mb-3">Quick connect:</p>
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(chipTemplates).map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setUrlInput(chipTemplates[chip])}
                        className="bg-[var(--glass-bg)] border border-[var(--border-color)] px-4 py-2 rounded-full text-sm text-[var(--secondary)] cursor-pointer transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Analysis */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Recent Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { status: "Failed", type: "error", time: "2 hours ago", title: "Dependency Conflict", desc: "React 18 incompatibility with node-sass" },
                { status: "Fixed", type: "success", time: "Yesterday", title: "Environment Variable Missing", desc: "API_KEY not set in production" },
                { status: "Warning", type: "warning", time: "3 days ago", title: "Memory Limit Exceeded", desc: "Build process exceeded 4GB memory" },
              ].map((item) => (
                <HolographicCard key={item.title} intensity="low" className="transition-all hover:-translate-y-1">
                  <Link
                    href="/analysis"
                    className="block p-4 transition-all no-underline"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          item.type === "error"
                            ? "bg-[rgba(255,76,76,0.2)] text-[var(--error)]"
                            : item.type === "success"
                            ? "bg-[rgba(16,185,129,0.2)] text-[var(--success)]"
                            : "bg-[rgba(245,158,11,0.2)] text-[var(--warning)]"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[var(--secondary)] text-sm">{item.time}</span>
                    </div>
                    <h3 className="text-lg mb-2 hologram-text">{item.title}</h3>
                    <p className="text-[var(--secondary)] text-sm mb-4">{item.desc}</p>
                    <span className="text-[var(--accent)] font-medium text-sm">View Details →</span>
                  </Link>
                </HolographicCard>
              ))}
            </div>
          </div>

          {/* Active Services */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Active Services</h2>
                <p className="text-[var(--secondary)] text-sm">Connected integrations running 24/7</p>
              </div>
              <button 
                onClick={() => {
                  const newService = prompt("Enter service name (GitLab, Netlify, or Discord):");
                  if (newService && !["GitLab", "Netlify", "Discord"].includes(newService)) {
                    alert("Available services: GitLab, Netlify, Discord");
                    return;
                  }
                  if (newService && !services[newService]) {
                    setServices(prev => ({
                      ...prev,
                      [newService]: { name: newService, status: "disconnected", lastSync: "Never", logsToday: 0, autoFixed: 0 }
                    }));
                  }
                }}
                className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--accent)]/20 transition-all"
              >
                + Add Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(services).map((service) => (
                <HolographicCard 
                  key={service.name} 
                  intensity={service.status === "connected" ? "medium" : "low"} 
                  className="p-6 group cursor-pointer transition-all hover:scale-[1.02]"
                  onClick={() => {
                    setActiveService(service.name);
                    setShowServiceModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-transform group-hover:scale-110 ${
                          service.status === "connected" 
                            ? "bg-[var(--accent)]/20 text-[var(--accent)]" 
                            : service.status === "connecting" || service.status === "syncing"
                            ? "bg-[var(--warning)]/20 text-[var(--warning)]"
                            : "bg-black/40 text-[var(--secondary)]"
                        }`}
                      >
                        {service.status === "connecting" || service.status === "syncing" ? (
                          <span style={{ animation: 'smoothSpin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                        ) : service.name === "GitHub" ? "🔗" : service.name === "Vercel" ? "▲" : service.name === "Slack" ? "💬" : service.name === "GitLab" ? "🦊" : service.name === "Netlify" ? "🌐" : "🎮"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            service.status === "connected" ? "bg-[var(--success)] animate-pulse" :
                            service.status === "connecting" || service.status === "syncing" ? "bg-[var(--warning)] animate-pulse" :
                            "bg-[var(--secondary)]"
                          }`}></span>
                          <span className={`text-xs capitalize ${
                            service.status === "connected" ? "text-[var(--success)]" :
                            service.status === "connecting" || service.status === "syncing" ? "text-[var(--warning)]" :
                            "text-[var(--secondary)]"
                          }`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--secondary)]">Last sync</span>
                      <span className="font-medium">{service.lastSync}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--secondary)]">Activity</span>
                      <span className="font-medium text-[var(--accent)]">{service.logsToday} logs today</span>
                    </div>
                  </div>
                  {service.status === "connected" && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <div className="flex gap-2">
                        <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-[var(--secondary)]">Today's Logs</p>
                          <p className="font-bold text-[var(--accent)]">{service.logsToday}</p>
                        </div>
                        <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-[var(--secondary)]">Auto-Fixed</p>
                          <p className="font-bold text-[var(--success)]">{service.autoFixed}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {service.status === "disconnected" && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setServices(prev => ({
                          ...prev,
                          [service.name]: { ...prev[service.name], status: "connecting" }
                        }));
                        setTimeout(() => {
                          setServices(prev => ({
                            ...prev,
                            [service.name]: { 
                              ...prev[service.name], 
                              status: "connected", 
                              lastSync: "Just now",
                              logsToday: Math.floor(Math.random() * 20) + 5,
                              autoFixed: Math.floor(Math.random() * 5) + 1
                            }
                          }));
                        }, 2000);
                      }}
                      className="w-full mt-4 bg-[var(--accent)] text-black py-2 rounded-lg font-medium text-sm hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all"
                    >
                      Connect Now
                    </button>
                  )}
                </HolographicCard>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🔍", value: "24", label: "Logs Analyzed" },
              { icon: "✅", value: "18", label: "Issues Fixed" },
              { icon: "⏱️", value: "6.5h", label: "Time Saved" },
              { icon: "🚀", value: "12", label: "Deployments" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 flex items-center gap-4 transition-all hover:border-[var(--accent)] hover:-translate-y-1"
              >
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-[var(--accent)]">{stat.value}</p>
                  <p className="text-[var(--secondary)] text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Scanning Overlay */}
      {scanning && (
        <div className="fixed inset-0 bg-[rgba(11,14,20,0.98)] backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-center">
            {/* Modern 3-Ring Scanner Animation - based on original PHP design */}
            <div className="relative w-[150px] h-[150px] mx-auto mb-8">
              {/* Outer ring - 150px */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-transparent border-t-[var(--accent)]"
                style={{
                  width: 150,
                  height: 150,
                  animation: "spin 1.5s linear infinite",
                }}
              />
              {/* Middle ring - 120px */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-transparent border-t-[var(--accent)]"
                style={{
                  width: 120,
                  height: 120,
                  animation: "spin 1.5s linear infinite",
                  animationDelay: "0.2s",
                }}
              />
              {/* Inner ring - 90px */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-transparent border-t-[var(--accent)]"
                style={{
                  width: 90,
                  height: 90,
                  animation: "spin 1.5s linear infinite",
                  animationDelay: "0.4s",
                }}
              />
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-4xl bg-gradient-to-br from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  G
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-3">Analyzing Logs</h2>
            <p className="text-[var(--secondary)] text-lg mb-8 min-h-[28px]">{statusText}</p>

            {/* Progress Bar */}
            <div className="w-[300px] h-1 bg-[rgba(255,255,255,0.1)] rounded mx-auto overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--success)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {showServiceModal && activeService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-8" onClick={() => setShowServiceModal(false)}>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const svc = services[activeService];
              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-3xl">
                        {activeService === "GitHub" ? "🔗" : activeService === "Vercel" ? "▲" : activeService === "Slack" ? "💬" : activeService === "GitLab" ? "🦊" : activeService === "Netlify" ? "🌐" : "🎮"}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{activeService}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${svc.status === "connected" ? "bg-[var(--success)] animate-pulse" : svc.status === "connecting" || svc.status === "syncing" ? "bg-[var(--warning)]" : "bg-[var(--secondary)]"}`}></span>
                          <span className={`text-sm capitalize ${svc.status === "connected" ? "text-[var(--success)]" : svc.status === "connecting" || svc.status === "syncing" ? "text-[var(--warning)]" : "text-[var(--secondary)]"}`}>
                            {svc.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setShowServiceModal(false)} className="text-[var(--secondary)] hover:text-[var(--accent)] text-2xl">×</button>
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
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setServices(prev => ({
                              ...prev,
                              [activeService]: { ...prev[activeService], status: "syncing" }
                            }));
                            setTimeout(() => {
                              setServices(prev => ({
                                ...prev,
                                [activeService]: { ...prev[activeService], status: "connected", lastSync: "Just now" }
                              }));
                            }, 2000);
                          }}
                          className="flex-1 bg-[var(--accent)] text-black py-3 rounded-lg font-semibold"
                        >
                          🔄 Sync Now
                        </button>
                        <button 
                          onClick={() => {
                            setServices(prev => {
                              const { [activeService]: _, ...rest } = prev;
                              return rest;
                            });
                            setShowServiceModal(false);
                          }}
                          className="border border-[var(--error)] text-[var(--error)] px-6 py-3 rounded-lg hover:bg-[var(--error)]/10"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : svc.status === "connecting" || svc.status === "syncing" ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-[var(--warning)]/30 border-t-[var(--warning)] rounded-full mx-auto mb-4" style={{ animation: 'smoothSpin 1s linear infinite' }}></div>
                      <p className="font-semibold">{svc.status === "connecting" ? `Connecting to ${activeService}...` : "Syncing data..."}</p>
                      <p className="text-sm text-[var(--secondary)]">{svc.status === "connecting" ? "Authorizing via OAuth" : "Fetching latest logs"}</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-black/20 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold mb-2">What you'll get:</h4>
                        <ul className="space-y-2 text-sm text-[var(--secondary)]">
                          <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Real-time error monitoring</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Automatic fix suggestions</li>
                          <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Instant notifications</li>
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
                          }, 2000);
                        }}
                        className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-semibold"
                      >
                        🔗 Connect {activeService}
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
