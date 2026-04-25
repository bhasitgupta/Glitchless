"use client";

import DashboardNav from "@/components/DashboardNav";

export default function SettingsPage() {
  return (
    <>
      <DashboardNav />
      <main className="min-h-screen pt-20">
        <div className="max-w-[1200px] mx-auto p-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-[var(--secondary)] text-lg">Configure your Glitchless preferences</p>
          </div>

          <div className="max-w-[800px] space-y-8">
            {/* General */}
            <div className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-[var(--accent)]">General</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <div>
                    <h3 className="font-medium mb-1">Default Analysis Mode</h3>
                    <p className="text-[var(--secondary)] text-sm">Choose how logs are analyzed by default</p>
                  </div>
                  <select className="px-4 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-white text-sm cursor-pointer">
                    <option value="auto">Auto-detect</option>
                    <option value="detailed">Detailed Analysis</option>
                    <option value="quick">Quick Scan</option>
                  </select>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <div>
                    <h3 className="font-medium mb-1">Auto-apply Fixes</h3>
                    <p className="text-[var(--secondary)] text-sm">Automatically apply suggested fixes when possible</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] cursor-pointer">
                    <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                    <span className="absolute inset-0 bg-[var(--accent)] rounded-full transition-colors before:content-[''] before:absolute before:top-[3px] before:left-[3px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform before:translate-x-[24px]" />
                  </label>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <h3 className="font-medium mb-1">Plain English Mode</h3>
                    <p className="text-[var(--secondary)] text-sm">Display technical issues in plain language</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] cursor-pointer">
                    <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                    <span className="absolute inset-0 bg-[var(--accent)] rounded-full transition-colors before:content-[''] before:absolute before:top-[3px] before:left-[3px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform before:translate-x-[24px]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-[var(--accent)]">Notifications</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <div>
                    <h3 className="font-medium mb-1">Email Notifications</h3>
                    <p className="text-[var(--secondary)] text-sm">Receive email alerts for critical issues</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] cursor-pointer">
                    <input type="checkbox" className="opacity-0 w-0 h-0" />
                    <span className="absolute inset-0 bg-[var(--border-color)] rounded-full transition-colors before:content-[''] before:absolute before:top-[3px] before:left-[3px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform" />
                  </label>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <h3 className="font-medium mb-1">Desktop Notifications</h3>
                    <p className="text-[var(--secondary)] text-sm">Show desktop notifications for analysis completion</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] cursor-pointer">
                    <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                    <span className="absolute inset-0 bg-[var(--accent)] rounded-full transition-colors before:content-[''] before:absolute before:top-[3px] before:left-[3px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform before:translate-x-[24px]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Integration */}
            <div className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-[var(--accent)]">Integration</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)]">
                  <div>
                    <h3 className="font-medium mb-1">GitHub Integration</h3>
                    <p className="text-[var(--secondary)] text-sm">Connect your GitHub account for seamless integration</p>
                  </div>
                  <button className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer border-none">
                    Connect
                  </button>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <h3 className="font-medium mb-1">CI/CD Pipeline</h3>
                    <p className="text-[var(--secondary)] text-sm">Add Glitchless to your CI/CD workflow</p>
                  </div>
                  <button className="border border-[var(--glass-border)] text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer bg-transparent">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => alert("Settings saved successfully!")}
                className="bg-gradient-to-br from-[var(--accent)] to-[#0052A3] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer border-none transition-all hover:shadow-[0_4px_15px_rgba(0,102,204,0.3)]"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
