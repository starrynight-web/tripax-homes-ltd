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

export default function WhoWeAre() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary font-medium text-sm mb-2">
              Our Story
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                <strong>Tripax Group</strong> is a rising local conglomerate in
                Bangladesh, dedicated to elevating lifestyles through premium
                real estate, uncompromising quality, and unparalleled customer
                service. With a vision for sustainable growth, we are shaping the
                future of modern living.
              </p>
              <p>
                <strong>Tripax Homes Ltd.</strong> emerged with a visionary team
                dedicated to blending immense value, luxury, and innovation. We
                craft not just apartments, but opulent living experiences infused
                with elegant design, modern amenities, and meticulous total
                quality control.
              </p>
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
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Tripax Group</strong> is a rising local conglomerate in
                    Bangladesh, dedicated to elevating lifestyles through premium
                    real estate, uncompromising quality, and unparalleled customer
                    service. Established with a profound commitment to driving
                    innovation, the group is rapidly expanding its portfolio to
                    address the dynamic demands of a growing nation.
                  </p>
                  <p>
                    <strong>Tripax Homes Ltd.</strong> emerged with a visionary team
                    dedicated to blending immense value, luxury, and innovation. We
                    craft not just apartments, but opulent living experiences infused
                    with elegant design, modern amenities, and meticulous total
                    quality control.
                  </p>
                  <p>
                    Our customer-centric approach, combined with absolute financial
                    strength, enables us to offer optimum luxury. From biophilic
                    architectural touches to cutting-edge home technologies, we
                    ensure that the standard of living we provide is never confined
                    to mere square footage, but rather celebrated to its fullest.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Image & Video Trigger */}
          <div className="relative aspect-square md:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/images/about/who-we-are.png"
              alt="Tripax Office Interior"
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
                  {/* Placeholder for YouTube/Vimeo Iframe */}
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Corporate Video Placeholder</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
