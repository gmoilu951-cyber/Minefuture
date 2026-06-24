"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import { User, CreditCard, Shield, Clock, ExternalLink, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mockPurchases = [
  { id: "#MF-82931", item: "Olympian Rank Upgrade", price: "₹1,249", status: "AWAITING_VERIFICATION", date: "JUN 24, 2024", icon: "💎" },
  { id: "#MF-82928", item: "Demigod Rank Upgrade", price: "₹109", status: "DELIVERED", date: "JUN 20, 2024", icon: "💎" },
  { id: "#MF-82920", item: "10x Crate Keys", price: "₹850", status: "PAID", date: "JUN 15, 2024", icon: "🔑" },
];

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
      <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start">
        {/* Profile Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <GlassCard className="p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-premium-gradient"></div>
            <div className="relative w-32 h-32 mb-6 rounded-3xl overflow-hidden border-4 border-primary-gold glow-gold transform rotate-3 hover:rotate-0 transition-transform">
              <Image src={session?.user?.image || "/assets/logo.png"} alt="Avatar" fill className="object-cover" />
            </div>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase">{session?.user?.name}</h2>
            <p className="text-foreground/50 text-sm mb-8">{session?.user?.email}</p>

            <div className="w-full grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold mb-1">Current Rank</p>
                  <p className="text-primary-gold font-bold font-oswald text-lg">DEMIGOD</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold mb-1">Hearts</p>
                  <p className="text-red-500 font-bold font-oswald text-lg">24 / 40</p>
               </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
             <h3 className="text-white font-oswald uppercase tracking-widest text-sm border-b border-white/5 pb-4">Quick Links</h3>
             {['Open Support Ticket', 'Link Bedrock Account', 'Change Skin', 'Security Settings'].map(link => (
               <button key={link} className="w-full flex items-center justify-between text-left text-xs text-foreground/50 hover:text-primary-gold transition-colors group">
                  {link}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
             ))}
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full space-y-8">
           <div className="flex justify-between items-center">
             <h3 className="text-2xl font-oswald text-white uppercase tracking-widest flex items-center gap-3">
               <Shield size={24} className="text-primary-gold" /> Account Security
             </h3>
             <span className="text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-green-500/20">Verified</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="flex items-center gap-6 group hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                 <div className="w-12 h-12 bg-primary-gold/10 rounded-xl flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-navy-default transition-all">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-oswald uppercase text-sm tracking-wide">Linked Minecraft</h4>
                    <p className="text-primary-gold text-xs font-mono font-bold tracking-tighter">MineFuture_Dev (JAVA)</p>
                 </div>
                 <ExternalLink size={16} className="ml-auto text-foreground/20" />
              </GlassCard>

              <GlassCard className="flex items-center gap-6 group hover:bg-[#5865F2]/10 transition-colors cursor-pointer border border-white/5">
                 <div className="w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center text-[#5865F2] group-hover:bg-[#5865F2] group-hover:text-white transition-all">
                    <CreditCard size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-oswald uppercase text-sm tracking-wide">Discord Account</h4>
                    <p className="text-[#5865F2] text-xs font-bold tracking-tighter">jules_dev#0001</p>
                 </div>
                 <ExternalLink size={16} className="ml-auto text-foreground/20" />
              </GlassCard>
           </div>

           <h3 className="text-2xl font-oswald text-white uppercase tracking-widest flex items-center gap-3 pt-8">
             <Clock size={24} className="text-primary-gold" /> Transaction History
           </h3>

           <div className="space-y-4">
              {mockPurchases.map((purchase) => (
                <GlassCard key={purchase.id} className="flex justify-between items-center py-5 border border-white/5 hover:border-white/20 transition-colors">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shadow-inner">{purchase.icon}</div>
                      <div>
                        <p className="text-white font-oswald uppercase font-bold tracking-tight">{purchase.item}</p>
                        <p className="text-[10px] text-foreground/40 tracking-widest font-mono">{purchase.date} • {purchase.id}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-white font-oswald font-bold text-lg mb-1">{purchase.price}</p>
                      <span className={cn(
                        "text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest",
                        purchase.status === 'DELIVERED' ? "bg-green-500/10 text-green-500" :
                        purchase.status === 'AWAITING_VERIFICATION' ? "bg-orange-500/10 text-orange-500" :
                        "bg-white/10 text-foreground/50"
                      )}>
                        {purchase.status.replace('_', ' ')}
                      </span>
                   </div>
                </GlassCard>
              ))}
           </div>

           <button className="w-full py-4 text-xs font-oswald text-foreground/30 uppercase tracking-[0.4em] hover:text-primary-gold transition-colors">
             View All Transactions
           </button>
        </div>
      </div>
    </div>
  );
}
