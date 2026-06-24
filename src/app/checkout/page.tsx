"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import GlassCard from "@/components/GlassCard";
import PremiumButton from "@/components/PremiumButton";
import {
  ShieldCheck,
  User,
  Globe,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ChevronRight,
  CheckCircle2,
  Wallet,
  ArrowLeft,
  Camera,
  Info,
  MapPin
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PAYMENT_PROVIDERS, PaymentProvider } from "@/types/payment";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getTotal, getDiscountedTotal, coupon } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [ign, setIgn] = useState("");
  const [edition, setEdition] = useState<"java" | "bedrock">("java");
  const [isValidating, setIsValidating] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Identity, 2: Payment Method, 3: Confirmation/Manual
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  const regions = ["Global", "India", "Bangladesh", "Pakistan"];
  const filteredProviders = PAYMENT_PROVIDERS.filter(p =>
    selectedRegion === "Global" ? p.regions.includes("Global") : p.regions.includes(selectedRegion) || p.regions.includes("Global")
  );

  const validateIGN = async () => {
    if (!ign) return;
    setIsValidating(true);
    setError("");
    setUserData(null);
    setImageError(false);
    setImageLoading(true);

    const javaRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const bedrockRegex = /^\.?[a-zA-Z0-9_ ]{3,16}$/;

    const isValid = edition === "java" ? javaRegex.test(ign) : bedrockRegex.test(ign);

    if (!isValid) {
      setError(edition === "java"
        ? "Invalid Java IGN (3-16 chars, alphanumeric/underscores)"
        : "Invalid Bedrock IGN (Supports leading .)");
      setIsValidating(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      setUserData({
        username: ign,
        uuid: edition === "java" ? "069a79f4-44e9-4726-a5be-fca90e38aaf5" : "Bedrock-ID",
        head: edition === "java"
          ? `https://cravatar.eu/helmhead/${ign}/128.png`
          : "https://cravatar.eu/helmhead/Steve/128.png"
      });
      setIsValidating(false);
    }, 1000);
  };

  const handleProceedToPayment = () => {
    if (userData) setStep(2);
  };

  const handleSelectProvider = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
    setStep(3);
  };

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    // Mock processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (!mounted) return null;

  if (paymentSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>
        <h1 className="text-5xl font-oswald font-bold text-white mb-4 uppercase">Order Submitted!</h1>
        <p className="text-foreground/60 text-lg max-w-md mb-12">
          {selectedProvider?.type === 'MANUAL'
            ? "Your payment is awaiting verification. Please allow up to 12 hours for processing."
            : "Your payment was successful! Your items will be delivered in-game within minutes."}
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard"><PremiumButton variant="gold">View Dashboard</PremiumButton></Link>
          <Link href="/"><PremiumButton variant="glass">Back Home</PremiumButton></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      {/* Checkout Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          {step > 1 && (
            <button onClick={() => setStep((step - 1) as any)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-4xl font-oswald font-bold text-white uppercase tracking-tight">Secure Checkout</h1>
        </div>
        <div className="hidden md:flex gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
                step === s ? "bg-primary-gold text-navy-default glow-gold" : step > s ? "bg-green-500 text-white" : "bg-white/5 text-foreground/20"
              )}>
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest font-bold",
                step >= s ? "text-white" : "text-foreground/20"
              )}>
                {s === 1 ? "Identity" : s === 2 ? "Payment" : "Confirm"}
              </span>
              {s < 3 && <div className="w-12 h-[1px] bg-white/10 ml-2"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-oswald text-primary-gold uppercase tracking-widest flex items-center gap-3">
                  <User size={20} /> Minecraft Identity
                </h2>

                <div className="flex gap-4 p-1 bg-white/5 rounded-lg max-w-sm">
                  <button onClick={() => { setEdition("java"); setUserData(null); }} className={cn("flex-1 py-2 rounded-md font-oswald uppercase text-[10px] tracking-widest transition-all", edition === "java" ? "bg-white/10 text-white shadow-lg" : "text-foreground/40 hover:text-white")}>Java Edition</button>
                  <button onClick={() => { setEdition("bedrock"); setUserData(null); }} className={cn("flex-1 py-2 rounded-md font-oswald uppercase text-[10px] tracking-widest transition-all", edition === "bedrock" ? "bg-white/10 text-white shadow-lg" : "text-foreground/40 hover:text-white")}>Bedrock Edition</button>
                </div>

                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary-gold transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder={edition === "java" ? "Enter Java Username" : "Enter Bedrock Username (.Player)"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-28 text-white focus:outline-none focus:border-primary-gold/50 focus:bg-white/10 transition-all text-lg"
                    value={ign}
                    onChange={(e) => setIgn(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && validateIGN()}
                  />
                  <button onClick={validateIGN} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-gold text-navy-default px-6 py-2.5 rounded-xl text-xs font-bold uppercase hover:scale-105 active:scale-95 transition-all shadow-lg font-oswald">Verify</button>
                </div>

                {error && <div className="flex items-center gap-3 text-red-500 text-sm bg-red-500/10 p-5 rounded-2xl border border-red-500/20"><AlertCircle size={18} />{error}</div>}

                {isValidating && <div className="flex items-center justify-center p-12 bg-white/5 rounded-2xl border border-white/10"><Loader2 className="animate-spin text-primary-gold" size={40} /></div>}

                {userData && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-primary-gold/30 rounded-3xl p-8 flex items-center gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-gold/10 rounded-full blur-[80px] -mr-24 -mt-24 transition-opacity group-hover:opacity-100 opacity-50"></div>
                    <div className="relative w-24 h-24 bg-navy-dark rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
                      {imageLoading && <div className="absolute inset-0 flex items-center justify-center bg-navy-dark z-10"><Loader2 className="animate-spin text-primary-gold/50" size={20} /></div>}
                      {imageError ? <ImageIcon className="text-foreground/20" size={32} /> : (
                        <Image src={userData.head} alt="Skin" fill className={cn("object-contain transition-opacity duration-500", imageLoading ? "opacity-0" : "opacity-100")} onLoad={() => setImageLoading(false)} onError={() => { setImageError(true); setImageLoading(false); }} unoptimized={true} />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-4xl font-oswald text-white uppercase font-bold tracking-tight">{userData.username}</h4>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary-gold/20">
                            {edition} Edition
                         </div>
                         <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                         <p className="text-[10px] text-foreground/30 font-mono tracking-wider">{userData.uuid}</p>
                      </div>
                    </div>
                    <div className="bg-green-500/10 text-green-500 p-4 rounded-2xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                       <ShieldCheck size={32} />
                    </div>
                  </motion.div>
                )}
              </div>

              <PremiumButton variant="gold" className={cn("w-full py-6 text-xl shadow-2xl", !userData && "opacity-50 grayscale pointer-events-none")} disabled={!userData} onClick={handleProceedToPayment}>
                Select Payment Method <ChevronRight className="inline-block ml-2" size={24} />
              </PremiumButton>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-oswald text-primary-gold uppercase tracking-widest flex items-center gap-3">
                  <Wallet size={20} /> Payment Gateway
                </h2>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                   <MapPin size={14} className="text-primary-gold" />
                   <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-transparent text-white text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
                   >
                     {regions.map(r => <option key={r} value={r}>{r}</option>)}
                   </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleSelectProvider(provider)}
                    className="group relative flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-primary-gold/50 hover:bg-white/10 transition-all text-left overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-16 h-12 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all bg-navy-dark rounded-xl border border-white/5">
                       <div className="text-white font-bold font-oswald text-xl">{provider.name.charAt(0)}</div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-oswald uppercase font-bold tracking-wide">{provider.name}</h4>
                        <span className={cn(
                          "text-[8px] px-2 py-0.5 rounded-full uppercase font-bold border",
                          provider.type === 'API' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        )}>
                          {provider.type === 'API' ? 'Instant' : 'Manual'}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground/40 mt-1 line-clamp-1">{provider.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-gold group-hover:text-navy-default transition-all">
                       <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && selectedProvider && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-xl font-oswald text-primary-gold uppercase tracking-widest flex items-center gap-3">
                {selectedProvider.type === 'API' ? <Globe size={20} /> : <Camera size={20} />}
                {selectedProvider.type === 'API' ? 'Final Payment Step' : 'Manual Fund Transfer'}
              </h2>

              {selectedProvider.type === 'MANUAL' ? (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 p-10 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-primary-gold/5">
                       <Wallet size={120} />
                    </div>
                    <h4 className="text-white font-oswald uppercase mb-6 text-xl font-bold tracking-tight border-b border-white/5 pb-4">Transfer Details</h4>
                    <p className="text-foreground/70 mb-10 leading-relaxed italic bg-navy-dark/50 p-6 rounded-2xl border border-white/5">{selectedProvider.instructions}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase text-foreground/40 tracking-widest font-bold ml-2">Transaction ID / Reference</label>
                        <input
                          type="text"
                          placeholder="Enter your TXID"
                          className="w-full bg-navy-dark border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary-gold/50 focus:ring-4 focus:ring-primary-gold/5 transition-all font-mono"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase text-foreground/40 tracking-widest font-bold ml-2">Payment Proof</label>
                        <div className="w-full h-[60px] bg-navy-dark border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-[10px] text-foreground/30 uppercase cursor-pointer hover:bg-white/5 hover:border-primary-gold/30 transition-all gap-2 font-bold tracking-widest group">
                           <Camera size={16} className="group-hover:text-primary-gold transition-colors" />
                           Upload Screenshot
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-xs text-orange-500/70 italic">
                    <Info size={24} className="text-orange-500 shrink-0" />
                    Staff manual verification required. Payments are usually verified within 6-12 hours. Ensure your Transaction ID is correct to prevent rejection.
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 p-16 rounded-3xl text-center space-y-8 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-premium-gradient"></div>
                   <div className="w-24 h-24 bg-primary-gold/10 rounded-full flex items-center justify-center text-primary-gold mx-auto mb-4 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                      <Globe size={48} />
                   </div>
                   <div>
                     <h3 className="text-4xl font-oswald text-white uppercase font-bold mb-4">Secure Redirect</h3>
                     <p className="text-foreground/40 max-w-sm mx-auto text-sm leading-relaxed">You will be redirected to {selectedProvider.name} to complete your ₹{getDiscountedTotal()} payment via their secure platform.</p>
                   </div>
                </div>
              )}

              <PremiumButton
                variant="gold"
                className="w-full py-6 text-2xl shadow-2xl"
                disabled={isProcessing || (selectedProvider.type === 'MANUAL' && !transactionId)}
                onClick={handleSubmitPayment}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-4">
                    <Loader2 size={28} className="animate-spin" />
                    Validating...
                  </div>
                ) : (
                  selectedProvider.type === 'API' ? `Proceed to Pay ₹${getDiscountedTotal()}` : "Confirm & Submit Transaction"
                )}
              </PremiumButton>
            </motion.div>
          )}

        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
           <GlassCard className="p-10 sticky top-28 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                <h3 className="text-2xl font-oswald text-white uppercase font-bold">Checkout</h3>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[8px] text-white font-bold uppercase tracking-widest">Secure</span>
                </div>
              </div>

              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-6 group">
                    <div className="flex gap-4">
                       <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary-gold/30 transition-colors shadow-inner">
                          {item.type === 'rank' ? <span className="text-xl">💎</span> : <span className="text-xl">🔑</span>}
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-white text-xs font-oswald uppercase tracking-tight font-bold group-hover:text-primary-gold transition-colors">{item.name}</p>
                          <p className="text-[10px] text-foreground/40 uppercase font-bold mt-0.5">Quantity: {item.quantity}</p>
                       </div>
                    </div>
                    <div className="flex flex-col justify-center text-right">
                       <p className="text-white font-bold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                 <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">
                    <span>Base Amount</span>
                    <span className="text-white">₹{getTotal()}</span>
                 </div>
                 {coupon && (
                   <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-green-500 font-bold">
                      <span>Discount ({coupon.code})</span>
                      <span>-₹{getTotal() - getDiscountedTotal()}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-3xl font-oswald pt-6 border-t border-white/5">
                    <span className="text-foreground/30 uppercase">Final</span>
                    <span className="text-primary-gold font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]">₹{getDiscountedTotal()}</span>
                 </div>
              </div>

              {userData && (
                <div className="mt-10 pt-10 border-t border-white/10">
                   <div className="flex items-center gap-5 bg-navy-dark/80 p-4 rounded-2xl border border-white/10 shadow-inner group">
                      <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-primary-gold/50 transition-colors">
                         <Image src={userData.head} alt="Mini Head" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-foreground/40 font-bold tracking-widest mb-0.5">Payment For</p>
                        <p className="text-sm text-white font-mono uppercase font-bold tracking-tighter">{userData.username}</p>
                      </div>
                   </div>
                </div>
              )}
           </GlassCard>

           <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-[9px] text-foreground/40 uppercase tracking-[0.4em] font-bold">
                <Globe size={14} /> 256-Bit SSL Secured
              </div>
              <div className="flex justify-center gap-5 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-navy-default">VISA</div>
                <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-navy-default">MC</div>
                <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-navy-default">PP</div>
                <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-navy-default">UPI</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
