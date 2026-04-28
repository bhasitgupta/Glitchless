"use client";

import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import HolographicCard from "@/components/HolographicCard";

type ServiceStatus = "disconnected" | "connecting" | "connected" | "syncing";

interface ServiceState {
  name: string;
  icon: string;
  category: string;
  status: ServiceStatus;
  lastSync: string;
  logsToday: number;
  autoFixed: number;
  description: string;
}

const AVAILABLE_SERVICES = [
  { name: "GitHub", icon: "🔗", category: "Version Control", description: "Auto-detect failures in PRs and commits" },
  { name: "GitLab", icon: "🦊", category: "Version Control", description: "CI/CD pipeline monitoring" },
  { name: "Bitbucket", icon: "📦", category: "Version Control", description: "Team collaboration alerts" },
  { name: "Vercel", icon: "▲", category: "Deployment", description: "Instant deploy previews and analytics" },
  { name: "Netlify", icon: "🌐", category: "Deployment", description: "Edge function debugging" },
  { name: "AWS", icon: "☁️", category: "Deployment", description: "CloudWatch integration" },
  { name: "Slack", icon: "💬", category: "Communication", description: "Real-time error alerts to channels" },
  { name: "Discord", icon: "🎮", category: "Communication", description: "Dev team notifications" },
  { name: "Email", icon: "📧", category: "Communication", description: "Daily summary reports" },
  { name: "Jira", icon: "📋", category: "Project Management", description: "Auto-create tickets from errors" },
  { name: "Linear", icon: "⬡", category: "Project Management", description: "Issue tracking integration" },
  { name: "Datadog", icon: "📊", category: "Monitoring", description: "Advanced analytics and metrics" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Record<string, ServiceState>>({
    GitHub: { name: "GitHub", icon: "🔗", category: "Version Control", status: "connected", lastSync: "2 min ago", logsToday: 24, autoFixed: 5, description: "Auto-detect failures in PRs and commits" },
    Vercel: { name: "Vercel", icon: "▲", category: "Deployment", status: "connected", lastSync: "Just now", logsToday: 18, autoFixed: 3, description: "Instant deploy previews and analytics" },
    Slack: { name: "Slack", icon: "💬", category: "Communication", status: "connected", lastSync: "5 min ago", logsToday: 12, autoFixed: 2, description: "Real-time error alerts to channels" },
  });
  const [activeService, setActiveService] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "connected" | "available">("all");

  const connectService = (serviceName: string) => {
    const svc = AVAILABLE_SERVICES.find(s => s.name === serviceName);
    if (!svc) return;

    setServices(prev => ({
      ...prev,
      [serviceName]: { ...svc, status: "connecting", lastSync: "Connecting...", logsToday: 0, autoFixed: 0 }
    }));

    setTimeout(() => {
      setServices(prev => ({
        ...prev,
        [serviceName]: { 
          ...prev[serviceName], 
          status: "connected", 
          lastSync: "Just now",
          logsToday: Math.floor(Math.random() * 20) + 5,
          autoFixed: Math.floor(Math.random() * 5) + 1
        }
      }));
    }, 2000);
  };

  const disconnectService = (serviceName: string) => {
    setServices(prev => {
      const { [serviceName]: _, ...rest } = prev;
      return rest;
    });
  };

  const syncService = (serviceName: string) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: { ...prev[serviceName], status: "syncing" }
    }));

    setTimeout(() => {
      setServices(prev => ({
        ...prev,
        [serviceName]: { 
          ...prev[serviceName], 
          status: "connected", 
          lastSync: "Just now",
          logsToday: prev[serviceName].logsToday + Math.floor(Math.random() * 5)
        }
      }));
    }, 1500);
  };

  const connectedServices = Object.values(services).filter(s => s.status === "connected" || s.status === "syncing");
  const availableServices = AVAILABLE_SERVICES.filter(s => !services[s.name]);

  const displayServices = filter === "all" 
    ? [...Object.values(services), ...availableServices.map(s => ({ ...s, status: "disconnected" as ServiceStatus, lastSync: "Never", logsToday: 0, autoFixed: 0 }))]
    : filter === "connected" 
    ? connectedServices
    : availableServices.map(s => ({ ...s, status: "disconnected" as ServiceStatus, lastSync: "Never", logsToday: 0, autoFixed: 0 }));

  return (
    <>
      <DashboardNav />
      
      <main className="min-h-screen pt-24 pb-12 px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Services & Integrations</h1>
            <p className="text-[var(--secondary)]">
              Manage your connected services and discover new integrations
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[var(--accent)]">{connectedServices.length}</p>
              <p className="text-sm text-[var(--secondary)]">Connected</p>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[var(--success)]">
                {Object.values(services).reduce((acc, s) => acc + s.autoFixed, 0)}
              </p>
              <p className="text-sm text-[var(--secondary)]">Auto-Fixed Today</p>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[var(--warning)]">
                {Object.values(services).reduce((acc, s) => acc + s.logsToday, 0)}
              </p>
              <p className="text-sm text-[var(--secondary)]">Logs Analyzed</p>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[var(--accent)]">{availableServices.length}</p>
              <p className="text-sm text-[var(--secondary)]">Available</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "all", label: "All Services", count: AVAILABLE_SERVICES.length },
              { id: "connected", label: "Connected", count: connectedServices.length },
              { id: "available", label: "Available", count: availableServices.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === tab.id
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--secondary)] hover:border-[var(--accent)]"
                }`}
              >
                {tab.label}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${filter === tab.id ? "bg-black/20" : "bg-[var(--accent)]/10 text-[var(--accent)]"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => (
              <HolographicCard 
                key={service.name} 
                intensity={service.status === "connected" || service.status === "syncing" ? "medium" : "low"} 
                className="p-6 group cursor-pointer transition-all hover:scale-[1.02]"
                onClick={() => setActiveService(service.name)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition-transform group-hover:scale-110 ${
                        service.status === "connected" || service.status === "syncing"
                          ? "bg-[var(--accent)]/20 text-[var(--accent)]" 
                          : service.status === "connecting"
                          ? "bg-[var(--warning)]/20 text-[var(--warning)]"
                          : "bg-black/40 text-[var(--secondary)]"
                      }`}
                    >
                      {service.status === "connecting" || service.status === "syncing" ? (
                        <span style={{ animation: 'smoothSpin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                      ) : service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-xs text-[var(--secondary)]">{service.category}</p>
                    </div>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${
                    service.status === "connected" ? "bg-[var(--success)] animate-pulse" :
                    service.status === "connecting" || service.status === "syncing" ? "bg-[var(--warning)] animate-pulse" :
                    "bg-[var(--secondary)]"
                  }`}></span>
                </div>

                <p className="text-sm text-[var(--secondary)] mb-4">{service.description}</p>

                {service.status !== "disconnected" && (
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-[var(--secondary)]">Logs</p>
                      <p className="font-bold text-[var(--accent)]">{service.logsToday}</p>
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-[var(--secondary)]">Fixed</p>
                      <p className="font-bold text-[var(--success)]">{service.autoFixed}</p>
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs text-[var(--secondary)]">Sync</p>
                      <p className="font-bold text-[var(--accent)] text-xs">{service.lastSync}</p>
                    </div>
                  </div>
                )}

                {service.status === "disconnected" ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      connectService(service.name);
                    }}
                    className="w-full bg-[var(--accent)] text-black py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all"
                  >
                    Connect
                  </button>
                ) : service.status === "connected" ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        syncService(service.name);
                      }}
                      className="flex-1 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 py-2 rounded-lg font-medium hover:bg-[var(--accent)]/20 transition-all"
                    >
                      🔄 Sync
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        disconnectService(service.name);
                      }}
                      className="px-4 py-2 border border-[var(--error)] text-[var(--error)] rounded-lg hover:bg-[var(--error)]/10 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className="text-sm text-[var(--warning)]">
                      {service.status === "connecting" ? "Connecting..." : "Syncing..."}
                    </span>
                  </div>
                )}
              </HolographicCard>
            ))}
          </div>

          {displayServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🔌</p>
              <h3 className="text-2xl font-semibold mb-2">No services found</h3>
              <p className="text-[var(--secondary)]">Try adjusting your filters or add a new service</p>
            </div>
          )}
        </div>
      </main>

      {/* Service Detail Modal */}
      {activeService && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-8"
          onClick={() => setActiveService(null)}
        >
          <div 
            className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const isConnected = !!services[activeService];
              const service = services[activeService] || AVAILABLE_SERVICES.find(s => s.name === activeService);
              if (!service) return null;

              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                        isConnected ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "bg-black/40 text-[var(--secondary)]"
                      }`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{service.name}</h3>
                        <p className="text-sm text-[var(--secondary)]">{service.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${
                            isConnected ? "bg-[var(--success)] animate-pulse" : "bg-[var(--secondary)]"
                          }`}></span>
                          <span className={`text-xs capitalize ${isConnected ? "text-[var(--success)]" : "text-[var(--secondary)]"}`}>
                            {isConnected ? "Connected" : "Not Connected"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setActiveService(null)} className="text-[var(--secondary)] hover:text-[var(--accent)] text-2xl">
                      ×
                    </button>
                  </div>

                  <p className="text-[var(--secondary)] mb-6">{service.description}</p>

                  {isConnected ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-black/30 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-[var(--accent)]">{(service as ServiceState).logsToday}</p>
                          <p className="text-xs text-[var(--secondary)]">Today's Logs</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-[var(--success)]">{(service as ServiceState).autoFixed}</p>
                          <p className="text-xs text-[var(--secondary)]">Auto-Fixed</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-[var(--warning)]">98%</p>
                          <p className="text-xs text-[var(--secondary)]">Success Rate</p>
                        </div>
                      </div>

                      <div className="bg-black/20 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold mb-3">Recent Activity</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--success)]">✓</span>
                            <span>Analyzed build logs</span>
                            <span className="text-[var(--secondary)] ml-auto">2 min ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--success)]">✓</span>
                            <span>Fixed dependency conflict</span>
                            <span className="text-[var(--secondary)] ml-auto">15 min ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--accent)]">ℹ</span>
                            <span>Synced with {service.name}</span>
                            <span className="text-[var(--secondary)] ml-auto">{(service as ServiceState).lastSync}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            syncService(activeService);
                            setActiveService(null);
                          }}
                          className="flex-1 bg-[var(--accent)] text-black py-3 rounded-lg font-semibold"
                        >
                          🔄 Sync Now
                        </button>
                        <button 
                          onClick={() => {
                            disconnectService(activeService);
                            setActiveService(null);
                          }}
                          className="flex-1 border border-[var(--error)] text-[var(--error)] py-3 rounded-lg hover:bg-[var(--error)]/10"
                        >
                          Disconnect
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-black/20 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold mb-3">What you'll get:</h4>
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
                          connectService(activeService);
                          setActiveService(null);
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
        </div>
      )}
    </>
  );
}
