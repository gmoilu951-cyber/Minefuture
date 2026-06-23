"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "gold" | "orange" | "glass";
  glow?: boolean;
  animate?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  className,
  variant = "gold",
  glow = true,
  animate = true,
  ...props
}) => {
  const variants = {
    gold: "bg-gold-gradient text-navy-default",
    orange: "bg-orange-gradient text-white",
    glass: "glass-card text-white hover:bg-white/10",
  };

  const glows = {
    gold: "glow-gold",
    orange: "glow-orange",
    glass: "",
  };

  return (
    <motion.button
      whileHover={animate ? { scale: 1.05 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      className={cn(
        "premium-button animate-shine",
        variants[variant],
        glow && glows[variant as keyof typeof glows],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PremiumButton;
