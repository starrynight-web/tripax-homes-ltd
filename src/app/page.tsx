import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsSection } from "@/components/home/NewsSection";
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
        <NewsSection />
        <Testimonials />
        <ConsultationCTA />
      </main>
      <Footer />
    </>
  );
}
