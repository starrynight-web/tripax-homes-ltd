"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/RevealHeading";

export default function WhoWeAre({ content }: { content?: any }) {
  const data = {
    tag: content?.tag || "Our Story",
    title: content?.title || "Who We Are",
    text1: content?.text1 || "Tripax Group is a rising local conglomerate in Bangladesh...",
    text2: content?.text2 || "Tripax Homes Ltd. emerged with a visionary team dedicated to blending immense value, luxury, and innovation...",
    fullStory: content?.fullStory || "Tripax Group is a rising local conglomerate in Bangladesh...",
    image: content?.image_url || "/images/about/who-we-are.png",
    videoUrl: content?.videoUrl || "",
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <RevealHeading
              tag="p"
              className="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary font-medium text-sm mb-2"
              color="#11261A"
              delay={0.1}
            >
              {data.tag}
            </RevealHeading>
            <RevealHeading
              tag="h2"
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
              color="#11261A"
              delay={0.3}
            >
              {data.title}
            </RevealHeading>
            <div className="space-y-4 text-gray-600 text-lg">
              <p className="whitespace-pre-wrap">{data.text1}</p>
              <p className="whitespace-pre-wrap">{data.text2}</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="mt-4 border-primary text-primary hover:bg-primary hover:text-white"
                  size="lg"
                >
                  Read Our Full Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-primary mb-4">
                    Tripax Homes: A Legacy of Excellence
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-gray-700 whitespace-pre-wrap">
                  {data.fullStory}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Image & Video Trigger */}
          <div className="relative aspect-square md:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent/90 hover:bg-accent text-primary rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-[0_0_0_8px_rgba(242,205,19,0.2)] hover:shadow-[0_0_0_12px_rgba(242,205,19,0.4)] z-10">
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-200 p-0 bg-black border-none">
                <div className="aspect-video w-full bg-stone-900 flex items-center justify-center text-stone-500">
                  {data.videoUrl ? (
                    <iframe 
                      src={data.videoUrl} 
                      className="w-full h-full" 
                      allowFullScreen 
                    />
                  ) : (
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Corporate Video Placeholder</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
