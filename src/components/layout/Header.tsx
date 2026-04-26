"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Phone, 
  Home, 
  Info, 
  Briefcase, 
  MessageCircle, 
  HelpCircle,
  Lock,
  LayoutDashboard,
  Newspaper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Contact", href: "/contact", icon: MessageCircle },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [siteConfig, setSiteConfig] = useState<Record<string, string>>({});
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial session check
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Fetch Site Config
    supabase.from("site_config").select("*").then(({ data }) => {
      if (data) {
        const configMap = data.reduce((acc: any, curr) => ({ ...acc, [curr.key]: curr.value }), {});
        setSiteConfig(configMap);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const ctaNumber = siteConfig.phone_primary || "+880-1234-567890";
  const ctaText = siteConfig.cta_text || "Enquire";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md py-3 border-b border-primary/5"
          : "bg-primary/70 backdrop-blur-sm py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo — Left */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg shadow-md group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.jpg"
              alt="Tripax Homes Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span
            className={cn(
              "font-montserrat font-bold text-xl tracking-tight transition-colors flex flex-col leading-tight",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            TRIPAX
            <span
              className={cn(
                "text-[10px] tracking-[0.35em] font-extrabold -mt-0.5",
                isScrolled ? "text-secondary" : "text-accent"
              )}
            >
              HOMES LTD
            </span>
          </span>
        </Link>

        {/* Desktop Nav — Centered */}
        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "font-jakarta font-medium text-sm tracking-wide transition-all duration-200 relative group",
                isScrolled ? "text-slate-600 hover:text-primary" : "text-white/85 hover:text-accent"
              )}
            >
              {item.name}
              {/* Underline on hover */}
              <span className={cn(
                "absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                isScrolled ? "bg-primary" : "bg-accent"
              )} />
            </Link>
          ))}
        </nav>

        {/* Actions — Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Login/Admin Button */}
          {user ? (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-jakarta font-bold text-[11px] uppercase tracking-widest transition-all",
                isScrolled
                  ? "bg-primary text-white hover:bg-secondary shadow-lg shadow-primary/10"
                  : "bg-accent text-primary hover:bg-white shadow-lg shadow-accent/10"
              )}
            >
              <LayoutDashboard size={14} />
              Admin
            </Link>
          ) : (
            <Link
              href="/admin/login"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full border font-jakarta font-bold text-[11px] uppercase tracking-widest transition-all",
                isScrolled
                  ? "border-primary/20 text-primary hover:bg-primary hover:text-white"
                  : "border-white/20 text-white hover:bg-white hover:text-primary"
              )}
            >
              <Lock size={14} />
              Login
            </Link>
          )}

          {/* Enquire CTA */}
          <a
            href={`tel:${ctaNumber}`}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-jakarta font-bold text-[11px] uppercase tracking-widest transition-all",
              isScrolled
                ? "bg-secondary text-white hover:bg-primary"
                : "bg-white text-primary hover:bg-accent"
            )}
          >
            <Phone size={14} />
            {ctaText}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-primary" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-primary/10 shadow-xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-slate-700 font-jakarta font-medium p-3 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors"
                >
                  <item.icon size={16} className="text-secondary" />
                  {item.name}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                {user ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-secondary text-white font-jakarta font-bold text-xs tracking-widest uppercase"
                  >
                    <LayoutDashboard size={14} />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 text-slate-600 font-jakarta font-bold text-xs tracking-widest uppercase"
                  >
                    <Lock size={14} />
                    Login
                  </Link>
                )}

                <a
                  href={`tel:${ctaNumber}`}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-accent font-jakarta font-bold text-xs tracking-widest uppercase"
                >
                  <Phone size={14} />
                  {ctaText}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
