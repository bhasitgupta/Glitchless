"use client";

import { useState, useEffect } from "react";
import { useDevMode } from "@/context/DevModeContext";

type TabId = "console" | "network" | "state" | "perf";

export default function DevModePanel() {
  const { isDevMode, showPanel, togglePanel, logs, clearLogs, networkRequests, clearNetwork } = useDevMode();
  const [activeTab, setActiveTab] = useState<TabId>("console");
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState<string>("all");
  const [isMinimized, setIsMinimized] = useState(false);
  const [perfData, setPerfData] = useState({ memory: 0, fps: 0, loadTime: 0 });

  useEffect(() => {
    if (activeTab !== "perf") return;
    const interval = setInterval(() => {
      const mem = (performance as any).memory?.usedJSHeapSize
        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        : 0;
      setPerfData({
        memory: mem,
        fps: 0,
        loadTime: Math.round(performance.now()),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  if (!isDevMode) return null;

  if (!showPanel) {
    return (
      <button
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-[9998] group"
        title="Open Dev Panel (Ctrl+Shift+D)"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F2FF] to-[#00C8D4]
                         flex items-center justify-center
                         shadow-[0_0_20px_rgba(0,242,255,0.3)]
                         group-hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]
                         transition-all duration-300 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          {logs.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold
                           flex items-center justify-center text-white shadow-lg">
              {logs.length > 99 ? "99+" : logs.length}
            </span>
          )}
        </div>
      </button>
    );
  }

  const logTypeConfig: Record<string, { color: string; bg: string; border: string; icon: string }> = {
    info:   { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "i" },
    warn:   { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "!" },
    error:  { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: "x" },
    api:    { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: ">" },
    render: { color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "r" },
    state:  { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "s" },
  };

  const statusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400";
    if (status >= 300 && status < 400) return "text-blue-400";
    if (status >= 400 && status < 500) return "text-amber-400";
    return "text-red-400";
  };

  const durationColor = (ms: number) => {
    if (ms < 100) return "text-emerald-400";
    if (ms < 500) return "text-amber-400";
    return "text-red-400";
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = logFilter === "all" || log.type === logFilter;
    return matchesSearch && matchesFilter;
  });

  const errorCount = logs.filter(l => l.type === "error").length;
  const warnCount = logs.filter(l => l.type === "warn").length;

  const tabs: { id: TabId; label: string; icon: JSX.Element; badge?: number }[] = [
    { id: "console", label: "Console", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>, badge: errorCount || undefined },
    { id: "network", label: "Network", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { id: "state", label: "State", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/></svg> },
    { id: "perf", label: "Perf", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> },
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex flex-col
                    transition-all duration-300 ease-out
                    ${isMinimized ? "w-80 h-12" : "w-[520px]"}`}
         style={{ maxHeight: isMinimized ? "48px" : "75vh" }}>

      {/* Title Bar */}
      <div className="flex items-center gap-2 px-3 h-10 rounded-t-xl
                      bg-black/50 backdrop-blur-md border border-b-0 border-[rgba(0,242,255,0.2)]
                      select-none shrink-0">
        <div className="flex gap-1.5">
          <button onClick={() => { clearLogs(); clearNetwork(); }} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" title="Clear" />
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" title={isMinimized ? "Expand" : "Minimize"} />
          <button onClick={togglePanel} className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" title="Close" />
        </div>
        <span className="text-xs font-semibold text-[#00F2FF] tracking-wider ml-1">DEVTOOLS</span>
        <span className="text-[10px] text-[#555] ml-1">Glitchless</span>
        <div className="flex-1" />
        {errorCount > 0 && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            {errorCount} err
          </span>
        )}
        {warnCount > 0 && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {warnCount} warn
          </span>
        )}
        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      {!isMinimized && (
        <>
          {/* Tabs */}
          <div className="flex bg-black/40 backdrop-blur-sm border-x border-[rgba(0,242,255,0.15)] shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium
                           transition-all relative
                             ${activeTab === tab.id
                             ? "text-[#00F2FF] bg-black/60"
                             : "text-[#666] hover:text-[#999] hover:bg-black/30"}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-0.5 px-1 rounded text-[9px] font-bold bg-red-500/20 text-red-400">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00F2FF] rounded-t" />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar (Console & Network) */}
          {(activeTab === "console" || activeTab === "network") && (
            <div className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm border-x border-[rgba(0,242,255,0.15)] shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === "console" ? "Filter logs..." : "Filter requests..."}
                className="flex-1 bg-transparent text-xs text-white placeholder:text-[#444] outline-none"
              />
              {activeTab === "console" && (
                <div className="flex gap-1">
                  {["all", "error", "warn", "info", "api"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setLogFilter(filter)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all
                                ${logFilter === filter
                                  ? filter === "error" ? "bg-red-500/20 text-red-400"
                                    : filter === "warn" ? "bg-amber-500/20 text-amber-400"
                                    : filter === "info" ? "bg-blue-500/20 text-blue-400"
                                    : filter === "api" ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-[#00F2FF]/20 text-[#00F2FF]"
                                  : "text-[#444] hover:text-[#666]"}`}
                    >
                      {filter === "all" ? "ALL" : filter.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-black/60 backdrop-blur-md border-x border-[rgba(0,242,255,0.15)]
                          custom-scrollbar"
               style={{ minHeight: "200px", maxHeight: "calc(75vh - 140px)" }}>

            {/* Console Tab */}
            {activeTab === "console" && (
              filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#333]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                  <p className="mt-3 text-sm">{searchQuery || logFilter !== "all" ? "No matching logs" : "Console is empty"}</p>
                  <p className="text-xs mt-1 text-[#222]">Output will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-[rgba(0,242,255,0.1)]">
                  {filteredLogs.map((log) => {
                    const cfg = logTypeConfig[log.type] || logTypeConfig.info;
                    const isSelected = selectedLog === log.id;
                    return (
                      <div
                        key={log.id}
                        onClick={() => setSelectedLog(isSelected ? null : log.id)}
                        className={`px-3 py-2 cursor-pointer transition-colors
                                   ${isSelected ? "bg-[rgba(0,242,255,0.1)]" : "hover:bg-[rgba(255,255,255,0.03)]"}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`shrink-0 w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center mt-0.5 ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                            {cfg.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[10px] mb-0.5">
                              <span className={`font-semibold ${cfg.color}`}>{log.type.toUpperCase()}</span>
                              <span className="text-[#333]">
                                {log.timestamp.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                              </span>
                              {(log.count && log.count > 1) && (
                                <span className="px-1 rounded text-[9px] bg-black/50 text-[#888]">
                                  x{log.count}
                                </span>
                              )}
                            </div>
                            <p className={`text-xs leading-relaxed ${isSelected ? "text-white/90" : "text-white/70"} ${!isSelected ? "truncate" : ""}`}>
                              {log.message}
                            </p>
                            {log.data && isSelected && (
                              <pre className="mt-2 p-2 bg-black/40 rounded-md text-[10px] text-[#888] overflow-auto max-h-40 border border-[rgba(0,242,255,0.1)]">
                                {JSON.stringify(log.data, null, 2)}
                              </pre>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {/* Network Tab */}
            {activeTab === "network" && (
              networkRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#333]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <p className="mt-3 text-sm">No network requests</p>
                  <p className="text-xs mt-1 text-[#222]">Fetch calls will appear here</p>
                </div>
              ) : (
                <>
                  <div className="sticky top-0 grid grid-cols-[1fr_50px_50px_60px] gap-2 px-3 py-1.5 bg-black/30 text-[9px] font-semibold text-[#555] uppercase tracking-wider border-b border-[rgba(0,242,255,0.1)]">
                    <span>URL</span>
                    <span>Method</span>
                    <span>Status</span>
                    <span className="text-right">Time</span>
                  </div>
                  <div className="divide-y divide-[rgba(0,242,255,0.05)]">
                    {networkRequests
                      .filter(r => searchQuery === "" || r.url.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((req) => (
                      <div key={req.id} className="grid grid-cols-[1fr_50px_50px_60px] gap-2 px-3 py-2 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                        <span className="text-[11px] text-white/70 truncate font-mono">{req.url.replace(/^https?:\/\/[^/]+/, "")}</span>
                        <span className="text-[11px] text-blue-400 font-mono">{req.method}</span>
                        <span className={`text-[11px] font-mono font-semibold ${statusColor(req.status)}`}>
                          {req.status || "ERR"}
                        </span>
                        <span className={`text-[11px] font-mono text-right ${durationColor(req.duration)}`}>
                          {req.duration}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )
            )}

            {/* State Tab */}
            {activeTab === "state" && (
              <div className="p-4 space-y-3">
                <div className="rounded-lg bg-black/40 backdrop-blur-sm border border-[rgba(0,242,255,0.15)] overflow-hidden">
                  <div className="px-3 py-2 bg-black/50 border-b border-[rgba(0,242,255,0.1)]">
                    <span className="text-[10px] font-semibold text-[#00F2FF] uppercase tracking-wider">Dev Mode</span>
                  </div>
                  <div className="divide-y divide-[rgba(0,242,255,0.1)]">
                    {[
                      { label: "Status", value: "Active", color: "text-emerald-400" },
                      { label: "Panel", value: "Open", color: "text-emerald-400" },
                      { label: "Log Count", value: String(logs.length), color: "text-[#00F2FF]" },
                      { label: "Network Requests", value: String(networkRequests.length), color: "text-blue-400" },
                      { label: "Errors", value: String(errorCount), color: errorCount > 0 ? "text-red-400" : "text-[#555]" },
                      { label: "Warnings", value: String(warnCount), color: warnCount > 0 ? "text-amber-400" : "text-[#555]" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between px-3 py-2">
                        <span className="text-[11px] text-[#555]">{item.label}</span>
                        <span className={`text-[11px] font-mono font-semibold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-black/40 backdrop-blur-sm border border-[rgba(0,242,255,0.15)] overflow-hidden">
                  <div className="px-3 py-2 bg-black/50 border-b border-[rgba(0,242,255,0.1)]">
                    <span className="text-[10px] font-semibold text-[#00F2FF] uppercase tracking-wider">Log Breakdown</span>
                  </div>
                  <div className="p-3">
                    <div className="flex gap-1 h-4 rounded overflow-hidden bg-black/50">
                      {logs.length > 0 && Object.entries(
                        logs.reduce((acc, log) => ({ ...acc, [log.type]: (acc[log.type] || 0) + 1 }), {} as Record<string, number>)
                      ).map(([type, count]) => (
                        <div
                          key={type}
                          className={`transition-all ${logTypeConfig[type]?.bg || "bg-blue-500/20"}`}
                          style={{ width: `${(count / logs.length) * 100}%` }}
                          title={`${type}: ${count}`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(
                        logs.reduce((acc, log) => ({ ...acc, [log.type]: (acc[log.type] || 0) + 1 }), {} as Record<string, number>)
                      ).map(([type, count]) => {
                        const cfg = logTypeConfig[type] || logTypeConfig.info;
                        return (
                          <span key={type} className={`text-[9px] font-mono ${cfg.color}`}>
                            {type}: {count}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Perf Tab */}
            {activeTab === "perf" && (
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Memory", value: `${perfData.memory} MB`, icon: "M", color: "text-[#00F2FF]", border: "border-[#00F2FF]/20" },
                    { label: "Uptime", value: `${(perfData.loadTime / 1000).toFixed(1)}s`, icon: "T", color: "text-violet-400", border: "border-violet-500/20" },
                  ].map((card) => (
                    <div key={card.label} className={`p-3 rounded-lg bg-black/40 backdrop-blur-sm border ${card.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center bg-black/50 ${card.color}`}>
                          {card.icon}
                        </span>
                        <span className="text-[10px] text-[#555] uppercase tracking-wider">{card.label}</span>
                      </div>
                      <div className={`text-lg font-bold font-mono ${card.color}`}>{card.value}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-black/40 backdrop-blur-sm border border-[rgba(0,242,255,0.15)] overflow-hidden">
                  <div className="px-3 py-2 bg-black/50 border-b border-[rgba(0,242,255,0.1)]">
                    <span className="text-[10px] font-semibold text-[#00F2FF] uppercase tracking-wider">Timing</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {performance.getEntriesByType("navigation").map((entry: any, i: number) => (
                      <div key={i} className="space-y-1.5">
                        {[
                          { label: "DNS", value: entry.domainLookupEnd - entry.domainLookupStart, max: 100 },
                          { label: "TCP", value: entry.connectEnd - entry.connectStart, max: 200 },
                          { label: "TTFB", value: entry.responseStart - entry.requestStart, max: 500 },
                          { label: "Load", value: entry.loadEventEnd - entry.startTime, max: 3000 },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="flex justify-between text-[10px] mb-0.5">
                              <span className="text-[#555]">{metric.label}</span>
                              <span className="text-white/70 font-mono">{Math.round(metric.value)}ms</span>
                            </div>
                            <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#00F2FF] to-[#00C8D4] transition-all duration-500"
                                style={{ width: `${Math.min((metric.value / metric.max) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {performance.getEntriesByType("navigation").length === 0 && (
                      <p className="text-[10px] text-[#333] text-center py-2">Navigation data not available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-b-xl border border-t-0 border-[rgba(0,242,255,0.15)] shrink-0">
            <span className="text-[10px] text-[#333] font-mono">
              {activeTab === "console" && `${filteredLogs.length} log${filteredLogs.length !== 1 ? "s" : ""}`}
              {activeTab === "network" && `${networkRequests.length} request${networkRequests.length !== 1 ? "s" : ""}`}
              {activeTab === "state" && "State Inspector"}
              {activeTab === "perf" && "Performance Monitor"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#333]">Ctrl+Shift+D</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
