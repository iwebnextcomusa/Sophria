import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, HelpCircle, Loader2, PhoneCall } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sophria_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map timestamps back to Date objects
        const formatted = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(formatted);
      } catch (e) {
        console.error("Failed to parse saved chat history", e);
      }
    } else {
      // Default welcome messages
      const welcomeMessages: ChatMessage[] = [
        {
          id: "welcome-1",
          sender: "bot",
          text: "Hello! Welcome to Sophria Premium Flooring. I am your design & estimate assistant.",
          timestamp: new Date()
        },
        {
          id: "welcome-2",
          sender: "bot",
          text: "Are you planning a residential or commercial flooring project in Hamilton or the surrounding areas? I can answer questions about hardwood, LVP, tile, pricing, or book a Free In-Home Estimate for you!",
          timestamp: new Date()
        }
      ];
      setMessages(welcomeMessages);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("sophria_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      // Proxy through our secure backend Express API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-10).map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I apologize, I couldn't process that response.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "I apologize, but my server is temporarily offline. For immediate assistance with pricing, product selection, or free estimates, please call our estimators directly at (437) 605-4750 or email us at estimating@sophria.ca!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Submit immediately in next tick
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }, 10);
  };

  const clearChat = () => {
    if (confirm("Are you sure you want to clear our chat history?")) {
      const welcome: ChatMessage[] = [
        {
          id: `welcome-${Date.now()}`,
          sender: "bot",
          text: "Chat cleared! I'm ready for your flooring questions. Ask me about our White Oak solid hardwood, vinyl warranties, or service areas.",
          timestamp: new Date()
        }
      ];
      setMessages(welcome);
      localStorage.removeItem("sophria_chat_history");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Trigger Button */}
      <button
        id="chatbot-trigger"
        onClick={handleOpenToggle}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "bg-luxury-gold text-wood-dark font-bold hover:bg-gold-400"
        }`}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {hasNewMessage && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-wood-dark animate-pulse" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Collapsible Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[450px] max-h-[calc(100vh-220px)] rounded-3xl overflow-hidden glassmorphism shadow-2xl flex flex-col border border-luxury-gold/25"
          >
            {/* Header */}
            <div className="p-4 bg-wood-charcoal/90 border-b border-luxury-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-luxury-gold/15 flex items-center justify-center border border-luxury-gold/30">
                  <Bot className="w-5 h-5 text-luxury-gold animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    Sophria AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono">Flooring Estimator & Support</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-mono"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Messages Pane */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-wood-charcoal/40 scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                        isUser
                          ? "bg-luxury-gold/10 border-luxury-gold/30 text-luxury-gold"
                          : "bg-wood-dark border-luxury-gold/10 text-gray-300"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Balloon */}
                    <div
                      className={`max-w-[78%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        isUser
                          ? "bg-luxury-gold text-wood-dark font-medium shadow-md shadow-luxury-gold/5"
                          : "bg-wood-dark/85 text-gray-200 border border-luxury-gold/10"
                      }`}
                    >
                      {/* Formatted body text supporting line breaks */}
                      <p className="whitespace-pre-line">{msg.text}</p>
                      
                      {/* Timestamp */}
                      <span
                        className={`text-[9px] block mt-1.5 text-right font-mono ${
                          isUser ? "text-wood-dark/60" : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-wood-dark border border-luxury-gold/10 flex items-center justify-center text-gray-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-wood-dark/85 text-gray-400 border border-luxury-gold/10 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-luxury-gold" />
                    <span>Analyzing specifications...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions suggestion pills */}
            {messages.length < 5 && !isLoading && (
              <div className="p-2.5 bg-wood-dark/50 border-t border-luxury-gold/5 overflow-x-auto flex gap-1.5 scrollbar-none whitespace-nowrap">
                <button
                  onClick={() => handleQuickQuestion("How much is White Oak hardwood flooring per sqft?")}
                  className="px-2.5 py-1 text-[10px] bg-wood-charcoal hover:bg-luxury-gold/10 hover:text-luxury-gold text-gray-300 rounded-full border border-luxury-gold/10 transition-all font-display shrink-0"
                >
                  Hardwood Pricing
                </button>
                <button
                  onClick={() => handleQuickQuestion("Is LVP completely waterproof?")}
                  className="px-2.5 py-1 text-[10px] bg-wood-charcoal hover:bg-luxury-gold/10 hover:text-luxury-gold text-gray-300 rounded-full border border-luxury-gold/10 transition-all font-display shrink-0"
                >
                  LVP waterproof?
                </button>
                <button
                  onClick={() => handleQuickQuestion("Do you install flooring in Oakville and Ancaster?")}
                  className="px-2.5 py-1 text-[10px] bg-wood-charcoal hover:bg-luxury-gold/10 hover:text-luxury-gold text-gray-300 rounded-full border border-luxury-gold/10 transition-all font-display shrink-0"
                >
                  Service Areas
                </button>
              </div>
            )}

            {/* Form Input */}
            <form
              id="chat-form"
              onSubmit={handleSendMessage}
              className="p-3 bg-wood-charcoal/90 border-t border-luxury-gold/15 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sophria AI..."
                className="flex-1 bg-wood-dark/90 border border-luxury-gold/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold/60 font-sans"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() && !isLoading
                    ? "bg-luxury-gold text-wood-dark hover:bg-gold-400 cursor-pointer shadow-lg shadow-luxury-gold/10"
                    : "bg-wood-dark text-gray-600 border border-luxury-gold/5 cursor-not-allowed"
                }`}
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Support Info Footer */}
            <div className="p-2 bg-wood-dark/95 border-t border-luxury-gold/5 flex items-center justify-between px-4">
              <a
                href="tel:4376054750"
                className="flex items-center gap-1 text-[9px] text-luxury-gold hover:underline font-mono"
              >
                <PhoneCall className="w-2.5 h-2.5" />
                <span>Call (437) 605-4750</span>
              </a>
              <span className="text-[8px] text-gray-500 font-mono">
                Estimator Hours: Mon-Sat 8AM-6PM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
