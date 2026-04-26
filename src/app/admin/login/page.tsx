"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D0B] flex items-center justify-center p-4 font-jakarta selection:bg-accent/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Top Branding */}
        <div className="flex flex-col items-center mb-10 text-center">
          <Link href="/" className="mb-6 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-to-br from-accent to-highlight rounded-2xl flex items-center justify-center text-primary shadow-[0_0_40px_rgba(242,205,19,0.2)]"
            >
              <span className="font-montserrat font-bold text-3xl">T</span>
            </motion.div>
          </Link>
          <h1 className="font-montserrat font-bold text-white text-3xl tracking-tight mb-2">
            Admin <span className="text-accent">Portal</span>
          </h1>
          <p className="text-white/40 text-sm font-medium tracking-wide">
            Secure access for Tripax Homes administrators.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="space-y-6">
            <p className="text-white/60 text-sm text-center mb-8">
              Google OAuth 2.0 integration is coming soon. For now, you can access the dashboard using the demo mode.
            </p>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                >
                  <ShieldAlert size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs leading-relaxed font-medium">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              onClick={() => {
                document.cookie = "demo_admin=true; path=/; max-age=86400";
                router.push("/admin");
                router.refresh();
              }}
              className="w-full py-4 bg-accent hover:bg-highlight text-primary rounded-2xl font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-[0_10px_30px_rgba(242,205,19,0.15)] hover:shadow-[0_15px_40px_rgba(242,205,19,0.25)]"
            >
              <ShieldCheck size={18} />
              <span>Login as Demo Admin</span>
              <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex items-center justify-between px-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Website
          </Link>
          <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            v2.4.0 Stable
          </span>
        </div>
      </motion.div>
    </div>
  );
}
