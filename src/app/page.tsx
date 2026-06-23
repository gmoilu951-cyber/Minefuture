"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Zap, Sparkles, Trophy, Users, Star } from "lucide-react";
import PremiumButton from "@/components/PremiumButton";
import GlassCard from "@/components/GlassCard";
import CopyIPWidget from "@/components/CopyIPWidget";

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <GlassCard className="group hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-primary-gold/10 rounded-2xl flex items-center justify-center text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-navy-default transition-all duration-300">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-oswald text-white mb-4 uppercase tracking-wide">{title}</h3>
    <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>
  </GlassCard>
);

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-gold/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-orange/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 flex flex-col items-center justify-center text-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-64 h-64 mb-8"
        >
          <Image
            src="/assets/logo.png"
            alt="MineFuture Logo"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(255,215,0,0.4)]"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-oswald text-primary-gold mb-4 uppercase tracking-[0.4em]">Forge Your Future</h2>
          <h1 className="text-6xl md:text-8xl font-oswald font-bold mb-8 tracking-tighter">
            <span className="text-white">MINE</span>
            <span className="text-gradient-gold">FUTURE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 text-lg md:text-xl mb-12 leading-relaxed">
            Join the ultimate Minecraft Lifesteal Experience. Battle, survive, and dominate in a world where every heart counts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <PremiumButton variant="gold" className="px-10 py-4 text-lg">Play Now</PremiumButton>
          <PremiumButton variant="orange" className="px-10 py-4 text-lg">Visit Store</PremiumButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <CopyIPWidget />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-navy-dark/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-oswald text-primary-gold uppercase tracking-[0.5em] mb-4">Why MineFuture?</h2>
            <h3 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-tight">Premium Network Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Shield}
              title="Lifesteal SMP"
              description="Hardcore survival where every kill gives you a heart. Be careful, lose them all and you're out!"
            />
            <FeatureCard
              icon={Zap}
              title="No Lag"
              description="High-performance dedicated servers ensuring a smooth gameplay experience for everyone."
            />
            <FeatureCard
              icon={Sparkles}
              title="Custom Enchants"
              description="Discover rare enchantments that will give you the edge in battle and survival."
            />
            <FeatureCard
              icon={Trophy}
              title="Daily Events"
              description="Join our community for daily events with massive rewards and exclusive items."
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-5xl font-oswald font-bold text-white mb-2">15,000+</div>
            <div className="text-primary-gold uppercase tracking-widest text-sm">Unique Players</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-oswald font-bold text-white mb-2">24/7</div>
            <div className="text-primary-gold uppercase tracking-widest text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-oswald font-bold text-white mb-2">1,200+</div>
            <div className="text-primary-gold uppercase tracking-widest text-sm">Discord Members</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <GlassCard className="max-w-5xl mx-auto p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
           <div className="absolute top-0 left-0 w-full h-1 bg-premium-gradient"></div>
           <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-8 uppercase">Ready to Start Your Journey?</h2>
           <p className="text-foreground/60 text-lg mb-12 max-w-2xl">
             Join thousands of other players and forge your future on the MineFuture network today.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
              <PremiumButton variant="gold" className="px-12 py-5 text-xl">Join Now</PremiumButton>
              <PremiumButton variant="glass" className="px-12 py-5 text-xl">Join Discord</PremiumButton>
           </div>
        </GlassCard>
      </section>
    </div>
  );
}
