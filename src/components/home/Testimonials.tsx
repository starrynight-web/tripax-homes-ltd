"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";

const testimonials = [
  {
    id: 1,
    name: "Farhan Ahmed",
    role: "Homeowner",
    project: "TRIPAX PORTIA, Gulshan 1",
    quote:
      "Investing in TRIPAX PORTIA was the best decision of our lives. The architectural detail, the quality of finishes, and the sheer prestige of the location exceeded every expectation we had. The Tripax team's professionalism from the first consultation to handover was truly exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Property Investor",
    project: "TRIPAX VERONA, Banani",
    quote:
      "I have invested in several real estate projects across Dhaka, but the transparency and commitment to quality at Tripax Homes stands apart. TRIPAX VERONA delivered on every promise made at signing. I have already referred three of my colleagues to them.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rakibul Islam",
    role: "Business Owner",
    project: "TRIPAX DESDEMONA, Baridhara",
    quote:
      "For our commercial expansion, we needed a developer who truly understood the demands of modern executive workspace. The DESDEMONA project is an architectural statement. Our clients are always impressed. Tripax Homes delivered a world-class product.",
    rating: 5,
  },
  {
    id: 4,
    name: "Dr. Kamrun Nahar",
    role: "Physician & Homeowner",
    project: "TRIPAX OTHELLO, Uttara",
    quote:
      "The apartment at TRIPAX OTHELLO is everything we dreamed of for our family. The space planning is intelligent, the natural light is beautiful, and the build quality is superb. We felt valued and well-informed throughout the entire purchasing process.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-primary overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <RevealHeading
              tag="p"
              className="text-accent font-montserrat font-bold text-xs tracking-[0.3em] uppercase mb-4"
              color="#ffffff"
              delay={0.1}
            >
              Client Testimonials
            </RevealHeading>
            <RevealHeading
              tag="h2"
              className="text-3xl md:text-4xl font-montserrat font-bold text-white leading-tight uppercase tracking-wide max-w-xl"
              color="#ffffff"
              delay={0.3}
            >
              Trusted by those who demand{" "}
              <span className="text-accent">the finest</span>
            </RevealHeading>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Quote */}
            <div className="lg:col-span-8">
              <Quote
                size={48}
                className="text-accent/40 mb-6 fill-accent/20"
              />
              <blockquote className="text-xl md:text-2xl font-jakarta text-white/90 leading-relaxed font-light italic mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-accent/30 to-white/10 border border-white/10 flex items-center justify-center font-montserrat font-bold text-white text-xl mb-4">
                {t.name.charAt(0)}
              </div>
              <h4 className="font-montserrat font-bold text-white text-lg">
                {t.name}
              </h4>
              <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">
                {t.role}
              </p>
              <p className="text-white/40 text-xs font-jakarta mt-2 text-right">
                {t.project}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-accent"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
