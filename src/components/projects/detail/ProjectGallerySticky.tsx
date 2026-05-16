"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function ProjectGallerySticky({ project }: { project: any }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const allImages = [
    project.homepage_thumbnail || project.thumbnail, 
    ...(project.gallery || [])
  ].filter(Boolean);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allImages.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length);
    }
  };

  const Lightbox = () => (
    <AnimatePresence>
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[100000] p-3 bg-white/10 rounded-full backdrop-blur-md"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[100000] backdrop-blur-md shadow-2xl"
            onClick={showPrev}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[100000] backdrop-blur-md shadow-2xl"
            onClick={showNext}
          >
            <ChevronRight size={32} />
          </button>

          <motion.div 
            key={selectedImageIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={allImages[selectedImageIndex]}
                alt={`${project.title} fullscreen`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 font-jakarta text-sm tracking-widest uppercase bg-white/5 px-6 py-2 rounded-full backdrop-blur-md">
            {selectedImageIndex + 1} <span className="mx-2 text-white/20">/</span> {allImages.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col gap-4 py-8 lg:py-12">
      {/* Main Image */}
      <div 
        className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-xl group cursor-zoom-in"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={allImages[0]}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <Maximize2 className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.slice(1, 5).map((imgSrc, i) => (
            <div 
              key={i} 
              className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-zoom-in group shadow-sm"
              onClick={() => openLightbox(i + 1)}
            >
              <Image
                src={imgSrc}
                alt={`${project.title} view ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 25vw, 12vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {i === 3 && allImages.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-montserrat font-bold backdrop-blur-[2px]">
                  +{allImages.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {mounted && createPortal(<Lightbox />, document.body)}
    </div>
  );
}
