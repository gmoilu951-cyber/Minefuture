"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CopyIPWidget = ({ ip = "play.minefuture.fun" }) => {
  const [copied, setCopied] = useState(false);
  const [playerCount, setPlayerCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("https://api.mcsrvstat.us/3/play.minefuture.fun");
        const data = await res.json();
        if (data.online) {
          setPlayerCount(data.players.online);
        }
      } catch (err) {
        console.error("Failed to fetch player count for widget", err);
      }
    };
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={handleCopy}
        className={cn(
          "group relative flex items-center gap-4 bg-navy-dark/50 border-2 px-6 py-4 rounded-xl cursor-pointer transition-all duration-300",
          copied ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" : "border-primary-gold/20 hover:border-primary-gold/50"
        )}
      >
        <div className="flex flex-col">
          <span className="text-[10px] text-foreground/50 uppercase tracking-[0.2em]">Server Address</span>
          <span className="text-2xl font-mono font-bold text-white">{ip}</span>
        </div>

        <div className={cn(
          "w-12 h-12 flex items-center justify-center rounded-lg transition-colors",
          copied ? "bg-green-500 text-white" : "bg-primary-gold/10 text-primary-gold group-hover:bg-primary-gold group-hover:text-navy-default"
        )}>
          {copied ? <Check size={24} /> : <Copy size={24} />}
        </div>

        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg z-20"
          >
            IP Copied Successfully!
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={cn("w-2 h-2 rounded-full animate-pulse", playerCount !== null ? "bg-green-500" : "bg-foreground/20")}></span>
        <span className="text-xs text-foreground/70 uppercase tracking-widest font-oswald flex items-center gap-1">
          {playerCount !== null ? playerCount : "---"} Players Online
        </span>
      </div>
    </div>
  );
};

export default CopyIPWidget;
