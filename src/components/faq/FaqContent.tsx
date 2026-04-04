"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/ui/RevealHeading";

const faqData = [
  {
    category: "Joint Ventures & Land Ownership",
    id: "land-ownership",
    questions: [
      {
        q: "What is the Tripax Land-Sharing Model?",
        a: "It's a joint venture agreement where land owners provide the land, and Tripax Homes handles the complete construction, registration, and marketing. Profits or floor space are shared based on a pre-agreed ratio tailored to both parties' benefits.",
      },
      {
        q: "How do I partner with Tripax Homes as a land owner?",
        a: "You can request a 'Private Consultation' via our website. Our expert team will visit your site, conduct a thorough feasibility study, and propose a customized joint-venture model that maximizes your property's value.",
      },
      {
        q: "What security do I have as a land owner?",
        a: "Every partnership is bound by a legally registered agreement following the Real Estate Development and Management Act. We ensure complete transparency and milestone-based reporting throughout the project lifecycle.",
      },
    ],
  },
  {
    category: "Construction & Quality Standards",
    id: "construction",
    questions: [
      {
        q: "What is the average timeline for project completion?",
        a: "While timelines vary by project scale, a typical luxury residential project takes 36 to 48 months from the date of final design approval and receipt of all necessary regulatory permits.",
      },
      {
        q: "What quality standards do you follow?",
        a: "We strictly adhere to the BNBC (Bangladesh National Building Code) and international construction safety standards. We use premium 72.5-grade steel, ready-mix concrete, and global-standard finishings for every structural masterpiece.",
      },
      {
        q: "Do you offer earthquake-resistant design?",
        a: "Yes. All our buildings are designed by top-tier structural engineers to be earthquake-resistant, following the latest seismic safety guidelines for Dhaka and surrounding regions.",
      },
    ],
  },
  {
    category: "Payments & Ownership Structures",
    id: "payments",
    questions: [
      {
        q: "What is the typical payment structure for purchasing an apartment?",
        a: "We offer a flexible structure starting with a down payment (typically around 30%), followed by interest-free monthly installments during the construction period. Final payment is usually settled upon handover.",
      },
      {
        q: "Can I customize my apartment layout before completion?",
        a: "We offer 'Bespoke Interiors' for early-stage buyers. Depending on the construction phase, you can consult with our design team to customize layouts, flooring, and electrical configurations to suit your refined taste.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. All costs, including utility connection fees and registration charges, are clearly outlined in the initial agreement to ensure complete financial clarity for our clients.",
      },
    ],
  },
  {
    category: "Legal Compliances & Documentation",
    id: "legal",
    questions: [
      {
        q: "Are all Tripax projects RAJUK approved?",
        a: "Absolutely. Every Tripax project secures full approval from RAJUK (or the relevant authority like the Cantonment Board) and environmental, fire safety, and WASA clearances before a single brick is laid.",
      },
      {
        q: "How is the registration process handled?",
        a: "Our dedicated legal team manages the entire mutation and registration process, ensuring all documentation is handled professionally and handed over to you upon project completion.",
      },
    ],
  },
];

export default function FaqContent() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-32 space-y-2">
              <RevealHeading
                tag="p"
                className="text-secondary font-montserrat font-bold text-[10px] tracking-[0.4em] uppercase mb-6 opacity-60"
                color="#11261A"
                delay={0.1}
              >
                Categories
              </RevealHeading>
              {faqData.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="block p-4 rounded-xl font-montserrat font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-slate-50 transition-all border border-transparent hover:border-primary/10"
                >
                  {cat.category}
                </a>
              ))}
            </nav>
          </aside>

          {/* FAQ Sections */}
          <div className="lg:w-3/4 space-y-24">
            {faqData.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <RevealHeading
                  tag="h2"
                  className="text-2xl font-montserrat font-bold text-primary mb-10 uppercase tracking-wide border-l-8 border-accent pl-6"
                  color="#11261A"
                  delay={0.2}
                >
                  {cat.category}
                </RevealHeading>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {cat.questions.map((item, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`${cat.id}-${idx}`}
                      className="border border-slate-200 rounded-2xl px-6 transition-all data-[state=open]:border-accent data-[state=open]:shadow-lg bg-white"
                    >
                      <AccordionTrigger className="hover:no-underline py-6 text-left font-montserrat font-bold text-primary text-sm md:text-base uppercase tracking-tight group">
                        <span className="group-hover:text-accent transition-colors">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-8 text-slate-600 font-jakarta leading-relaxed text-sm md:text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* Still have questions CTA */}
            <div className="mt-16 p-10 md:p-14 rounded-3xl bg-primary text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-32 -translate-y-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 mx-auto md:mx-0">
                    <MessageCircle size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4 uppercase">
                    Still Have <span className="text-accent">Questions?</span>
                  </h3>
                  <p className="text-white/70 font-jakarta text-sm md:text-base max-w-md">
                    Our luxury property consultants are ready to provide any additional information you need regarding our flagship developments.
                  </p>
                </div>
                
                <Link
                  href="/contact"
                  className="group flex items-center gap-4 bg-white text-primary px-8 py-5 rounded-full font-montserrat font-bold text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all shrink-0 shadow-xl"
                >
                  Contact Us Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
