"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import AIChatWindow from "./AIChatWindow";

const AllayCompanion = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [interactionStep, setInteractionStep] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [idleOffset, setIdleOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 50, damping: 20 });

  // Create a slight parallax-like vertical drift as user scrolls
  const scrollReactionY = useTransform(smoothY, [0, 1000], [0, -30]);

  const interactionStepRef = useRef(0);
  useEffect(() => {
    interactionStepRef.current = interactionStep;
  }, [interactionStep]);

  const isChatOpenRef = useRef(false);
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Smooth idle drift logic
    const driftInterval = setInterval(() => {
      setIdleOffset({
        x: (Math.random() - 0.5) * (isMobile ? 30 : 60),
        y: (Math.random() - 0.5) * (isMobile ? 30 : 60)
      });
    }, 4000);

    // Occasional life-like actions
    const actionInterval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.2) {
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 2500);
      } else if (rand < 0.4) {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1200);
      } else if (rand < 0.6) {
        setIsSparkling(true);
        setTimeout(() => setIsSparkling(false), 3000);
      }
    }, 7000);

    return () => {
      clearInterval(driftInterval);
      clearInterval(actionInterval);
    };
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const handleAllayClick = () => {
    if (interactionStep === 0) {
      setShowSpeechBubble(true);
      setInteractionStep(1);

      setTimeout(() => {
        if (interactionStepRef.current === 1 && !isChatOpenRef.current) {
          setShowSpeechBubble(false);
          setInteractionStep(0);
        }
      }, 8000);
    } else {
      setIsChatOpen(true);
      setIsMinimized(false);
      setShowSpeechBubble(false);
    }
  };

  return (
    <>
      <motion.div
        style={{ y: scrollReactionY }}
        className={cn(
          "fixed z-[90] pointer-events-none transition-all duration-500",
          isMobile ? "right-4 bottom-4" : "right-8 bottom-8"
        )}
      >
        <motion.div
          animate={{
            x: idleOffset.x + (!isMobile && typeof window !== 'undefined' ? (mousePos.x / window.innerWidth - 0.5) * 40 : 0),
            y: idleOffset.y,
            rotate: isSpinning ? 360 : isWaving ? [0, 10, -10, 0] : 0,
            scale: isWaving ? [1, 1.1, 1] : isMobile ? 0.85 : 1,
          }}
          transition={{
            rotate: isSpinning ? { duration: 1, ease: "easeInOut" } : { duration: 0.5, repeat: isWaving ? 2 : 0 },
            x: { type: "spring", stiffness: 20, damping: 15 },
            y: { type: "spring", stiffness: 20, damping: 15 },
            scale: { duration: 0.5 }
          }}
          className="relative pointer-events-auto cursor-pointer group"
          onClick={handleAllayClick}
        >
          {/* Main Container with Floating Motion */}
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
          >
            {/* Sparkles / Particles */}
            <AnimatePresence>
              {(isSparkling || isSpinning) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {[...Array(isMobile ? 5 : 8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * (isMobile ? 100 : 160),
                        y: (Math.random() - 0.5) * (isMobile ? 100 : 160),
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute"
                    >
                      <Sparkles className="text-primary-gold drop-shadow-glow" size={isMobile ? 12 : 16} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn(
              "relative",
              isMobile ? "w-20 h-20" : "w-24 h-24 md:w-28 md:h-28"
            )}>
              <div className="absolute inset-0 bg-primary-gold/20 blur-[40px] rounded-full animate-pulse" />

              <motion.div
                animate={{
                  scaleY: [1, 0.94, 1],
                  scaleX: [1, 1.06, 1],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{
                  scaleY: { repeat: Infinity, duration: 0.3, ease: "easeInOut" },
                  scaleX: { repeat: Infinity, duration: 0.3, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="w-full h-full"
              >
                <img
                  src="https://minecraft.wiki/images/Allay_JE1_BE1.png"
                  alt="Allay"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
                />
              </motion.div>

              <AnimatePresence>
                {isWaving && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -20, x: -30 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-0 left-0 z-20 pointer-events-none"
                  >
                     <span className={isMobile ? "text-2xl" : "text-3xl drop-shadow-lg"}>👋</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/40 blur-xl rounded-full"
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {showSpeechBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
                className={cn(
                  "absolute bottom-full right-0 mb-8 glass-card p-5 border border-primary-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110] rounded-2xl",
                  isMobile ? "w-64" : "w-72"
                )}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🧚</span>
                  </div>
                  <p className="text-white text-sm font-semibold leading-snug pt-1">👋 Hi! I'm your companion Allay. How can I help you today?</p>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    "Store Help",
                    "Rank Information",
                    "Payment Help",
                    "Server Information",
                    "Contact Support"
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsChatOpen(true);
                        setIsMinimized(false);
                        setShowSpeechBubble(false);
                      }}
                      className="text-left px-4 py-2 rounded-xl bg-white/5 hover:bg-primary-gold hover:text-navy-default transition-all text-[11px] uppercase font-bold tracking-widest border border-white/5 hover:border-primary-gold/50"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="absolute top-full right-12 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AIChatWindow
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setInteractionStep(0);
        }}
        onMinimize={() => {
          setIsChatOpen(false);
          setIsMinimized(true);
        }}
      />

      <AnimatePresence>
        {isMinimized && !isChatOpen && (
          <motion.button
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 50, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsChatOpen(true);
              setIsMinimized(false);
            }}
            className={cn(
              "fixed z-[100] rounded-2xl bg-primary-gold text-navy-default flex items-center justify-center shadow-[0_10px_30px_rgba(255,215,0,0.3)] glow-gold border border-white/20 transition-all",
              isMobile ? "right-4 bottom-20 w-12 h-12" : "right-8 bottom-24 w-14 h-14"
            )}
          >
            <div className="relative">
              <MessageSquare size={isMobile ? 20 : 24} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-primary-gold rounded-full" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllayCompanion;
