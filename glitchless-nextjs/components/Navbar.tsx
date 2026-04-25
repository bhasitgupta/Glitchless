"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useDevMode } from "@/context/DevModeContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { isDevMode, toggleDevMode } = useDevMode();
  const { theme, toggleTheme } = useTheme();

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
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold no-underline">
          <span className="font-black text-4xl inline-block bg-gradient-to-br from-white via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:drop-shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all">
            G
          </span>
          <span className="font-bold text-2xl bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
            Glitchless
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">
            Home
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">
              Dashboard
            </Link>
          )}
          <Link href="/#features" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">
            Features
          </Link>
          <Link href="/#services" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">
            Services
          </Link>
          <Link href="/about" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">
            About Us
          </Link>
          <Link
            href="/#how-it-works"
            className="bg-gradient-to-br from-[var(--accent)] to-[#00C8D4] text-[var(--primary)] px-5 py-2 rounded-lg font-semibold shadow-[0_4px_15px_rgba(0,242,255,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,242,255,0.5)] hover:-translate-y-0.5 no-underline"
          >
            How It Works
          </Link>
          
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
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDevMode 
                ? "bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse" 
                : "text-[var(--secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
            }`}
            title="Toggle Dev Mode (Ctrl+Shift+D)"
          >
            🛠️
          </button>
          
          {isLoggedIn ? (
            <button 
              onClick={logout}
              className="border border-[var(--glass-border)] text-white px-6 py-3 rounded-lg font-semibold no-underline transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent cursor-pointer"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
