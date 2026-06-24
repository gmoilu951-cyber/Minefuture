"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Send, Bot, ExternalLink, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isEscalation?: boolean;
}

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const SUGGESTED_QUESTIONS = [
  "How do I join the server?",
  "How do I buy a rank?",
  "What payment methods are supported?",
  "How do I link my account?",
  "What does Olympian Rank include?",
  "How do I use MINE20?"
];

const KNOWLEDGE_BASE = [
  {
    keywords: ["ip", "join", "address", "server", "connect"],
    answer: "You can join MineFuture at **play.minefuture.fun**!\n\n- **Java Port**: 25565\n- **Bedrock Port**: 19132\n- **Version**: 1.20.x+"
  },
  {
    keywords: ["rank", "prices", "vip", "champion", "titan", "olympian"],
    answer: "Our Rank Prices are:\n- **VIP**: $5.00\n- **Champion**: $15.00\n- **Titan**: $35.00\n- **Olympian**: $75.00\n\nAll ranks are permanent and provide unique perks like flight, prefix, and special commands!"
  },
  {
    keywords: ["olympian", "perks", "highest"],
    answer: "The **Olympian Rank ($75)** is our top-tier rank. It includes:\n- Exclusive [OLYMPIAN] Prefix\n- All Champion & Titan perks\n- /fly in lobbies\n- Access to monthly rewards\n- 10x Crate Keys on purchase!"
  },
  {
    keywords: ["crate", "key", "price", "mythic", "epic", "rare"],
    answer: "Crate Key Prices:\n- **Vote Key**: Free (via /vote)\n- **Rare Key**: $2.00\n- **Epic Key**: $5.00\n- **Mythic Key**: $10.00\n\nKeys are delivered instantly!"
  },
  {
    keywords: ["buy", "purchase", "store", "shop", "checkout"],
    answer: "To buy something:\n1. Visit the **Store** page.\n2. Add items to your cart.\n3. Enter your **Minecraft IGN**.\n4. Pay via your preferred method.\n5. Items deliver within 5 minutes!"
  },
  {
    keywords: ["payment", "pay", "paypal", "stripe", "upi", "bkash", "nagad", "easypaisa", "methods"],
    answer: "Supported Payment Methods:\n- **International**: PayPal, Stripe (Cards)\n- **India**: UPI (GPay, PhonePe, Paytm)\n- **Bangladesh**: bKash, Nagad, Rocket\n- **Pakistan**: EasyPaisa, JazzCash"
  },
  {
    keywords: ["coupon", "discount", "code", "mine20", "welcome10", "festival25"],
    answer: "Active Coupon Codes:\n- **MINE20**: 20% OFF (First Purchase)\n- **WELCOME10**: 10% OFF\n- **FESTIVAL25**: 25% OFF (Limited Time)"
  },
  {
    keywords: ["rules", "ban", "appeal", "punishment", "toxic"],
    answer: "We follow strict rules to ensure a fun environment. No hacking, griefing, or toxicity. Check **/rules** for details. To appeal a ban, join our Discord."
  },
  {
    keywords: ["discord", "community", "link", "join"],
    answer: "Join our official Discord community: **https://discord.gg/jTb3WYtXJz**\n\nGet news, updates, and support!"
  },
  {
    keywords: ["link", "account", "sync", "ign"],
    answer: "To link your account, go to the **Dashboard** and enter your IGN. This allows you to view stats and manage your purchases!"
  },
  {
    keywords: ["lifesteal", "features", "smp"],
    answer: "MineFuture is a **Lifesteal SMP**. When you kill a player, you gain a heart. If you lose all hearts, you are temporarily eliminated!"
  }
];

const AIChatWindow = ({ isOpen, onClose, onMinimize }: AIChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hi! I'm your MineFuture Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        isEscalation: response.includes("Discord") || response.includes("ticket")
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getAIResponse = (text: string): string => {
    const lowercaseText = text.toLowerCase();
    const matches = KNOWLEDGE_BASE.map(item => ({
      ...item,
      score: item.keywords.filter(kw => lowercaseText.includes(kw)).length
    })).filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (matches.length > 0) return matches[0].answer;
    return "I'm not completely sure about that.\n\nPlease join our Discord server and create a support ticket for assistance.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0F172A]",
            "md:inset-auto md:right-8 md:bottom-24 md:w-[420px] md:h-[650px] md:max-h-[85vh] md:rounded-2xl md:border md:border-white/10 md:shadow-2xl md:glass-card"
          )}
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-gradient-to-r from-primary-gold/20 to-primary-orange/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-gold/20 flex items-center justify-center border border-primary-gold/30">
                <Bot className="text-primary-gold" size={22} />
              </div>
              <div>
                <h3 className="text-white font-oswald uppercase tracking-wider text-sm font-bold">MineFuture AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Always Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onMinimize} className="hidden md:block p-2 text-foreground/40 hover:text-white transition-colors">
                <Minus size={20} />
              </button>
              <button onClick={onClose} className="p-2 text-foreground/40 hover:text-red-500 transition-colors">
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5 scrollbar-hide bg-navy-default/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[90%]",
                  msg.role === "user" ? "ml-auto items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm",
                    msg.role === "user"
                      ? "bg-primary-gold text-navy-default font-bold rounded-tr-none"
                      : "bg-white/5 text-foreground/90 border border-white/10 rounded-tl-none"
                  )}
                >
                  {msg.content}

                  {msg.isEscalation && (
                    <div className="mt-5 grid grid-cols-1 gap-2">
                      <a
                        href="https://discord.gg/jTb3WYtXJz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white py-2.5 px-4 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider"
                      >
                        <ExternalLink size={14} />
                        Join Discord
                      </a>
                      <button
                        onClick={() => window.open('https://discord.gg/jTb3WYtXJz', '_blank')}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider border border-white/5"
                      >
                        <Ticket size={14} />
                        Create Support Ticket
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-foreground/30 uppercase mt-1.5 font-bold tracking-tighter">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1.5">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5 bg-black/20">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-foreground/60 hover:text-primary-gold hover:border-primary-gold/40 hover:bg-primary-gold/10 transition-all uppercase tracking-wider font-bold"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-5 bg-navy-dark border-t border-white/10 flex gap-2 pb-safe"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-gold/50 transition-all text-white placeholder:text-white/20 shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 rounded-xl bg-primary-gold text-navy-default flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg glow-gold"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatWindow;
