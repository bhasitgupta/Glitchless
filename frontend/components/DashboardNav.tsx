"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDevMode } from "@/context/DevModeContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

export default function DashboardNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isDevMode, toggleDevMode } = useDevMode();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/services", label: "Services" },
    { href: "/history", label: "History" },
    { href: "/settings", label: "Settings" },
    { href: "/about", label: "About Us" },
  ];

  // Keyboard shortcut: Ctrl+Shift+D to toggle dev mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        toggleDevMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDevMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-[8px] border-b border-[rgba(255,255,255,0.05)] z-[1000] py-4">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-bold no-underline">
          <Image src="/logo.png" width={32} height={32} alt="Glitchless Logo" className="drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:drop-shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all" />
          <span className="font-bold text-2xl bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
            Glitchless
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline transition-colors ${
                pathname === link.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--secondary)] hover:text-[var(--accent)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300 text-[var(--secondary)] hover:text-[var(--accent)] hover:bg-[var(--glass-bg)]"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Dev Mode Toggle */}
          <button
            onClick={toggleDevMode}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              isDevMode
                ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30"
                : "text-[var(--secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-transparent"
            }`}
            title="Toggle Dev Mode (Ctrl+Shift+D)"
          >
            <span>🛠️</span>
            <span className="text-sm font-medium">Dev Mode</span>
          </button>

          <button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            className="border border-[var(--glass-border)] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
