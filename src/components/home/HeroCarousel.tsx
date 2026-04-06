"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useScroll, useTransform } from "motion/react";
import { projectsMock } from "@/data/projectsMock";

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Project images for the carousel
  const carouselImages = projectsMock.map(p => p.homepageThumbnail || p.thumbnail).slice(0, 4);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {carouselImages.map((src, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
            <ParallaxImage src={src} isActive={selectedIndex === index} />
          </div>
        ))}
      </div>
      
      {/* Overlay - Moved here to ensure it stays above all slides */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-primary/20 z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent z-10" />
    </div>
  );
}

function ParallaxImage({ src, isActive }: { src: string; isActive: boolean }) {
  return (
    <motion.div
      initial={{ scale: 1.15 }}
      animate={{ scale: isActive ? 1 : 1.15 }}
      transition={{ duration: 7, ease: "linear" }}
      className="absolute inset-0 w-full h-full"
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, backgroundPosition: "center 40%" }}
      />
    </motion.div>
  );
}
