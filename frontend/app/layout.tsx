import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DevModeProvider } from "@/context/DevModeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import DevModePanel from "@/components/DevModePanel";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Glitchless - Turn Chaotic Logs into Clear Success",
  description:
    "AI-powered log analysis that turns deployment nightmares into one-click resolutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <DevModeProvider>
            <AnimatedBackground />
            <AuthProvider>
              {children}
              <ChatBot />
              <DevModePanel />
            </AuthProvider>
          </DevModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
