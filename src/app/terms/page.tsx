import React from "react";
import GlassCard from "@/components/GlassCard";

const sections = [
  {
    title: "General Terms",
    content: "By accessing and using MineFuture, you agree to comply with our network rules and community guidelines. We reserve the right to modify these terms at any time."
  },
  {
    title: "Refund Policy",
    content: "All purchases made on the MineFuture store are final. As digital goods are delivered instantly, we do not offer refunds once the transaction is complete and perks have been assigned."
  },
  {
    title: "Chargebacks",
    content: "Any attempt to chargeback a payment will result in an automatic and permanent ban from the entire MineFuture network, including our Discord server and game servers."
  },
  {
    title: "Rank Permanency",
    content: "Ranks are permanent for the lifetime of the server unless stated otherwise in the product description. Perks may be adjusted during server updates to ensure game balance."
  }
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-oswald font-bold text-white mb-4 uppercase">Terms of Service</h1>
        <p className="text-primary-gold font-oswald tracking-widest uppercase">Legal Information & Policies</p>
      </div>

      <GlassCard className="p-10 space-y-12 mb-12">
        {sections.map((section) => (
          <div key={section.title} className="border-l-2 border-primary-gold pl-8">
            <h3 className="text-2xl font-oswald text-white mb-4 uppercase tracking-wide">{section.title}</h3>
            <p className="text-foreground/60 leading-relaxed italic">{section.content}</p>
          </div>
        ))}
      </GlassCard>

      <p className="text-center text-foreground/30 text-xs uppercase tracking-widest">
        Last Updated: June 23, 2026
      </p>
    </div>
  );
}
