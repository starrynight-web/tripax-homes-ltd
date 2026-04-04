import Image from "next/image";

export default function CatalogueHero() {
  return (
    <section className="relative w-full h-[40vh] min-h-75 flex items-center justify-center bg-secondary overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/projects/banner.png"
        alt="Projects Banner"
        fill
        className="object-cover object-center opacity-40 mix-blend-overlay"
        priority
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold font-montserrat text-white tracking-tight uppercase mb-4">
          Our Projects
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-sans max-w-2xl mx-auto">
          Discover a curated portfolio of refined living and commercial excellence.
        </p>
      </div>

      {/* Decorative Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
