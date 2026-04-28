import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B0E14",
        accent: "#00F2FF",
        secondary: "#94A3B8",
        error: "#FF4C4C",
        warning: "#F59E0B",
        success: "#10B981",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        "bg-glass": "rgba(0, 0, 0, 0.5)",
        "card-bg": "rgba(255, 255, 255, 0.05)",
        "input-bg": "rgba(0, 0, 0, 0.3)",
        "border-color": "rgba(255, 255, 255, 0.1)",
        "nav-bg": "rgba(11, 14, 20, 0.9)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "gradient-bg": "gradientBG 15s ease infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        scan: "scan 3s ease-in-out infinite",
        spin: "spin 1.5s linear infinite",
        pulse: "pulse 2s infinite",
        bounce: "bounce 2s ease-in-out infinite",
        rotate: "rotate 10s linear infinite",
        "bounce-dot": "bounceDot 1s ease-in-out infinite",
        "pulse-line": "pulseLine 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
