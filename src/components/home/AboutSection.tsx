import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealHeading } from "@/components/ui/RevealHeading";

export function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Image with play button overlay ── */}
          <div className="relative">
            {/* Main image */}
            <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
                alt="Tripax Homes — Redefining Your Standard of Living"
                fill
                className="object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-primary/20" />

              {/* ── Play Button Overlay (Edison-style) ── */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group cursor-pointer">
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                  {/* Button */}
                  <div className="relative w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/40 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-primary ml-1"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent bar */}
            <div className="absolute -left-4 top-8 bottom-8 w-1 rounded-full bg-accent" />
          </div>

          {/* ── Right: Text Content ── */}
          <div>
            {/* Gold subtitle — Reveal Effect */}
            <RevealHeading
              tag="p"
              className="text-accent font-montserrat font-bold text-xs tracking-[0.3em] uppercase mb-4"
              color="#11261A"
              delay={0.1}
            >
              About Us
            </RevealHeading>

            {/* Main heading — Reveal Effect */}
            <RevealHeading
              tag="h2"
              className="text-2xl md:text-3xl font-montserrat font-bold text-primary leading-tight mb-6 uppercase tracking-wide"
              color="#11261A"
              delay={0.3}
            >
              Redefining your standard of living
            </RevealHeading>

            {/* Body text — Reduced scale */}
            <div className="space-y-4 font-jakarta text-slate-600 leading-relaxed text-justify mb-8 text-sm md:text-base">
              <p>
                Tripax Homes Ltd. was founded with the vision to enhance aspects of life
                for people by providing powerful brands, reliable projects and a wide
                range of premium residential projects. We ventured deep into the real estate
                sector with a dedicated team committed to merging value and innovation in
                Dhaka&apos;s vibrant property landscape.
              </p>
              <p>
                Through considerable focus on design, structural dimension, and feasibility
                in the sense of space and resource conservation, we deliver you optimum
                support in residential and commercial accommodation. We assure you to be
                your most reliable developer in Dhaka in terms of integrity and credibility.
              </p>
            </div>

            {/* Edison-style learn more CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-4 font-montserrat font-bold text-sm uppercase tracking-widest text-primary group"
            >
              <span className="border-b-2 border-accent pb-0.5 group-hover:text-accent transition-colors">
                Learn More
              </span>
              <span className="w-10 h-px bg-primary group-hover:bg-accent group-hover:w-16 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
