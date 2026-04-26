"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { createConsultation } from "@/app/actions/booking";

export function ConsultationCTA() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createConsultation({
        ...form,
        date: new Date().toISOString(), // Default to today
        type: "Private Consultation",
      });
      setSuccess(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl items-stretch">
          {/* Left Image */}
          <div className="relative min-h-100 hidden md:block overflow-hidden">
            <Image
              src="/images/projects/Interior/int_living_room_1775442400972.png"
              alt="Luxurious apartment interior"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-transparent" />
          </div>

          {/* Right Form Card */}
          <div className="bg-white p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            {success ? (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-montserrat font-bold text-slate-900 mb-4 uppercase tracking-tight">Request Logged</h3>
                <p className="text-slate-500 font-jakarta max-w-sm mx-auto mb-10">
                  Our private relationship concierge will contact you shortly to confirm your consultation slot.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-10 py-4 bg-primary text-white font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <RevealHeading
                  tag="h2"
                  className="text-2xl md:text-3xl font-montserrat font-bold text-primary uppercase tracking-wider mb-10"
                  color="#11261A"
                  delay={0.1}
                >
                  Book A <span className="text-accent">Private</span> Consultation
                </RevealHeading>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      type="text"
                      placeholder="Full Name*"
                      className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      type="tel"
                      placeholder="Phone Number*"
                      className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <input
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      type="email"
                      placeholder="Email Address"
                      className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <select 
                      required
                      value={form.time}
                      onChange={e => setForm({...form, time: e.target.value})}
                      className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent text-slate-500 appearance-none"
                    >
                      <option value="">Select A Time</option>
                      <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                      <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                      <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                    </select>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start pt-4">
                    <button
                      disabled={loading}
                      type="submit"
                      className="border border-primary text-primary px-10 py-4 font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 min-w-[160px]"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit"}
                    </button>

                    <Link
                      href="tel:+8801234567890"
                      className="flex items-center gap-3 px-8 py-4 font-montserrat font-bold text-xs tracking-widest uppercase text-white transition-all hover:opacity-90 hover:scale-105 bg-accent"
                    >
                      <Phone size={16} />
                      Enquire Now
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

