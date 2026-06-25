"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-primary-gold bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-navy-dark border-l border-white/10 z-[101] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-2xl font-oswald font-bold text-gradient-gold">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground/60 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {links.map((link) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group overflow-hidden",
                        isActive
                          ? "bg-premium-gradient text-navy-dark font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                          : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span className="text-lg font-oswald uppercase tracking-widest">{link.name}</span>
                      <ChevronRight
                        size={20}
                        className={cn(
                          "transition-transform duration-300",
                          isActive ? "translate-x-0" : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )}
                      />

                      {/* Active Gooey Indicator simulation for mobile */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active"
                          className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/10 text-center">
                <p className="text-sm font-oswald text-foreground/40 uppercase tracking-widest">MineFuture Network</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
