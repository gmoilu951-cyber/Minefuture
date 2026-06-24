"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import { User, CreditCard, Shield, Clock, ExternalLink, Settings } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (!mounted || status === "loading") return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
        {/* Profile Card */}
        <GlassCard className="w-full md:w-1/3 p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-primary-gold glow-gold">
            <Image src={session?.user?.image || "/assets/logo.png"} alt="Avatar" fill className="object-cover" />
          </div>
          <h2 className="text-3xl font-oswald font-bold text-white uppercase">{session?.user?.name}</h2>
          <p className="text-foreground/50 text-sm mb-6">{session?.user?.email}</p>

          <div className="w-full grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-[10px] text-foreground/40 uppercase">Rank</p>
                <p className="text-primary-gold font-bold">Demigod</p>
             </div>
             <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-[10px] text-foreground/40 uppercase">Hearts</p>
                <p className="text-red-500 font-bold">24</p>
             </div>
          </div>
        </GlassCard>

        {/* Main Content */}
        <div className="flex-grow w-full space-y-8">
           <h3 className="text-2xl font-oswald text-white uppercase tracking-widest flex items-center gap-3">
             <Settings size={24} className="text-primary-gold" /> Account Overview
           </h3>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center text-primary-gold">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-oswald uppercase">Linked Minecraft</h4>
                    <p className="text-primary-gold text-sm font-mono">MineFuture_Dev</p>
                 </div>
                 <button className="ml-auto text-foreground/30 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                 </button>
              </GlassCard>

              <GlassCard className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-[#5865F2]/10 rounded-lg flex items-center justify-center text-[#5865F2]">
                    <CreditCard size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-oswald uppercase">Discord Account</h4>
                    <p className="text-[#5865F2] text-sm">Connected</p>
                 </div>
              </GlassCard>
           </div>

           <h3 className="text-2xl font-oswald text-white uppercase tracking-widest flex items-center gap-3 pt-8">
             <Clock size={24} className="text-primary-gold" /> Purchase History
           </h3>

           <div className="space-y-4">
              {[1, 2].map((i) => (
                <GlassCard key={i} className="flex justify-between items-center py-4">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">💎</div>
                      <div>
                        <p className="text-white font-oswald uppercase">Demigod Rank Upgrade</p>
                        <p className="text-[10px] text-foreground/40 tracking-widest">JUN 23, 2026 • #MF-82931</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-primary-gold font-bold">₹109</p>
                      <p className="text-[10px] text-green-500 uppercase font-bold">Delivered</p>
                   </div>
                </GlassCard>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
