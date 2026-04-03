"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-50 relative rounded-3xl overflow-hidden shadow-xl border border-primary/5 flex flex-col lg:flex-row">
          
          {/* Left Side: Image Overlay */}
          <div className="lg:w-2/5 relative h-64 lg:h-auto min-h-100">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Living Space"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
            <div className="absolute inset-x-8 bottom-12 z-10 text-white">
                <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
                    Trusted by many
                </p>
                <h3 className="text-3xl font-montserrat font-bold uppercase leading-tight mb-4 tracking-tight">
                    Experience the <br />
                    <span className="text-accent underline decoration-accent/40 underline-offset-4">Emerald Lifestyle</span>
                </h3>
            </div>
          </div>

          {/* Right Side: Form Container */}
          <div className="lg:w-3/5 p-8 md:p-14 lg:p-20 relative">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-montserrat font-bold text-primary uppercase">Message Sent Successfully!</h2>
                <p className="text-slate-600 font-jakarta max-w-sm">
                  Thank you for reaching out to Tripax Homes. Our sales team will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="font-montserrat font-bold text-xs tracking-widest text-primary uppercase hover:text-accent transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-2">Inquiry Form</span>
                  <h2 className="text-3xl font-montserrat font-bold text-primary uppercase tracking-tight">Write to Us</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required
                      className="w-full bg-white border-b-2 border-slate-200 py-3 px-4 focus:border-accent outline-none font-jakarta text-sm transition-all rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+880 1XXX XXXXXX" 
                      required
                      className="w-full bg-white border-b-2 border-slate-200 py-3 px-4 focus:border-accent outline-none font-jakarta text-sm transition-all rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="example@email.com" 
                      required
                      className="w-full bg-white border-b-2 border-slate-200 py-3 px-4 focus:border-accent outline-none font-jakarta text-sm transition-all rounded-lg shadow-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="How can we help you today?" 
                      required
                      className="w-full bg-white border-b-2 border-slate-200 py-3 px-4 focus:border-accent outline-none font-jakarta text-sm transition-all rounded-lg shadow-sm resize-none"
                    />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={cn(
                    "group relative w-full md:w-auto h-14 min-w-50 bg-primary text-white font-montserrat font-bold text-xs tracking-[0.3em] uppercase rounded-lg overflow-hidden flex items-center justify-center transition-all shadow-xl hover:shadow-accent/20",
                    isSubmitting && "opacity-80 cursor-wait"
                  )}
                >
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-3 transition-colors group-hover:text-primary">
                    {isSubmitting ? "Sending..." : (
                      <>
                        Submit Message
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
