"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import {
  BarChart3,
  Package,
  Ticket,
  Users,
  ShoppingBag,
  Settings,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Eye,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: "₹42,890", icon: TrendingUp, color: "text-green-500" },
  { label: "Active Players", value: "1,243", icon: Users, color: "text-blue-500" },
  { label: "Pending Verification", value: "12", icon: Clock, color: "text-orange-500" },
  { label: "Success Rate", value: "98.2%", icon: CheckCircle2, color: "text-purple-500" },
];

const mockOrders = [
  { id: "#MF-82931", user: "PlayerOne", type: "Java", item: "Olympian Rank", price: "₹1,249", method: "bKash", status: "AWAITING_VERIFICATION", date: "10 mins ago" },
  { id: "#MF-82930", user: ".BedrockDev", type: "Bedrock", item: "5x Immortal Keys", price: "₹450", method: "PayPal", status: "PAID", date: "25 mins ago" },
  { id: "#MF-82929", user: "LifestealKing", type: "Java", item: "Demigod Rank", price: "₹109", method: "Nagad", status: "PENDING", date: "1 hour ago" },
  { id: "#MF-82928", user: "Zeref_MC", type: "Java", item: "Hero Rank", price: "₹299", method: "Stripe", status: "DELIVERED", date: "2 hours ago" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-oswald font-bold text-white uppercase mb-2">Network Control</h1>
          <p className="text-primary-gold uppercase tracking-widest text-xs">Administrative Management System</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('overview')} className={cn("px-6 py-2 rounded-lg font-oswald uppercase text-xs transition-all", activeTab === 'overview' ? "bg-primary-gold text-navy-default" : "text-foreground/40 hover:text-white")}>Overview</button>
          <button onClick={() => setActiveTab('orders')} className={cn("px-6 py-2 rounded-lg font-oswald uppercase text-xs transition-all", activeTab === 'orders' ? "bg-primary-gold text-navy-default" : "text-foreground/40 hover:text-white")}>Orders & Payments</button>
          <button onClick={() => setActiveTab('settings')} className={cn("px-6 py-2 rounded-lg font-oswald uppercase text-xs transition-all", activeTab === 'settings' ? "bg-primary-gold text-navy-default" : "text-foreground/40 hover:text-white")}>Settings</button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((s) => (
              <GlassCard key={s.label} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${s.color}`}>
                    <s.icon size={24} />
                  </div>
                  <span className="text-[10px] text-green-500 font-bold">+12.5%</span>
                </div>
                <p className="text-foreground/50 text-xs uppercase tracking-widest mb-1">{s.label}</p>
                <h3 className="text-2xl font-oswald font-bold text-white">{s.value}</h3>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GlassCard className="lg:col-span-2 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-oswald text-white uppercase flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary-gold" /> Global Revenue Trend
                </h3>
                <select className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-1 outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="h-64 w-full bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10">
                 <p className="text-foreground/20 font-oswald uppercase tracking-widest">Interactive Analytics Chart</p>
              </div>
            </GlassCard>

            <div className="space-y-6">
              <h3 className="text-xl font-oswald text-white uppercase flex items-center gap-2">
                <Settings size={20} className="text-primary-gold" /> Core Operations
              </h3>
              <div className="space-y-3">
                {['Manage Store', 'Configure Gateways', 'User Permissions', 'Audit Logs'].map((action) => (
                  <button key={action} className="w-full glass-card p-4 flex items-center justify-between hover:bg-white/10 transition-all group cursor-pointer border border-white/5">
                    <span className="text-white font-oswald uppercase tracking-wider text-sm">{action}</span>
                    <ChevronRight size={16} className="text-foreground/20 group-hover:text-primary-gold group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input type="text" placeholder="Search orders, transactions, or users..." className="w-full bg-navy-dark border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-gold/50" />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white flex items-center gap-2 text-xs transition-colors"><Filter size={16} /> Filter</button>
              <button className="px-4 py-3 bg-primary-gold text-navy-default font-bold rounded-xl flex items-center gap-2 text-xs hover:opacity-90 transition-opacity uppercase font-oswald tracking-widest">Export CSV</button>
            </div>
          </div>

          <GlassCard className="overflow-hidden border-white/10 p-0">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">Transaction</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">User</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">Product</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">Method</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">Status</th>
                  <th className="px-8 py-5 text-right text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-mono text-sm text-primary-gold font-bold">{order.id}</div>
                      <div className="text-[10px] text-foreground/30 uppercase mt-1">{order.date}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs">👤</div>
                        <div>
                          <div className="text-white font-oswald uppercase text-sm">{order.user}</div>
                          <div className="text-[10px] text-foreground/40">{order.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-white text-sm">{order.item}</div>
                      <div className="text-xs text-primary-gold font-bold">{order.price}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-xs text-white uppercase tracking-widest">{order.method}</div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        order.status === 'PAID' ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                        order.status === 'AWAITING_VERIFICATION' ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                        "bg-white/5 text-foreground/30 border border-white/5"
                      )}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-white transition-colors" title="View Details"><Eye size={16} /></button>
                        {order.status === 'AWAITING_VERIFICATION' && (
                          <button className="p-2 bg-green-500/10 hover:bg-green-500 rounded-lg text-green-500 hover:text-white transition-all" title="Approve Payment"><CheckCircle2 size={16} /></button>
                        )}
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
