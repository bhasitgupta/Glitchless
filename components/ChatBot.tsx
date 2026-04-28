"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  animKey?: number; // triggers slide-in
}

const suggestions = [
  { icon: "🔍", text: "Analyze my deployment logs" },
  { icon: "💡", text: "What can Glitchless do?" },
  { icon: "💰", text: "View pricing plans" },
  { icon: "🛠️", text: "Get technical support" },
];

const botResponses: Record<string, string> = {
  features:
    "Glitchless uses AI to analyze deployment logs, pinpoint root causes, and generate exact fix commands. Supports Vercel, Netlify, GitHub Actions, Jenkins, and more.",
  pricing:
    "**Free** — 50 analyses/month\n**Pro ($19/mo)** — unlimited analyses + priority\n**Team ($49/mo)** — collab, webhooks, CI/CD",
  support:
    "Paste your error logs here and I'll analyze them. For billing: support@glitchless.dev",
  default:
    "Paste your deployment logs and I'll identify root cause with exact fix steps.",
};

function getBotResponse(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes("feature") || l.includes("what can")) return botResponses.features;
  if (l.includes("pric") || l.includes("cost") || l.includes("plan")) return botResponses.pricing;
  if (l.includes("support") || l.includes("help")) return botResponses.support;
  return botResponses.default;
}

function renderText(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code key={i} className="bg-[rgba(0,242,255,0.12)] text-[#00F2FF] px-1 py-0.5 rounded text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    return <span key={i}>{part}</span>;
  });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  // typewriter
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [streamText, setStreamText] = useState("");
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startTypewriter = useCallback((id: string, fullText: string) => {
    setStreamingId(id);
    setStreamText("");
    let i = 0;
    if (streamRef.current) clearInterval(streamRef.current);
    streamRef.current = setInterval(() => {
      i += Math.ceil(fullText.length / 120); // speed: finish in ~120 ticks
      if (i >= fullText.length) {
        setStreamText(fullText);
        setStreamingId(null);
        clearInterval(streamRef.current!);
      } else {
        setStreamText(fullText.slice(0, i));
      }
    }, 16);
  }, []);

  // cleanup on unmount
  useEffect(() => () => { if (streamRef.current) clearInterval(streamRef.current); }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? inputValue).trim();
    if (!msg) return;

    const animKey0 = Date.now();
    const userMsg: Message = { id: animKey0.toString(), text: msg, sender: "user", timestamp: new Date(), animKey: animKey0 };

    setMessages((p) => [...p, userMsg]);
    setInputValue("");
    // reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8001/api/analyze-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_logs: msg }),
      });

      let botText = "";
      if (!res.ok) {
        botText = getBotResponse(msg);
      } else {
        const data = await res.json();
        botText = `**${data.insight_stream.title}**\n\n${data.insight_stream.plain_english}\n\n**Fix steps:**\n${data.auto_fix.steps
          .map((s: any) => `• ${s.action_title}${s.command ? `\n  \`${s.command}\`` : ""}`)
          .join("\n")}`;
      }

      const animKey = Date.now();
      const newMsg: Message = { id: (animKey + 1).toString(), text: botText, sender: "bot", timestamp: new Date(), animKey };
      setMessages((p) => [...p, newMsg]);
      startTypewriter(newMsg.id, botText);
      if (!isOpen) setUnread((c) => c + 1);

    } catch {
      const animKey2 = Date.now();
      const fallbackMsg: Message = { id: (animKey2 + 1).toString(), text: getBotResponse(msg), sender: "bot", timestamp: new Date(), animKey: animKey2 };
      setMessages((p) => [...p, fallbackMsg]);
      startTypewriter(fallbackMsg.id, fallbackMsg.text);
      if (!isOpen) setUnread((c) => c + 1);

    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = (ev.target?.result as string)?.slice(0, 5000);
      if (content) sendMessage(`[Log file: ${file.name}]\n\n${content}`);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 pointer-events-none">
      {/* ── CHAT PANEL ── */}
      <div
        style={{
          width: 420,
          height: 600,
          background: "linear-gradient(145deg,#0f1117,#12151e)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,242,255,0.06), 0 0 40px rgba(0,242,255,0.05)",
          transformOrigin: "bottom right",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.85) translateY(24px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#00F2FF,#0080aa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(0,242,255,0.35)",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>Glitchless AI</p>
            <p style={{ color: "#00F2FF", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Online
            </p>
          </div>

          <button
            onClick={() => setMessages([])}
            title="New chat"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4, borderRadius: 8, transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4, borderRadius: 8, transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages / Welcome */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
          {messages.length === 0 ? (
            /* Welcome */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#00F2FF,#0080aa)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 32px rgba(0,242,255,0.3)",
                }}
              >
                <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>How can I help?</p>
                <p style={{ color: "#6b7280", fontSize: 12 }}>Paste logs or ask about Glitchless</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className={`card-anim-${i}`}
                    onClick={() => sendMessage(s.text)}

                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "12px 10px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,242,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(0,242,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
                    <p style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.4 }}>{s.text}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message list */
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((m) => (
                <div key={m.id} className="msg-anim" style={{ display: "flex", gap: 10, flexDirection: m.sender === "user" ? "row-reverse" : "row" }}>

                  {/* Avatar */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 2,
                      background:
                        m.sender === "bot"
                          ? "linear-gradient(135deg,#00F2FF,#0080aa)"
                          : "linear-gradient(135deg,#8b5cf6,#4f46e5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: m.sender === "bot" ? "0 0 10px rgba(0,242,255,0.25)" : "none",
                    }}
                  >
                    {m.sender === "bot" ? (
                      <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>U</span>
                    )}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: m.sender === "user" ? "flex-end" : "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "88%",
                        background: m.sender === "user" ? "rgba(255,255,255,0.06)" : "transparent",
                        border: m.sender === "user" ? "1px solid rgba(255,255,255,0.1)" : "none",
                        borderRadius: m.sender === "user" ? "16px 4px 16px 16px" : 0,
                        padding: m.sender === "user" ? "10px 14px" : "2px 0",
                      }}
                    >
                      <p style={{ color: "#e5e7eb", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", margin: 0 }}
                         className={m.sender === "bot" && m.id === streamingId ? "typing-cursor" : ""}
                      >
                        {(m.sender === "bot" && m.id === streamingId ? streamText : m.text)
                          .split("\n").map((line, i, arr) => (
                          <span key={i}>
                            {renderText(line)}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>

                    </div>
                    <p style={{ color: "#374151", fontSize: 10, marginTop: 3 }}>{fmt(m.timestamp)}</p>
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {isTyping && (
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#00F2FF,#0080aa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 0" }}>
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#00F2FF",
                          opacity: 0.6,
                          animation: "bounce 1s infinite",
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ padding: "10px 12px 14px", flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "10px 12px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocusCapture={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0,242,255,0.4)";
              el.style.boxShadow = "0 0 0 3px rgba(0,242,255,0.07)";
            }}
            onBlurCapture={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.boxShadow = "none";
            }}
          >
            <input type="file" ref={fileInputRef} onChange={handleFile} accept=".txt,.log,.json" style={{ display: "none" }} />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach log file"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: "2px", flexShrink: 0, transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00F2FF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Glitchless or paste logs…"
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#e5e7eb",
                fontSize: 13,
                resize: "none",
                maxHeight: 120,
                overflowY: "auto",
                lineHeight: 1.5,
                caretColor: "#00F2FF",
                fontFamily: "inherit",
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isTyping}
              style={{
                flexShrink: 0,
                width: 30,
                height: 30,
                borderRadius: 10,
                border: "none",
                cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                background: inputValue.trim() && !isTyping ? "linear-gradient(135deg,#00F2FF,#0080aa)" : "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: inputValue.trim() && !isTyping ? "0 0 12px rgba(0,242,255,0.35)" : "none",
                opacity: inputValue.trim() && !isTyping ? 1 : 0.35,
              }}
            >
              <svg width="14" height="14" fill="none" stroke={inputValue.trim() && !isTyping ? "#000" : "#9ca3af"} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p style={{ color: "#374151", fontSize: 10, textAlign: "center", marginTop: 6 }}>
            Glitchless AI · Verify critical commands before running
          </p>
        </div>
      </div>

      {/* ── FAB BUTTON ── */}
      <button
        className={!isOpen ? "fab-shimmer" : ""}
        onClick={() => setIsOpen((o) => !o)}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: isOpen
            ? "rgba(255,255,255,0.08)"
            : "linear-gradient(135deg,#00F2FF,#0080aa)",
          border: isOpen ? "1px solid rgba(255,255,255,0.15)" : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen ? "none" : "0 8px 28px rgba(0,242,255,0.45)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: isOpen ? "scale(0.92)" : "scale(1)",
          position: "relative",
          flexShrink: 0,
          pointerEvents: "auto",
        }}
      >
        {unread > 0 && !isOpen && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unread}
          </span>
        )}

        {/* Toggle icon */}
        <svg
          width="22"
          height="22"
          fill="none"
          stroke={isOpen ? "#9ca3af" : "#000"}
          viewBox="0 0 24 24"
          style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          )}
        </svg>
      </button>

      {/* Pulse ring when closed */}
      {!isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#00F2FF",
            animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0%   { box-shadow: 0 8px 28px rgba(0,242,255,0.45); }
          50%  { box-shadow: 0 8px 40px rgba(0,242,255,0.75), 0 0 0 6px rgba(0,242,255,0.12); }
          100% { box-shadow: 0 8px 28px rgba(0,242,255,0.45); }
        }
        @keyframes cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .msg-anim { animation: slideUp 0.32s cubic-bezier(0.34,1.4,0.64,1) both; }
        .fab-shimmer { animation: shimmer 2.5s ease-in-out infinite; }
        .card-anim-0 { animation: cardIn 0.4s 0.05s cubic-bezier(0.34,1.3,0.64,1) both; }
        .card-anim-1 { animation: cardIn 0.4s 0.12s cubic-bezier(0.34,1.3,0.64,1) both; }
        .card-anim-2 { animation: cardIn 0.4s 0.19s cubic-bezier(0.34,1.3,0.64,1) both; }
        .card-anim-3 { animation: cardIn 0.4s 0.26s cubic-bezier(0.34,1.3,0.64,1) both; }
        .typing-cursor::after {
          content: '|';
          display: inline-block;
          color: #00F2FF;
          animation: cursor 0.7s step-end infinite;
          margin-left: 1px;
          font-weight: 300;
        }
      `}} />

    </div>
  );
}
