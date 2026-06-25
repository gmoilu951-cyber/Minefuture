"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import PremiumButton from "./PremiumButton";
import { cn } from "@/lib/utils";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: "UPDATE" | "EVENT" | "NEWS" | "STORE" | "GIVEAWAY" | "PATCH NOTES" | "COMMUNITY";
  image: string;
  date: string;
  author: string;
  readTime: string;
  featured?: boolean;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "MineFuture Season 1 Official Launch",
    description: "The wait is over! Join us for the official launch of Season 1 with brand new features, map resets, and a massive $500 prize pool.",
    category: "UPDATE",
    image: "https://images.unsplash.com/photo-1607988523713-a921406407c6?auto=format&fit=crop&w=800&q=80",
    date: "Jun 24, 2026",
    author: "MineFuture Team",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Olympian Rank Now Available",
    description: "Ascend to godhood with the new Olympian Rank. Unlock exclusive perks, custom prefixes, and the ultimate celestial kit.",
    category: "STORE",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    date: "Jun 22, 2026",
    author: "MineFuture Team",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "New Mythic Crates Released",
    description: "Test your luck with the new Mythic Crates! Containing over 50 new custom items, including the legendary Void Sword.",
    category: "STORE",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    date: "Jun 20, 2026",
    author: "MineFuture Team",
    readTime: "2 min read",
  },
  {
    id: 4,
    title: "Summer PvP Tournament Announced",
    description: "Sign up now for the Summer PvP Tournament. Battle it out for unique titles and a chance to win exclusive physical merch.",
    category: "EVENT",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    date: "Jun 18, 2026",
    author: "MineFuture Team",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 5,
    title: "Patch v1.2.0 Released",
    description: "We've implemented massive performance upgrades and fixed over 100 community-reported bugs in this latest patch.",
    category: "PATCH NOTES",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    date: "Jun 15, 2026",
    author: "MineFuture Team",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "2x Vote Rewards Weekend",
    description: "Support the server this weekend and receive double the rewards from all voting sites. Don't miss out on extra hearts!",
    category: "GIVEAWAY",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    date: "Jun 12, 2026",
    author: "MineFuture Team",
    readTime: "2 min read",
  }
];

const NewsCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-white/[0.08] backdrop-blur-[18px] border border-white/12 rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.02] hover:border-primary-gold hover:shadow-[0_0_40px_rgba(255,215,0,0.25)] h-full"
    >
      {/* Featured Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
        />

        {/* Featured Badge */}
        {article.featured && (
          <div className="absolute top-4 right-4 z-10 bg-primary-gold text-navy-dark text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.6)] flex items-center gap-1 animate-pulse">
            <Star size={10} fill="currentColor" />
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-premium-gradient text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
            {article.category}
          </span>
        </div>

        {/* Title - Using Oswald as fallback for Clash Display */}
        <h3 className="text-[18px] font-bold text-white mb-3 line-clamp-2 font-oswald tracking-wide leading-tight group-hover:text-primary-gold transition-colors duration-300">
          {article.title}
        </h3>

        {/* Description - Using default/Inter as fallback for General Sans */}
        <p className="text-foreground/60 text-[14px] leading-relaxed mb-6 line-clamp-3">
          {article.description}
        </p>

        {/* Bottom Meta */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-[13px] text-foreground/40 font-medium">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
              <Image src="/assets/logo.png" alt="MineFuture" fill className="object-contain p-0.5" />
            </div>
            <span>MineFuture Team</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span>{article.date}</span>
            <span className="opacity-50">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function NewsSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Aurora Gradients */}
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Custom Aurora CSS Animation will be in globals.css */}
        <div className="aurora-overlay absolute inset-0 opacity-20"></div>

        {/* Floating Glowing Shapes */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary-gold/10 rounded-[40px] blur-[80px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            rotate: [0, -45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-orange/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-oswald uppercase tracking-tight"
          >
            Latest From <span className="text-gradient-gold">MineFuture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-foreground/60 text-lg mb-8 font-medium"
          >
            Stay updated with the latest server announcements, updates, events, new ranks, crate releases, giveaways, seasonal content, and community news.
          </motion.p>

          {/* Animated Divider */}
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 bg-premium-gradient shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* View All News Button */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <PremiumButton variant="gold" className="px-12 py-5 text-xl flex items-center gap-3 font-oswald">
              View All News
              <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
            </PremiumButton>

            {/* Magnetic/Glow Background Effect */}
            <div className="absolute -inset-2 bg-primary-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-50 group-hover:scale-100"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
