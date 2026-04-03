"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Home, Info, Briefcase, Wrench, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: MessageCircle },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
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

        {/* Call CTA — Right */}
        <a
          href="tel:+880-1234-567890"
          className={cn(
            "hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border font-jakarta font-semibold text-sm transition-all shrink-0",
            isScrolled
              ? "border-primary text-primary hover:bg-primary hover:text-white"
              : "border-accent text-accent hover:bg-accent hover:text-primary"
          )}
        >
          <Phone size={15} />
          Enquire Now
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
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
            className="absolute top-full left-0 right-0 bg-white border-b border-primary/10 shadow-xl md:hidden"
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
              <a
                href="tel:+880-1234-567890"
                className="mt-3 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-accent font-montserrat font-bold text-sm tracking-wide"
              >
                <Phone size={15} />
                Enquire Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
