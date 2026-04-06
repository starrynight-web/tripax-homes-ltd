"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  PackageOpen,
  LayoutTemplate,
  FlaskConical,
  X,
  Eye,
  EyeOff,
  ShieldAlert,
  Lock,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const DEMO_EMAIL    = "demo@tripaxhomes.com";
const DEMO_PASSWORD = "Demo@1234";
const SESSION_KEY   = "tripax_demo_auth";

const NAV_ITEMS = [
  { icon: LayoutDashboard, name: "Overview",   href: "/demo-admin" },
  { icon: FolderKanban,    name: "Projects",   href: "/demo-admin/projects" },
  { icon: MessageSquare,   name: "Inquiries",  href: "/demo-admin/inquiries" },
  { icon: PackageOpen,     name: "Resources",  href: "/demo-admin/resources" },
  { icon: LayoutTemplate,  name: "CMS Config", href: "/demo-admin/config" },
  { icon: Settings,        name: "Settings",   href: "/demo-admin/settings" },
];

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate a brief API call
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "true");
        onLogin();
      } else {
        setError("Invalid credentials. Use the demo credentials shown below.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 font-jakarta">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Demo Badge */}
        <div className="flex justify-center mb-8">
          <span className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FlaskConical size={13} />
            Demo Admin Panel
          </span>
        </div>

        {/* Card */}
        <div className="bg-primary border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-lg">
                <span className="font-montserrat font-bold text-xl">T</span>
              </div>
              <div>
                <span className="font-montserrat font-bold text-white block leading-none">TRIPAX</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Admin Portal</span>
              </div>
            </div>
            <h1 className="font-montserrat font-bold text-white text-2xl">Sign In</h1>
            <p className="text-slate-400 text-sm mt-1">Access the demo admin panel.</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Demo Credentials Box */}
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <ShieldAlert size={12} />
                Demo Credentials
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-amber-400/70 shrink-0" />
                  <span className="text-slate-300 text-xs font-mono select-all">{DEMO_EMAIL}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-amber-400/70 shrink-0" />
                  <span className="text-slate-300 text-xs font-mono select-all">{DEMO_PASSWORD}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={DEMO_EMAIL}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs font-jakarta flex items-center gap-1.5"
                  >
                    <ShieldAlert size={12} />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent text-primary rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-highlight transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing In…
                  </>
                ) : "Sign In to Demo"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DemoAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    setIsAuth(sessionStorage.getItem(SESSION_KEY) === "true");
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuth(false);
    router.push("/demo-admin");
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
      </div>
    );
  }

  // Not authenticated — show login gate
  if (!isAuth) {
    return <LoginGate onLogin={() => setIsAuth(true)} />;
  }

  // Authenticated — render full admin layout
  return (
    <div className="flex min-h-screen bg-slate-50 font-jakarta">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white/60 border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/5">
          <Link href="/demo-admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-xl">
              <span className="font-montserrat font-bold text-xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-white tracking-tight leading-none">TRIPAX</span>
              <span className="font-montserrat text-[10px] text-white/50 uppercase tracking-widest mt-1">Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Demo Mode Badge */}
        <div className="mx-6 mt-4 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2">
          <FlaskConical size={14} className="text-amber-400 shrink-0" />
          <span className="text-amber-400 text-[11px] font-bold uppercase tracking-widest">Demo Mode</span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "bg-white/10 text-accent shadow-lg"
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-accent" : "text-white/40 group-hover:text-accent")} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-white/5 hover:text-white transition-all text-white/60"
          >
            <X size={20} className="text-white/40" />
            <span className="font-medium text-sm">Exit Demo</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-white/60"
          >
            <LogOut size={20} className="text-white/40" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-72">
        {/* Demo Banner */}
        <div className="bg-accent text-primary px-6 py-2 text-center font-jakarta text-[11px] font-bold tracking-wide flex items-center justify-center gap-2">
          <FlaskConical size={13} />
          You are viewing the Demo Admin Panel — changes are not persisted.
        </div>

        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
          <h2 className="font-montserrat font-bold text-lg text-slate-900 capitalize">
            {NAV_ITEMS.find((i) => i.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right flex flex-col">
              <span className="text-xs font-bold text-slate-900">Demo User</span>
              <span className="text-[10px] text-slate-500">demo@tripaxhomes.com</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-600">
              D
            </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
