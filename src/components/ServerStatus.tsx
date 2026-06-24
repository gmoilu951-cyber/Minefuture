"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Users, Wifi, Clock, Activity, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface ServerData {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
  motd?: {
    clean: string[];
  };
  hostname?: string;
  debug?: {
    ping: number;
  };
}

const ServerStatus = () => {
  const [javaData, setJavaData] = useState<ServerData | null>(null);
  const [bedrockData, setBedrockData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(false);

      const [javaRes, bedrockRes] = await Promise.all([
        fetch("https://api.mcsrvstat.us/3/play.minefuture.fun"),
        fetch("https://api.mcsrvstat.us/bedrock/3/play.minefuture.fun")
      ]);

      const java = await javaRes.json();
      const bedrock = await bedrockRes.json();

      setJavaData(java);
      setBedrockData(bedrock);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch server status:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Auto refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const StatusPill = ({ online, label }: { online: boolean; label: string }) => (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
      online ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", online ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
      {label}: {online ? "Online" : "Offline"}
    </div>
  );

  if (!mounted) return (
    <div className="w-full max-w-4xl mx-auto h-96 flex items-center justify-center">
       <RefreshCw className="animate-spin text-primary-gold/20" size={32} />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-oswald text-white uppercase tracking-widest flex items-center gap-2">
          <Activity className="text-primary-gold" size={20} />
          Network Status
        </h3>
        <button
          onClick={fetchStatus}
          disabled={loading}
          className="text-foreground/40 hover:text-primary-gold transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-oswald"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "Updating..." : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Java Server Card */}
        <GlassCard className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Server size={80} />
          </div>

          <div className="flex flex-col h-full space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-2xl font-oswald text-white uppercase font-bold tracking-tight">Java Edition</h4>
                <p className="text-xs text-foreground/40 font-mono">play.minefuture.fun</p>
              </div>
              <StatusPill online={javaData?.online ?? false} label="JAVA" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <div className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users size={10} /> Players
                </div>
                <div className="text-xl font-oswald text-white">
                  {loading ? "..." : `${javaData?.players?.online ?? 0}/${javaData?.players?.max ?? 0}`}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <div className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Clock size={10} /> Latency
                </div>
                <div className="text-xl font-oswald text-white">
                  {loading ? "..." : `${javaData?.debug?.ping ?? 0}ms`}
                </div>
              </div>
            </div>

            <div className="bg-navy-dark/50 rounded-lg p-4 border border-white/5 flex-grow">
              <div className="text-[10px] text-primary-gold uppercase tracking-widest mb-2 font-bold">Message of the day</div>
              <p className="text-sm text-foreground/70 italic leading-relaxed">
                {javaData?.motd?.clean?.[0] || "MineFuture: Forge Your Future"}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
               <span className="text-[10px] text-foreground/30 uppercase tracking-widest">Version: {javaData?.version || "1.20.x"}</span>
               <div className="w-8 h-8 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-navy-default transition-all duration-300">
                  <ChevronRight size={18} />
               </div>
            </div>
          </div>
        </GlassCard>

        {/* Bedrock Server Card */}
        <GlassCard className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wifi size={80} />
          </div>

          <div className="flex flex-col h-full space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-2xl font-oswald text-white uppercase font-bold tracking-tight">Bedrock Edition</h4>
                <p className="text-xs text-foreground/40 font-mono">play.minefuture.fun : 19132</p>
              </div>
              <StatusPill online={bedrockData?.online ?? false} label="PE" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <div className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users size={10} /> Players
                </div>
                <div className="text-xl font-oswald text-white">
                  {loading ? "..." : `${bedrockData?.players?.online ?? 0}/${bedrockData?.players?.max ?? 0}`}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <div className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Activity size={10} /> Stability
                </div>
                <div className="text-xl font-oswald text-white uppercase">
                  {bedrockData?.online ? "High" : "---"}
                </div>
              </div>
            </div>

            <div className="bg-navy-dark/50 rounded-lg p-4 border border-white/5 flex-grow">
              <div className="text-[10px] text-primary-gold uppercase tracking-widest mb-2 font-bold">Connection Details</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground/40">IP Address</span>
                  <span className="text-white font-mono uppercase tracking-widest">play.minefuture.fun</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground/40">Port</span>
                  <span className="text-white font-mono">19132</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
               <span className="text-[10px] text-foreground/30 uppercase tracking-widest">Version: {bedrockData?.version || "Latest"}</span>
               <div className="w-8 h-8 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-navy-default transition-all duration-300">
                  <ChevronRight size={18} />
               </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex items-center justify-center gap-4 text-[10px] text-foreground/30 uppercase tracking-[0.3em]">
        <span>Last Updated: {lastUpdated.toLocaleTimeString()}</span>
        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
        <span>Refresh Cycle: 60s</span>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm"
        >
          <AlertCircle size={18} />
          Failed to connect to the status API. Displaying cached/fallback information.
        </motion.div>
      )}
    </div>
  );
};

export default ServerStatus;
