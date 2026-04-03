"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden bg-primary">
      {/* Background: full-viewport image with dark overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay — heavier on left so text reads cleanly */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-primary/20 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent z-10" />
        {/* Hero background image */}
        <div
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1545324418-f1d3ac157490?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"
          style={{ backgroundPosition: "center 40%" }}
        />
      </div>

      {/* Bottom navigation bar — Edison style project nav */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-primary/80 backdrop-blur-md border-t border-white/5">
        <div className="container mx-auto px-6">
          <ul className="flex items-center gap-0 overflow-x-auto">
            {[
              { label: "Explore Projects", href: "/projects", isPrimary: true },
              { label: "Ongoing", href: "/projects?status=ongoing" },
              { label: "Handed Over", href: "/projects?status=handed-over" },
              { label: "Upcoming", href: "/projects?status=upcoming" },
              { label: "Ready", href: "/projects?status=ready" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-4 text-xs font-montserrat font-bold tracking-widest transition-colors whitespace-nowrap ${
                    item.isPrimary
                      ? "text-accent border-r border-white/10 uppercase"
                      : "text-white/70 hover:text-accent border-r border-white/10 uppercase"
                  }`}
                >
                  {item.isPrimary && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M3 9.5L12 3l9 6.5V21H15v-5H9v5H3V9.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  )}
                  {item.label}
                  {item.isPrimary && <ArrowRight size={12} className="shrink-0" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Main Headline — Reduced significantly for minimalism */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white leading-tight mb-8 uppercase tracking-[0.05em]"
          >
            Crafting Homes
            <br />
            <span
              className="gradient-text"
              style={{ backgroundImage: "var(--bg-gradient-accent)" }}
            >
              Beyond Excellence.
            </span>
          </motion.h1>

          {/* Description — Slightly smaller and more translucent */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-sm md:text-base text-slate-300/80 font-jakarta leading-relaxed mb-10 max-w-lg"
          >
            From flagship residential projects to exclusive land development
            partnerships, Tripax Homes Ltd. delivers architectural
            masterpieces tailored for the connoisseurs of fine living.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-start gap-5"
          >
            <Link
              href="/projects"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-montserrat font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "var(--bg-gradient-accent)" }}
            >
              View Projects
              <ArrowRight size={16} />
            </Link>

            <button className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <Play className="text-white fill-white ml-0.5" size={18} />
              </div>
              <span className="text-white/80 font-jakarta font-semibold text-sm tracking-widest uppercase group-hover:text-accent transition-colors">
                Land Partnerships
              </span>
            </button>
          </motion.div>
        </div>

        {/* Hero Stats — Now inside the container to align with right edge */}
        <div className="hidden lg:flex absolute bottom-24 right-6 gap-12 z-20 pointer-events-auto">
          {[
            { label: "Years of Legacy", val: "15+" },
            { label: "Signature Projects", val: "42" },
            { label: "Happy Families", val: "1200+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.12 }}
              className="text-right"
            >
              <div className="text-4xl font-montserrat font-extrabold text-white leading-none mb-1">
                {stat.val}
              </div>
              <div className="text-[9px] font-jakarta font-bold text-accent tracking-[0.22em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
