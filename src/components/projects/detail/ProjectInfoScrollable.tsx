"use client";

import React, { useState } from "react";
import { Project } from "@/data/projectsMock";
import Link from "next/link";
import { MapPin, FileText, ChevronRight, Calendar, Building2, Download } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { BookingModal } from "./BookingModal";

export default function ProjectInfoScrollable({ project }: { project: any }) {
  const [bookingType, setBookingType] = useState<"Private Consultation" | "Site Visit">("Private Consultation");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = (type: "Private Consultation" | "Site Visit") => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const handleDownloadBrochure = () => {
    if (project.brochure_url) {
      window.open(project.brochure_url, "_blank");
    } else {
      alert("E-Brochure is coming soon for this project!");
    }
  };

  return (
    <div className="w-full h-full py-8 lg:py-12 lg:pr-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-primary">{project.title}</span>
      </nav>

      {/* Header Info */}
      <div className="mb-10">
        <RevealHeading
          tag="div"
          className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4"
          color="#F2CD13"
          delay={0.1}
        >
          {project.category}
        </RevealHeading>
        <RevealHeading
          tag="h1"
          className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-2"
          color="#11261A"
          delay={0.3}
        >
          {project.title}
        </RevealHeading>
        {project.subtitle && (
          <RevealHeading
            tag="h2"
            className="text-xl md:text-2xl text-accent font-heading mb-4"
            color="#F2CD13"
            delay={0.5}
          >
            {project.subtitle}
          </RevealHeading>
        )}
        <div className="flex items-start text-gray-600">
          <MapPin className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-primary" />
          <p className="text-lg">{project.location}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <RevealHeading
          tag="h3"
          className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2"
          color="#11261A"
          delay={0.2}
        >
          Overview
        </RevealHeading>
        <p className="text-gray-600 leading-relaxed text-lg">
          {project.overview}
        </p>
      </div>

      {/* Video Section */}
      {project.video_url && (
        <div className="mb-12">
          <RevealHeading
            tag="h3"
            className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2"
            color="#11261A"
            delay={0.2}
          >
            Project Video
          </RevealHeading>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
            {project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be") ? (
              <iframe 
                src={`https://www.youtube.com/embed/${project.video_url.split("v=")[1]?.split("&")[0] || project.video_url.split("/").pop()}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : project.video_url.includes("vimeo.com") ? (
              <iframe 
                src={`https://player.vimeo.com/video/${project.video_url.split("/").pop()}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            ) : (
              <video 
                src={project.video_url} 
                controls 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-12">
        <RevealHeading
          tag="h3"
          className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2"
          color="#11261A"
          delay={0.2}
        >
          Project Progress
        </RevealHeading>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-end mb-2">
            <span className="font-semibold text-gray-700">Completion</span>
            <span className="text-2xl font-bold text-primary">{project.progress_percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${project.progress_percent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-12">
        <RevealHeading
          tag="h3"
          className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2"
          color="#11261A"
          delay={0.2}
        >
          Specifications
        </RevealHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.specs && Object.entries(project.specs).map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase());
            
            return (
              <div key={key} className="flex flex-col py-3 border-b border-gray-100/50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</span>
                <span className="font-semibold text-secondary">{String(value)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA Section */}
      <div className="pt-8 border-t border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => openBooking("Site Visit")}
            className="flex justify-center items-center px-6 py-5 bg-secondary text-white font-montserrat font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-secondary/10 group"
          >
            <MapPin className="w-4 h-4 mr-3 text-accent group-hover:scale-110 transition-transform" />
            Schedule Site Visit
          </button>
          <button 
            onClick={() => openBooking("Private Consultation")}
            className="flex justify-center items-center px-6 py-5 bg-white border-2 border-slate-100 text-slate-900 font-montserrat font-bold text-xs tracking-widest uppercase rounded-xl hover:border-primary hover:text-primary transition-all group"
          >
            <Calendar className="w-4 h-4 mr-3 text-primary group-hover:rotate-12 transition-transform" />
            Book Consultation
          </button>
        </div>
        
        <button 
          onClick={handleDownloadBrochure}
          className="flex justify-center items-center w-full px-8 py-5 bg-primary text-white font-montserrat font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 group"
        >
          <FileText className="w-4 h-4 mr-3 text-accent group-hover:animate-bounce" />
          Download E-Brochure
        </button>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        projectTitle={project.title}
        defaultType={bookingType}
      />
    </div>
  );
}

