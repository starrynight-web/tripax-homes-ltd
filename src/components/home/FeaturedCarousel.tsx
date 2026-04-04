"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsMock } from "@/data/projectsMock";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { RevealHeading } from "@/components/ui/RevealHeading";

export function FeaturedCarousel() {
  // Use the refined Tripax projects from the main mock data
  const projects = projectsMock;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <RevealHeading
            tag="p"
            className="text-accent font-montserrat font-bold text-xs tracking-[0.3em] uppercase mb-4"
            color="#11261A"
            delay={0.1}
          >
            Featured Projects
          </RevealHeading>
          <RevealHeading
            tag="h2"
            className="text-3xl md:text-4xl font-montserrat font-bold text-primary leading-tight uppercase tracking-wide max-w-2xl"
            color="#11261A"
            delay={0.3}
          >
            Bespoke Enclaves with finesse in architecture and design
          </RevealHeading>
        </div>
        {/* Carousel Navigation Arrows */}
        <div className="hidden md:flex gap-4">
          <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-primary/40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <ChevronLeft size={20} />
          </button>
          <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-primary/40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal scroll container with normalized padding for alignment */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 md:pl-[calc((100vw-min(100vw,1536px))/2+1.5rem)] pb-8 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative shrink-0 w-[85vw] md:w-100 lg:w-112.5 aspect-3/4 snap-center group overflow-hidden bg-slate-100"
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-2 uppercase tracking-wide">
                {project.title}
              </h3>
              <p className="text-white/70 font-jakarta text-[11px] mb-6 uppercase tracking-[0.2em] font-medium">
                {project.region}
              </p>

              {/* Reveal Link to Detail Page */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-4 font-montserrat font-bold text-[10px] uppercase tracking-[0.25em] text-white hover:text-accent transition-colors"
                >
                  <span>Explore</span>
                  <span className="w-12 h-px bg-white/50 group-hover:bg-accent transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
