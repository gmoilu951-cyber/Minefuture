"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Disc as Discord, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import GooeyNav from "./GooeyNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/store" },
    { name: "Download", href: "/#play" },
    { name: "Docs", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/#contact" },
  ];

  // User specifically asked for Login and Dashboard to be part of navigation
  // We'll add them to the mobile nav and handle them in the desktop layout
  const allLinks = [...navLinks];
  if (session) {
    allLinks.push({ name: "Dashboard", href: "/dashboard" });
  } else {
    allLinks.push({ name: "Login", href: "/login" });
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-navy-default/40 backdrop-blur-md translate-y-2 mx-auto max-w-7xl rounded-[40px] border border-white/10 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image src="/assets/logo.png" alt="MineFuture Logo" fill className="object-contain" />
          </div>
          <span className="text-2xl font-oswald font-bold text-gradient-gold tracking-tight hidden sm:block">
            MINEFUTURE
          </span>
        </Link>

        {/* Desktop Gooey Navigation */}
        <div className="hidden lg:block">
          <GooeyNav links={allLinks} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signOut()}
                  className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-foreground/50 hover:text-red-500 transition-all duration-300 hover:bg-red-500/10"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
                <Link href="https://discord.gg/jTb3WYtXJz" target="_blank" className="p-2.5 bg-[#5865F2] rounded-2xl text-white shadow-[0_0_15px_rgba(88,101,242,0.4)] hover:scale-105 transition-transform">
                  <Discord size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="https://discord.gg/jTb3WYtXJz" target="_blank" className="p-2.5 bg-[#5865F2] rounded-2xl text-white shadow-[0_0_15px_rgba(88,101,242,0.4)] hover:scale-105 transition-transform">
                  <Discord size={20} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <MobileNav links={allLinks} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
