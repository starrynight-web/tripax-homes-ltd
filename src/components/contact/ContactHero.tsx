import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative h-[45vh] min-h-87.5 w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Contact Tripax Homes"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 to-black/40" />
      </div>

      {/* Title Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-accent font-montserrat font-bold text-xs tracking-[0.4em] uppercase mb-6 drop-shadow-md">
          Get in Touch
        </p>
        <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-8 tracking-tight drop-shadow-xl uppercase">
          Contact Us
        </h1>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full shadow-lg" />
      </div>
    </section>
  );
}
