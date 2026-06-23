"use client";

import React from "react";
import GlassCard from "@/components/GlassCard";
import { BarChart3, Package, Ticket, Users, ShoppingBag, Settings, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹42,890", icon: TrendingUp, color: "text-green-500" },
  { label: "Active Players", value: "1,243", icon: Users, color: "text-blue-500" },
  { label: "Pending Tickets", value: "14", icon: Ticket, color: "text-orange-500" },
  { label: "Total Orders", value: "852", icon: ShoppingBag, color: "text-purple-500" },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-oswald font-bold text-white uppercase mb-2">Admin Control Center</h1>
        <p className="text-primary-gold uppercase tracking-widest text-xs">Manage the future of MineFuture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <GlassCard key={s.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={24} />
              </div>
              <span className="text-[10px] text-green-500 font-bold">+12%</span>
            </div>
            <p className="text-foreground/50 text-xs uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-oswald font-bold text-white">{s.value}</h3>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 p-8">
          <h3 className="text-xl font-oswald text-white uppercase mb-8 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-gold" /> Revenue Analytics
          </h3>
          <div className="h-64 w-full bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10">
             <p className="text-foreground/20 font-oswald uppercase">Chart Visualization Placeholder</p>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <h3 className="text-xl font-oswald text-white uppercase flex items-center gap-2">
            <Settings size={20} className="text-primary-gold" /> Quick Actions
          </h3>
          <button className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left group">
            <div className="w-10 h-10 bg-primary-gold/10 rounded-lg flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-navy-default transition-colors">
              <Package size={20} />
            </div>
            <span className="text-white font-oswald uppercase tracking-wider">Manage Products</span>
          </button>
          <button className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left group">
            <div className="w-10 h-10 bg-primary-orange/10 rounded-lg flex items-center justify-center text-primary-orange group-hover:bg-primary-orange group-hover:text-white transition-colors">
              <Ticket size={20} />
            </div>
            <span className="text-white font-oswald uppercase tracking-wider">Configure Coupons</span>
          </button>
          <button className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left group">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Users size={20} />
            </div>
            <span className="text-white font-oswald uppercase tracking-wider">User Audits</span>
          </button>
        </div>
      </div>
    </div>
  );
}
