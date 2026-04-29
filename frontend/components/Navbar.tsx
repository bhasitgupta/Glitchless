"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useDevMode } from "@/context/DevModeContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { isDevMode, toggleDevMode } = useDevMode();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-[8px] border-b border-[rgba(255,255,255,0.05)] z-[1000] py-2">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src="/logo.png"
            alt="Glitchless Logo"
            width={32}
            height={32}
            className="drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:drop-shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all"
          />
          <span className="font-bold text-lg bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
            Glitchless
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
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


          {/* Dev Mode Toggle */}
          <button
            onClick={toggleDevMode}
            className={`p-2 rounded-lg transition-all duration-300 ${isDevMode
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

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDevMode}
            className={`p-2 rounded-lg transition-all duration-300 ${isDevMode
                ? "bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse"
                : "text-[var(--secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
              }`}
            title="Toggle Dev Mode"
          >
            🛠️
          </button>
          <button 
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)] overflow-hidden"
          >
            <div className="flex flex-col px-8 py-6 gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--secondary)] no-underline text-lg hover:text-[var(--accent)]">
                Home
              </Link>
              {isLoggedIn && (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--secondary)] no-underline text-lg hover:text-[var(--accent)]">
                  Dashboard
                </Link>
              )}
              <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--secondary)] no-underline text-lg hover:text-[var(--accent)]">
                Features
              </Link>
              <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--secondary)] no-underline text-lg hover:text-[var(--accent)]">
                Services
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--secondary)] no-underline text-lg hover:text-[var(--accent)]">
                About Us
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-br from-[var(--accent)] to-[#00C8D4] text-[var(--primary)] px-5 py-3 rounded-lg font-semibold text-center mt-2 no-underline"
              >
                How It Works
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="border border-[var(--glass-border)] text-white px-6 py-3 rounded-lg font-semibold mt-2 no-underline hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent cursor-pointer"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
