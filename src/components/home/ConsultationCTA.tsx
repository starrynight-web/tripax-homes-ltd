import React from "react";
import Image from "next/image";

export function ConsultationCTA() {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Subtle topographic background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl items-stretch">
          {/* Left Image */}
          <div className="relative min-h-100 hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1600607687644-aac4c15ceea1?q=80&w=2670&auto=format&fit=crop"
              alt="Luxurious interior"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Form Card */}
          <div className="bg-white p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary uppercase tracking-wider mb-10">
              Book A <span className="text-accent">Private</span> Consultation
            </h2>

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
              <button
                type="submit"
                className="mt-6 border border-primary text-primary px-10 py-4 font-montserrat font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-colors w-max"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
