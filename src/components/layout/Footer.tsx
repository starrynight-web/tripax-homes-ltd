import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <Image
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop"
          alt="Tripax Homes architecture"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-primary/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-24 flex flex-col justify-between min-h-112.5">
        
        {/* Top Section: Logo and Member Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div>
            <Link href="/" className="inline-block mb-10 group">
              <span className="font-montserrat font-bold text-4xl tracking-tight text-white flex flex-col leading-none">
                <span className="text-accent">TRIPAX</span>
                <span className="text-xs tracking-[0.4em] font-extrabold mt-1 text-white/70">
                  HOMES LTD
                </span>
              </span>
            </Link>

            <div className="space-y-4 font-jakarta text-sm tracking-wide text-white/80">
              <p className="uppercase">
                <span className="font-bold text-white mr-2">HOTLINE :</span>
                <a href="tel:+8801234567890" className="hover:text-accent transition-colors">+880 1234 567890</a>
              </p>
              <p className="uppercase">
                <span className="font-bold text-white mr-2">EMAIL :</span>
                <a href="mailto:info@tripaxhomes.com" className="hover:text-accent transition-colors lowercase">info@tripaxhomes.com</a>
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-6 mt-10">
              {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((platform, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={platform}
                  className="text-white hover:text-accent transition-colors"
                >
                  {/* Simplified placeholder visual for social icons */}
                  <span className="text-xs font-montserrat font-bold uppercase tracking-widest">{platform.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:mt-4">
             {/* Placeholder for REHAB / Membership badge as seen in screenshot */}
            <div className="border border-white/20 p-3 inline-block">
              <p className="text-[10px] font-montserrat font-bold tracking-[0.3em] uppercase text-white/70 text-center">
                Member<br /> REHAB
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/10 pt-8 mt-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] sm:text-xs font-jakarta tracking-wider text-white/50 uppercase">
            &copy; {new Date().getFullYear()} Tripax Homes Ltd. All Rights Reserved.
          </p>
          <p className="text-[10px] sm:text-xs font-jakarta tracking-wider text-white/50 uppercase">
            A project of <a href="https://www.unleft.space" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UNLEFT</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

