"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { login } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("pass", password);

      const result = await login(formData);

      if (result?.error) {
        setError(result.error);
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
          
          <form onSubmit={handleLogin} className="space-y-6">
            <p className="text-white/60 text-xs text-center mb-6">
              Enter your administrative credentials to continue.
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

            <div className="space-y-4">
              {/* ID Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Admin ID</label>
                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-accent transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter ID"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-accent transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent hover:bg-highlight text-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-[0_10px_30px_rgba(242,205,19,0.15)] hover:shadow-[0_15px_40px_rgba(242,205,19,0.25)]"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Authenticate</span>
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
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
            Secure Portal v3.0
          </span>
        </div>
      </motion.div>
    </div>
  );
}
