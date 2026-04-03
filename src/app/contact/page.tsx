import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoMap from "@/components/contact/ContactInfoMap";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tripax Homes Ltd.",
  description: "Get in touch with Tripax Homes Ltd. for premium real estate consultations, land development partnerships, and luxury apartment inquiries in Dhaka.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactHero />
        <ContactInfoMap />
        <ContactFormSection />
      </main>
      <Footer />
    </>
  );
}
