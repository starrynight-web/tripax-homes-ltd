import Image from "next/image";

export default function AboutHero({ content }: { content?: any }) {
  const data = {
    title: content?.title || "About Us",
    image: content?.image_url || "/images/about/hero.png",
  };

  return (
    <section className="relative h-[60vh] min-h-100 w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-4 tracking-tight drop-shadow-lg uppercase">
          {data.title}
        </h1>
        <div className="w-24 h-1 bg-accent mx-auto" />
      </div>
    </section>
  );
}
