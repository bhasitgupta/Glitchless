"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  read?: boolean;
}

interface QuickReply {
  text: string;
  action: string;
}

const botResponses: Record<string, string[]> = {
  greeting: [
    "Hi there! 👋 I'm the Glitchless assistant. How can I help you today?",
    "Hello! Welcome to Glitchless. What can I help you with?",
    "Hey! I'm here to assist you with Glitchless. What's on your mind?",
  ],
  features: [
    "Glitchless offers AI-powered log analysis, error detection, and one-click fixes. Would you like to know more about any specific feature?",
    "Our key features include: 🔍 Log Analysis, 🐛 Error Detection, 🚀 Performance Optimization, and 📊 Analytics. Which interests you?",
  ],
  pricing: [
    "We offer flexible pricing plans: Free for individuals, Pro for teams ($29/mo), and Enterprise for large organizations. Would you like details on any plan?",
  ],
  support: [
    "I can help with technical support! Common issues include: setup problems, log analysis errors, or integration questions. What are you experiencing?",
  ],
  default: [
    "That's a great question! Let me help you with that. Could you provide more details?",
    "I understand. Let me look into that for you. Is there anything specific you'd like to know?",
    "Thanks for reaching out! I'm here to help. Can you tell me more about what you need?",
  ],
};

const quickReplies: QuickReply[] = [
  { text: "Tell me about features", action: "features" },
  { text: "Pricing plans", action: "pricing" },
  { text: "Get support", action: "support" },
  { text: "How it works", action: "features" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("glitchless_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } else {
        // Initial greeting
        const greeting = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        setMessages([
          {
            id: Date.now().toString(),
            text: greeting,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (e) {
      console.error("Failed to load chat history", e);
      // Set initial greeting on error
      const greeting = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
      setMessages([
        {
          id: Date.now().toString(),
          text: greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("glitchless_chat_history", JSON.stringify(messages));
      } catch {
        // localStorage not available during navigation/SSR
      }
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when chat is open
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      setUnreadCount(0);
      setMessages((prev) =>
        prev.map((m) => (m.sender === "bot" ? { ...m, read: true } : m))
      );
    }
  }, [isOpen, unreadCount]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("feature") || lowerMessage.includes("what can you do")) {
      return botResponses.features[Math.floor(Math.random() * botResponses.features.length)];
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("error")) {
      return botResponses.support[Math.floor(Math.random() * botResponses.support.length)];
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate realistic typing delay
    const typingDelay = 1000 + Math.random() * 1500;
    
    setTimeout(() => {
      const botResponse = getBotResponse(messageToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        read: isOpen,
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
      
      // Show quick replies after bot response
      setTimeout(() => {
        setShowQuickReplies(true);
      }, 500);
    }, typingDelay);
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* Chat Window */}
      <div
        className={`absolute bottom-16 right-0 w-[380px] h-[520px] bg-black/90 backdrop-blur-xl border border-[rgba(0,242,255,0.3)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(0,242,255,0.1)] transition-all duration-300 ease-out overflow-hidden ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[rgba(0,242,255,0.15)] to-[rgba(0,242,255,0.05)] p-4 border-b border-[rgba(0,242,255,0.2)]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F2FF] to-[#0099CC] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#161b22]"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">Glitchless Assistant</h3>
              <p className="text-[#00F2FF] text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px] custom-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideInUp`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-transparent text-white rounded-br-md border border-[#00F2FF]/50 shadow-[0_4px_15px_rgba(0,242,255,0.2)]"
                    : "bg-[rgba(48,54,61,0.8)] text-gray-100 rounded-bl-md border border-[rgba(0,242,255,0.1)]"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <p
                    className={`text-xs ${
                      message.sender === "user" ? "text-[#00F2FF]" : "text-gray-400"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  {message.sender === "user" && (
                    <svg className="w-3 h-3 text-[#00F2FF]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-slideInUp">
              <div className="bg-[rgba(48,54,61,0.8)] rounded-2xl rounded-bl-md px-4 py-3 border border-[rgba(0,242,255,0.1)]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && !isTyping && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 bg-[rgba(0,242,255,0.1)] border border-[rgba(0,242,255,0.3)] rounded-full text-xs text-[#00F2FF] hover:bg-[rgba(0,242,255,0.2)] transition-all hover:scale-105"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-[rgba(0,242,255,0.2)] bg-black/50">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,242,255,0.2)] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FF] focus:shadow-[0_0_0_3px_rgba(0,242,255,0.1)] transition-all text-sm cursor-text"
              style={{ caretColor: '#00F2FF' }}
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-12 h-12 bg-gradient-to-br from-[#00F2FF] to-[#0099CC] rounded-xl flex items-center justify-center text-white hover:shadow-[0_4px_15px_rgba(0,242,255,0.4)] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#00F2FF] to-[#0099CC] flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,242,255,0.4)] hover:shadow-[0_8px_40px_rgba(0,242,255,0.6)] hover:scale-110 transition-all duration-300 relative ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Pulse Ring Animation */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-[#00F2FF] animate-ping opacity-20"></div>
      )}
    </div>
  );
}
