import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "hover:border-primary-gold/30 hover:shadow-primary-gold/10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
