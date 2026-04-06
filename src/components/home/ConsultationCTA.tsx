import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";

export function ConsultationCTA() {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Subtle radial background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl items-stretch">
          {/* Left Image */}
          <div className="relative min-h-100 hidden md:block">
            <Image
              src="/images/projects/Interior/int_living_room_1775442400972.png"
              alt="Luxurious apartment interior"
              fill
              className="object-cover"
            />
            {/* Gradient overlay for elegance */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-transparent" />
          </div>

          {/* Right Form Card */}
          <div className="bg-white p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <RevealHeading
              tag="h2"
              className="text-2xl md:text-3xl font-montserrat font-bold text-primary uppercase tracking-wider mb-10"
              color="#11261A"
              delay={0.1}
            >
              Book A <span className="text-accent">Private</span> Consultation
            </RevealHeading>

            <form className="space-y-6 form-minimalist">
              <div>
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
                />
              </div>
              <div>
                <select className="w-full border border-slate-200 p-4 font-jakarta text-sm focus:outline-none focus:border-primary transition-colors bg-transparent text-slate-500 appearance-none">
                  <option value="">Select A Time</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 7PM)</option>
                </select>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start">
                <button
                  type="submit"
                  className="border border-primary text-primary px-10 py-4 font-montserrat font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
                >
                  Submit
                </button>

                {/* Enquire Now — Direct Call Button */}
                <Link
                  href="tel:+8801234567890"
                  className="flex items-center gap-3 px-8 py-4 font-montserrat font-bold text-sm tracking-widest uppercase text-white transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: "var(--bg-gradient-accent)" }}
                >
                  <Phone size={16} />
                  Enquire Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
