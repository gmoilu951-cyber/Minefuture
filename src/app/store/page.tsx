"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Shield, Sparkles, Trophy, Star } from "lucide-react";
import PremiumButton from "@/components/PremiumButton";
import GlassCard from "@/components/GlassCard";

const ranks = [
  { id: "titan", name: "Titan", price: 39, color: "#94a3b8", features: ["Titan Tag", "5 Home Sets", "Priority Queue"] },
  { id: "spartan", name: "Spartan", price: 69, color: "#cbd5e1", features: ["Spartan Tag", "10 Home Sets", "2x Vote Rewards"] },
  { id: "demigod", name: "Demigod", price: 109, color: "#fbbf24", features: ["Demigod Tag", "20 Home Sets", "Flight in Lobby", "Custom Nickname"] },
  { id: "olympian", name: "Olympian", price: 149, color: "#60a5fa", features: ["Olympian Tag", "Unlimited Homes", "Permanent Flight", "Monthly Legend Crate"] },
];

const keys = [
  { name: "Vote Key", price: 5 },
  { name: "Rare Key", price: 15 },
  { name: "Epic Key", price: 25 },
  { name: "Legendary Key", price: 50 },
  { name: "Mythic Key", price: 100 },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("ranks");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-4 uppercase">The MineFuture Store</h1>
        <p className="text-primary-gold font-oswald tracking-[0.3em] uppercase">Upgrade your journey to the throne</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveCategory("ranks")}
          className={cn(
            "px-8 py-3 rounded-full font-oswald uppercase tracking-widest transition-all",
            activeCategory === "ranks" ? "bg-primary-gold text-navy-default glow-gold" : "bg-white/5 text-white/50 hover:bg-white/10"
          )}
        >
          Ranks
        </button>
        <button
          onClick={() => setActiveCategory("keys")}
          className={cn(
            "px-8 py-3 rounded-full font-oswald uppercase tracking-widest transition-all",
            activeCategory === "keys" ? "bg-primary-gold text-navy-default glow-gold" : "bg-white/5 text-white/50 hover:bg-white/10"
          )}
        >
          Crate Keys
        </button>
      </div>

      {activeCategory === "ranks" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ranks.map((rank) => (
            <GlassCard key={rank.id} className="relative flex flex-col items-center text-center p-8 group">
              {rank.id === "olympian" && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-premium-gradient text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter">
                   Most Popular
                 </div>
              )}
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">💎</div>
              <h3 className="text-3xl font-oswald font-bold text-white mb-2 uppercase">{rank.name}</h3>
              <div className="text-2xl font-oswald text-primary-gold mb-8">₹{rank.price}</div>

              <ul className="w-full space-y-4 mb-10 text-left">
                {rank.features.map((feature) => (
                  <li key={feature} className="text-foreground/60 text-sm flex items-center gap-2">
                    <Star size={14} className="text-primary-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="w-full flex flex-col gap-3">
                <PremiumButton variant="gold" className="w-full py-3">Buy Now</PremiumButton>
                <PremiumButton variant="glass" className="w-full py-3">Gift</PremiumButton>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {keys.map((key) => (
            <GlassCard key={key.name} className="flex flex-col items-center text-center p-6 hover:border-primary-orange/50 transition-all">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-oswald text-white mb-2 uppercase">{key.name}</h3>
              <div className="text-primary-orange font-bold mb-6">₹{key.price}</div>
              <PremiumButton variant="orange" className="w-full py-2 text-sm">Add to Cart</PremiumButton>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Floating Cart */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 rounded-full bg-primary-gold text-navy-default flex items-center justify-center shadow-2xl glow-gold hover:scale-110 transition-transform">
          <ShoppingCart size={28} />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">0</span>
        </button>
      </div>
    </div>
  );
}

// Fixed missing import in my head, I'll add it to the file
import { cn } from "@/lib/utils";
