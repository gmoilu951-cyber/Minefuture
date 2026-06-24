"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PremiumButton from "@/components/PremiumButton";
import { Disc as Discord, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md p-10 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-6">
          <Image src="/assets/logo.png" alt="MineFuture Logo" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-oswald font-bold text-white mb-2 uppercase">Welcome Back</h1>
        <p className="text-primary-gold font-oswald text-sm tracking-[0.2em] mb-8 uppercase">Forge Your Future</p>

        <div className="w-full space-y-4">
          <PremiumButton
            variant="glass"
            className="w-full flex items-center justify-center gap-3 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border-[#5865F2]/30"
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          >
            <Discord size={20} />
            Login with Discord
          </PremiumButton>

          <PremiumButton
            variant="glass"
            className="w-full flex items-center justify-center gap-3"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
             <Image src="https://www.google.com/favicon.ico" alt="Google" width={18} height={18} />
            Login with Google
          </PremiumButton>
        </div>

        <div className="mt-8 text-center">
          <p className="text-foreground/50 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary-gold hover:underline">Sign Up</Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
