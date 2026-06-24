"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, X, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";
import PremiumButton from "@/components/PremiumButton";
import GlassCard from "@/components/GlassCard";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ranks = [
  { id: "titan", name: "Titan", price: 39, features: ["Titan Tag", "5 Home Sets", "Priority Queue"] },
  { id: "spartan", name: "Spartan", price: 69, features: ["Spartan Tag", "10 Home Sets", "2x Vote Rewards"] },
  { id: "demigod", name: "Demigod", price: 109, features: ["Demigod Tag", "20 Home Sets", "Flight in Lobby", "Custom Nickname"] },
  { id: "olympian", name: "Olympian", price: 149, features: ["Olympian Tag", "Unlimited Homes", "Permanent Flight", "Monthly Legend Crate"] },
];

const keys = [
  { id: "key_vote", name: "Vote Key", price: 5 },
  { id: "key_rare", name: "Rare Key", price: 15 },
  { id: "key_epic", name: "Epic Key", price: 25 },
  { id: "key_legendary", name: "Legendary Key", price: 50 },
  { id: "key_mythic", name: "Mythic Key", price: 100 },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("ranks");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity, getTotal, applyCoupon, coupon, getDiscountedTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleAddToCart = (product: any, type: "rank" | "key") => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      type
    });
    setIsCartOpen(true);
  };

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    } else {
      setCouponInput("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-4 uppercase">The MineFuture Store</h1>
        <p className="text-primary-gold font-oswald tracking-[0.3em] uppercase">Upgrade your journey to the throne</p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveCategory("ranks")}
          className={cn(
            "px-8 py-3 rounded-full font-oswald uppercase tracking-widest transition-all cursor-pointer",
            activeCategory === "ranks" ? "bg-primary-gold text-navy-default glow-gold" : "bg-white/5 text-white/50 hover:bg-white/10"
          )}
        >
          Ranks
        </button>
        <button
          onClick={() => setActiveCategory("keys")}
          className={cn(
            "px-8 py-3 rounded-full font-oswald uppercase tracking-widest transition-all cursor-pointer",
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
                <PremiumButton variant="gold" className="w-full py-3" onClick={() => handleAddToCart(rank, "rank")}>
                  Add to Cart
                </PremiumButton>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {keys.map((key) => (
            <GlassCard key={key.id} className="flex flex-col items-center text-center p-6 hover:border-primary-orange/50 transition-all">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-oswald text-white mb-2 uppercase">{key.name}</h3>
              <div className="text-primary-orange font-bold mb-6">₹{key.price}</div>
              <PremiumButton variant="orange" className="w-full py-2 text-sm" onClick={() => handleAddToCart(key, "key")}>
                Add to Cart
              </PremiumButton>
            </GlassCard>
          ))}
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={() => setIsCartOpen(true)} className="w-16 h-16 rounded-full bg-primary-gold text-navy-default flex items-center justify-center shadow-2xl glow-gold hover:scale-110 transition-transform cursor-pointer">
          <ShoppingCart size={28} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-navy-dark border-l border-white/10 z-[70] p-8 flex flex-col" >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-oswald font-bold text-white uppercase">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-foreground/50 hover:text-white transition-colors cursor-pointer"><X size={28} /></button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingCart size={64} className="text-foreground/10" />
                    <p className="text-foreground/30 font-oswald uppercase tracking-widest">Your cart is empty</p>
                    <PremiumButton variant="glass" onClick={() => setIsCartOpen(false)}>Continue Shopping</PremiumButton>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center text-2xl">{item.type === "rank" ? "💎" : "🔑"}</div>
                      <div className="flex-grow">
                        <h4 className="text-white font-oswald uppercase tracking-wide">{item.name}</h4>
                        <p className="text-primary-gold text-sm font-bold">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10"><Minus size={14} /></button>
                        <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white hover:bg-white/10"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors ml-2"><Trash2 size={18} /></button>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        className={cn(
                          "flex-grow bg-white/5 border rounded-lg px-4 py-2 text-sm focus:outline-none transition-all",
                          couponError ? "border-red-500" : "border-white/10 focus:border-primary-gold/50"
                        )}
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                      />
                      <button onClick={handleApplyCoupon} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors">Apply</button>
                    </div>
                    {coupon && (
                      <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle2 size={12} /> Coupon {coupon.code} Applied ({coupon.discount * 100}% OFF)
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/40 uppercase">Subtotal</span>
                      <span className="text-white">₹{getTotal()}</span>
                    </div>
                    {coupon && (
                       <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/40 uppercase">Discount</span>
                        <span className="text-green-500">-₹{getTotal() - getDiscountedTotal()}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-2xl font-oswald pt-2 border-t border-white/5">
                      <span className="text-foreground/50 uppercase">Total</span>
                      <span className="text-primary-gold font-bold">₹{getDiscountedTotal()}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="block w-full">
                    <PremiumButton variant="gold" className="w-full py-4 text-lg">Proceed to Checkout</PremiumButton>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
