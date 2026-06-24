"use client";

import React, { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Search, ShieldAlert, Disc as Discord, UserX, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const ruleCategories = [
  { id: "general", name: "General Rules", icon: ShieldAlert },
  { id: "gameplay", name: "Gameplay Rules", icon: UserX },
  { id: "discord", name: "Discord Rules", icon: Discord },
  { id: "punishments", name: "Punishments", icon: AlertTriangle },
];

const rulesData = {
  general: [
    "Respect everyone in the community.",
    "No hate speech or toxicity.",
    "No spamming or advertising other servers.",
    "No NSFW content in any form.",
  ],
  gameplay: [
    "No hacking or use of illegal clients.",
    "No exploiting bugs or glitches.",
    "No griefing protected areas.",
    "No scamming other players.",
    "No cross-teaming in events.",
  ],
  discord: [
    "Use correct channels for their purposes.",
    "No ear-rape or mic-spam in voice channels.",
    "No NSFW avatars or nicknames.",
    "Respect the staff and their decisions.",
  ],
  punishments: [
    "Warning → Mute → Kick → Ban",
    "Moderate Infraction: Mute (1h - 24h)",
    "Major Infraction: Kick or Temp-Ban (1d - 30d)",
    "Severe Infraction: Permanent Ban",
  ],
};

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRules = rulesData[activeTab as keyof typeof rulesData].filter(rule =>
    rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-oswald font-bold text-white mb-4 uppercase">Network Rules</h1>
        <p className="text-primary-gold font-oswald tracking-widest uppercase">Fair play for everyone</p>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
        <input
          type="text"
          placeholder="Search rules..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {ruleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-oswald uppercase tracking-wider transition-all",
              activeTab === cat.id ? "bg-primary-gold text-navy-default glow-gold" : "bg-white/5 text-white/50 hover:bg-white/10"
            )}
          >
            <cat.icon size={18} />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule, index) => (
            <GlassCard key={index} className="flex gap-4 items-start border-l-4 border-l-primary-gold">
              <span className="text-primary-gold font-oswald font-bold text-xl opacity-50">#0{index + 1}</span>
              <p className="text-lg text-foreground/80">{rule}</p>
            </GlassCard>
          ))
        ) : (
          <div className="text-center py-20 text-foreground/30">
            No rules found matching your search.
          </div>
        )}
      </div>

      <div className="mt-20 p-8 glass-card text-center">
        <h4 className="text-xl font-oswald text-white mb-4 uppercase">Need help or want to report?</h4>
        <p className="text-foreground/50 mb-8">If you witness someone breaking these rules, please open a ticket on our Discord server.</p>
        <button className="bg-[#5865F2] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity cursor-pointer">
          Join Discord Support
        </button>
      </div>
    </div>
  );
}
