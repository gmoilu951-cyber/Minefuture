"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disc as Discord, MessageSquare, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("https://api.mcsrvstat.us/3/play.minefuture.fun");
        const data = await res.json();
        if (data.online) {
          setPlayerCount(data.players.online);
          setOnline(true);
        } else {
          setOnline(false);
        }
      } catch (err) {
        console.error("Footer: Failed to fetch status", err);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-navy-dark border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Branding */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-8 h-8">
              <Image src="/assets/logo.png" alt="MineFuture Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-oswald font-bold text-gradient-gold">MINEFUTURE</span>
          </div>
          <p className="text-foreground/50 text-sm leading-relaxed mb-6">
            Forge Your Future. Join the ultimate Minecraft Lifesteal SMP experience with a dedicated community and premium features.
          </p>
          <div className="flex gap-4">
            <Link href="https://discord.gg/jTb3WYtXJz" target="_blank" className="text-foreground/50 hover:text-primary-gold transition-colors"><Discord size={20} /></Link>
            <Link href="#" className="text-foreground/50 hover:text-primary-gold transition-colors"><MessageSquare size={20} /></Link>
            <Link href="#" className="text-foreground/50 hover:text-primary-gold transition-colors"><Share2 size={20} /></Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-oswald uppercase tracking-widest text-sm mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-foreground/50 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link href="/store" className="text-foreground/50 hover:text-white transition-colors text-sm">Store</Link></li>
            <li><Link href="/rules" className="text-foreground/50 hover:text-white transition-colors text-sm">Rules</Link></li>
            <li><Link href="/terms" className="text-foreground/50 hover:text-white transition-colors text-sm">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-oswald uppercase tracking-widest text-sm mb-6">Support</h4>
          <ul className="space-y-4">
            <li><Link href="/terms" className="text-foreground/50 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-foreground/50 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            <li><Link href="/contact" className="text-foreground/50 hover:text-white transition-colors text-sm">Contact Us</Link></li>
          </ul>
        </div>

        {/* Server Info */}
        <div>
          <h4 className="text-white font-oswald uppercase tracking-widest text-sm mb-6">Server Status</h4>
          <div className="glass-card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/50">Status</span>
              <span className={cn(
                "text-xs font-bold flex items-center gap-1",
                online ? "text-green-500" : "text-red-500"
              )}>
                <span className={cn("w-2 h-2 rounded-full", online ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
                {online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/50">Players</span>
              <span className="text-xs text-white">{playerCount !== null ? playerCount : "---"} / 1000</span>
            </div>
            <div className="mt-2 text-[10px] text-primary-gold/70 font-mono">play.minefuture.fun</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center">
        <p className="text-foreground/30 text-[10px] uppercase tracking-[0.2em]">
          &copy; 2024 MineFuture Network. Not affiliated with Mojang AB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
