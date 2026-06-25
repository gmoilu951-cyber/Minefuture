"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GooeyNav = ({ links }) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [rects, setRects] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const index = links.findIndex(link =>
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
    );
    if (index !== -1) setActiveIndex(index);
  }, [pathname, links]);

  useEffect(() => {
    const updateRects = () => {
      if (containerRef.current) {
        const buttons = containerRef.current.querySelectorAll("button, a");
        const newRects = Array.from(buttons).map(btn => ({
          left: btn.offsetLeft,
          width: btn.offsetWidth,
          top: btn.offsetTop,
          height: btn.offsetHeight
        }));
        setRects(newRects);
      }
    };

    updateRects();
    window.addEventListener("resize", updateRects);
    return () => window.removeEventListener("resize", updateRects);
  }, [links]);

  const [particles, setParticles] = useState([]);

  const createParticles = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i / 8) * Math.PI * 2,
      velocity: Math.random() * 50 + 50
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };

  return (
    <div className="relative flex items-center p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl overflow-visible">
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0">
        <defs>
          <filter id="goo-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          </filter>
        </defs>
      </svg>

      <div ref={containerRef} className="relative flex items-center gap-1 z-10" style={{ filter: "url(#goo-nav)" }}>
        {/* Gooey Indicator */}
        {rects.length > 0 && (
          <motion.div
            className="absolute bg-premium-gradient rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            initial={false}
            animate={{
              left: rects[hoverIndex !== null ? hoverIndex : activeIndex]?.left || 0,
              width: rects[hoverIndex !== null ? hoverIndex : activeIndex]?.width || 0,
              height: rects[hoverIndex !== null ? hoverIndex : activeIndex]?.height || 0,
              top: rects[hoverIndex !== null ? hoverIndex : activeIndex]?.top || 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
          />
        )}

        {links.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={(e) => createParticles(e, i)}
            className={cn(
              "relative px-6 py-2.5 text-sm font-oswald uppercase tracking-widest transition-colors duration-300 z-20 whitespace-nowrap rounded-full",
              (hoverIndex === i || (hoverIndex === null && activeIndex === i)) ? "text-navy-dark" : "text-foreground/60 hover:text-white"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.velocity,
              y: p.y + Math.sin(p.angle) * p.velocity,
              opacity: 0,
              scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-primary-gold rounded-full pointer-events-none z-0"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GooeyNav;
