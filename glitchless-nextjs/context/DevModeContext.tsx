"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type LogType = "info" | "warn" | "error" | "api" | "render" | "state";

interface LogEntry {
  id: string;
  timestamp: Date;
  type: LogType;
  message: string;
  data?: any;
  count?: number;
}

interface NetworkEntry {
  id: string;
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: Date;
  size?: number;
}

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  logs: LogEntry[];
  addLog: (type: LogType, message: string, data?: any) => void;
  clearLogs: () => void;
  showPanel: boolean;
  togglePanel: () => void;
  networkRequests: NetworkEntry[];
  clearNetwork: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [isDevMode, setIsDevMode] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("glitchless_devmode");
      if (stored) {
        setIsDevMode(JSON.parse(stored));
      }
    } catch {
      // localStorage not available during SSR or navigation
    }
  }, []);

  const addLog = useCallback((type: LogType, message: string, data?: any) => {
    setLogs(prev => {
      const existing = prev.find(l => l.type === type && l.message === message);
      if (existing) {
        return prev.map(l => l.id === existing.id ? { ...l, count: (l.count || 1) + 1, timestamp: new Date() } : l);
      }
      return [{
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type,
        message,
        data,
        count: 1
      }, ...prev].slice(0, 200);
    });
  }, []);

  const toggleDevMode = () => {
    const newValue = !isDevMode;
    setIsDevMode(newValue);
    try {
      localStorage.setItem("glitchless_devmode", JSON.stringify(newValue));
    } catch {
      // localStorage not available
    }
    if (newValue) {
      setShowPanel(true);
      addLog("info", "Developer mode enabled", { shortcut: "Ctrl+Shift+D" });
    } else {
      setShowPanel(false);
    }
  };

  const togglePanel = () => {
    setShowPanel(prev => !prev);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearNetwork = () => {
    setNetworkRequests([]);
  };

  // Intercept console methods
  useEffect(() => {
    if (!isDevMode) return;

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      addLog("info", args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
      originalLog.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      addLog("warn", args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
      originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      addLog("error", args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
      originalError.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [isDevMode, addLog]);

  // Intercept fetch for network tracking
  useEffect(() => {
    if (!isDevMode) return;

    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : (input as Request)?.url || "unknown";
      const method = init?.method || "GET";
      const startTime = performance.now();

      try {
        const response = await originalFetch.call(window, input, init);
        const duration = Math.round(performance.now() - startTime);
        const entry: NetworkEntry = {
          id: Math.random().toString(36).substr(2, 9),
          url,
          method: method.toUpperCase(),
          status: response.status,
          duration,
          timestamp: new Date(),
        };
        setNetworkRequests(prev => [entry, ...prev].slice(0, 100));
        return response;
      } catch (error: any) {
        const duration = Math.round(performance.now() - startTime);
        const entry: NetworkEntry = {
          id: Math.random().toString(36).substr(2, 9),
          url,
          method: method.toUpperCase(),
          status: 0,
          duration,
          timestamp: new Date(),
        };
        setNetworkRequests(prev => [entry, ...prev].slice(0, 100));
        addLog("error", `Fetch failed: ${url}`, { error: error.message });
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isDevMode, addLog]);

  return (
    <DevModeContext.Provider value={{
      isDevMode,
      toggleDevMode,
      logs,
      addLog,
      clearLogs,
      showPanel,
      togglePanel,
      networkRequests,
      clearNetwork,
    }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const context = useContext(DevModeContext);
  // Return safe defaults instead of throwing - prevents navigation crashes
  if (context === undefined) {
    return {
      isDevMode: false,
      toggleDevMode: () => {},
      logs: [],
      addLog: () => {},
      clearLogs: () => {},
      showPanel: false,
      togglePanel: () => {},
      networkRequests: [],
      clearNetwork: () => {},
    };
  }
  return context;
}
