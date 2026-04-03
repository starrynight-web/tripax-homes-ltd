import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <StatsBand />
        <FeaturedCarousel />
        <ConsultationCTA />
      </main>
      <Footer />
    </>
  );
}
