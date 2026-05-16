import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoMap from "@/components/contact/ContactInfoMap";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { Metadata } from "next";

import { getSiteConfig } from "@/app/actions/config";

export const metadata: Metadata = {
  title: "Contact Us | Tripax Homes Ltd.",
  description: "Get in touch with Tripax Homes Ltd. for premium real estate consultations, land development partnerships, and luxury apartment inquiries in Dhaka.",
};

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main className="flex-1">
        <ContactHero />
        <ContactInfoMap config={config} />
        <ContactFormSection />
      </main>
      <Footer config={config} />
    </>
  );
}
