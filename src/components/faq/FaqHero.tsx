import Image from "next/image";
import { RevealHeading } from "@/components/ui/RevealHeading";

export default function FaqHero() {
  return (
    <section className="relative h-[45vh] min-h-87.5 w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2670&auto=format&fit=crop"
          alt="Tripax Homes FAQ"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 to-black/40" />
      </div>

      {/* Title Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <RevealHeading
          tag="p"
          className="text-accent font-montserrat font-bold text-xs tracking-[0.4em] uppercase mb-6 drop-shadow-md"
          color="#F2CD13"
          delay={0.1}
        >
          How can we help?
        </RevealHeading>
        <RevealHeading
          tag="h1"
          className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-8 tracking-tight drop-shadow-xl uppercase"
          color="#11261A"
          delay={0.3}
        >
          Frequently Asked Questions
        </RevealHeading>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full shadow-lg" />
      </div>
    </section>
  );
}
