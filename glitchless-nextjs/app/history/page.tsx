"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

export default function HistoryPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  const historyItems = [
    { id: 1, title: "react-app deployment", date: "Today, 2:30 PM", status: "Fixed", statusType: "success", desc: "Resolved dependency conflicts in package.json", issues: 3, fixes: 2 },
    { id: 2, title: "api-server logs", date: "Yesterday, 4:15 PM", status: "Fixed", statusType: "success", desc: "Fixed database connection timeout issue", issues: 1, fixes: 1 },
    { id: 3, title: "frontend build error", date: "2 days ago", status: "Review", statusType: "warning", desc: "TypeScript compilation errors detected", issues: 5, fixes: 0 },
  ];

  return (
    <>
      <DashboardNav />
      <main className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto p-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Analysis History</h1>
            <p className="text-[var(--secondary)] text-lg">View your past log analyses and their results</p>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-[var(--accent)]">Recent Analyses</h2>
              <button
                onClick={() => { if (confirm("Are you sure you want to clear all history?")) alert("History cleared successfully"); }}
                className="border border-[var(--glass-border)] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer bg-transparent transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Clear History
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {historyItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-xl p-6 transition-all relative overflow-hidden hover:translate-x-1 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(0,242,255,0.15)] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transition: `all 0.5s ease ${i * 0.1}s` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">📊</span>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[var(--secondary)] text-sm">{item.date}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        item.statusType === "success"
                          ? "bg-[rgba(16,185,129,0.2)] text-[var(--success)] border border-[var(--success)]"
                          : "bg-[rgba(245,158,11,0.2)] text-[var(--warning)] border border-[var(--warning)]"
                      }`}>
                        {item.statusType === "success" ? "✓" : "⚠"} {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="text-[var(--secondary)] mb-4">{item.desc}</p>
                    <div className="flex gap-8 mb-4">
                      <span className="text-[var(--secondary)] text-sm">• {item.issues} issues found</span>
                      <span className="text-[var(--secondary)] text-sm">• {item.fixes} fixes applied</span>
                    </div>
                    <Link href={`/analysis?id=${item.id}`} className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-5 py-2 rounded-md text-sm font-medium no-underline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
