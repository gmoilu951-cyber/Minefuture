"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import GlassCard from "@/components/GlassCard";
import PremiumButton from "@/components/PremiumButton";
import { ShieldCheck, User, Globe, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [ign, setIgn] = useState("");
  const [edition, setEdition] = useState<"java" | "bedrock">("java");
  const [isValidating, setIsValidating] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  const validateIGN = async () => {
    if (!ign) return;
    setIsValidating(true);
    setError("");
    setUserData(null);

    // Basic regex validation
    const javaRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const bedrockRegex = /^\.[a-zA-Z0-9_ ]{3,16}$/;

    const isValid = edition === "java" ? javaRegex.test(ign) : bedrockRegex.test(ign);

    if (!isValid) {
      setError(edition === "java"
        ? "Invalid Java IGN (3-16 chars, alphanumeric/underscores)"
        : "Invalid Bedrock IGN (Must start with .)");
      setIsValidating(false);
      return;
    }

    // Mock API call to fetch skin
    setTimeout(() => {
      setUserData({
        username: ign,
        uuid: edition === "java" ? "069a79f4-44e9-4726-a5be-fca90e38aaf5" : "Bedrock-ID",
        head: edition === "java"
          ? `https://cravatar.eu/helmhead/${ign}/128.png`
          : "https://cravatar.eu/helmhead/Steve/128.png"
      });
      setIsValidating(false);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-oswald font-bold text-white mb-12 uppercase text-center">Secure Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Summary */}
        <div className="space-y-8">
          <h2 className="text-xl font-oswald text-primary-gold uppercase tracking-widest">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <p className="text-white font-oswald uppercase">{item.name} x {item.quantity}</p>
                  <p className="text-xs text-foreground/40">{item.type === "rank" ? "Permanent Rank" : "Crate Keys"}</p>
                </div>
                <p className="text-white font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 text-2xl font-oswald">
              <span className="text-foreground/50">Total</span>
              <span className="text-primary-gold">₹{getTotal()}</span>
            </div>
          </div>
        </div>

        {/* Right: IGN Entry */}
        <div className="space-y-8">
          <h2 className="text-xl font-oswald text-primary-gold uppercase tracking-widest">Minecraft Identity</h2>

          <div className="space-y-6">
            <div className="flex gap-4 p-1 bg-white/5 rounded-lg">
              <button
                onClick={() => setEdition("java")}
                className={cn(
                  "flex-1 py-2 rounded-md font-oswald uppercase text-xs transition-all",
                  edition === "java" ? "bg-white/10 text-white shadow-lg" : "text-foreground/40 hover:text-white"
                )}
              >
                Java Edition
              </button>
              <button
                onClick={() => setEdition("bedrock")}
                className={cn(
                  "flex-1 py-2 rounded-md font-oswald uppercase text-xs transition-all",
                  edition === "bedrock" ? "bg-white/10 text-white shadow-lg" : "text-foreground/40 hover:text-white"
                )}
              >
                Bedrock Edition
              </button>
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
              <input
                type="text"
                placeholder={edition === "java" ? "Enter Java IGN" : "Enter Bedrock IGN (e.g. .Player)"}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-24 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                value={ign}
                onChange={(e) => setIgn(e.target.value)}
              />
              <button
                onClick={validateIGN}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-gold text-navy-default px-4 py-2 rounded-lg text-xs font-bold uppercase hover:opacity-90 transition-opacity"
              >
                Verify
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {isValidating && (
              <div className="flex items-center justify-center p-8 bg-white/5 rounded-xl border border-white/10">
                <Loader2 className="animate-spin text-primary-gold" size={32} />
              </div>
            )}

            {userData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-primary-gold/30 rounded-xl p-6 flex items-center gap-6"
              >
                <div className="relative w-20 h-20 bg-navy-dark rounded-lg overflow-hidden border border-white/10">
                  <Image src={userData.head} alt="Skin" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="text-xl font-oswald text-white uppercase">{userData.username}</h4>
                  <p className="text-xs text-primary-gold uppercase tracking-widest">{edition} Edition</p>
                  <p className="text-[10px] text-foreground/30 font-mono mt-1">{userData.uuid}</p>
                </div>
                <div className="ml-auto">
                   <ShieldCheck className="text-green-500" size={32} />
                </div>
              </motion.div>
            )}
          </div>

          <PremiumButton
            variant="gold"
            className={cn("w-full py-5 text-xl", !userData && "opacity-50 grayscale pointer-events-none")}
            disabled={!userData}
          >
            Confirm & Pay
          </PremiumButton>

          <p className="text-center text-foreground/30 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
            <Globe size={12} /> Secure Multi-Currency Payment
          </p>
        </div>
      </div>
    </div>
  );
}
