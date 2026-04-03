import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import FaqHero from "@/components/faq/FaqHero";
import FaqContent from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Tripax Homes Ltd.",
  description:
    "Everything you need to know about Tripax multi-story land sharing, apartments for sale, construction process, and architectural excellence in Dhaka.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <FaqHero />
      <FaqContent />
      <Footer />
    </main>
  );
}
