import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function FeaturedCarousel() {
  // Fetch featured projects from database
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  if (error || !projects || projects.length === 0) {
    return null; // Or show nothing if no featured projects
  }

  const mainProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section className="py-24 bg-white overflow-hidden font-jakarta">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <RevealHeading
              tag="p"
              className="text-accent font-montserrat font-bold text-xs tracking-[0.4em] uppercase mb-5"
              color="#11261A"
              delay={0.1}
            >
              Featured Collections
            </RevealHeading>
            <RevealHeading
              tag="h2"
              className="text-4xl md:text-5xl font-montserrat font-bold text-primary leading-[1.1] uppercase tracking-tight"
              color="#11261A"
              delay={0.2}
            >
              Bespoke Enclaves with <span className="text-secondary/50 font-normal italic">finesse</span> in architecture
            </RevealHeading>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-4 text-[10px] font-montserrat font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-colors shrink-0 mb-2"
          >
            Explore All Enclaves
            <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Asymmetric Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]">
          
          {/* Main Featured — Left (Large) */}
          <div className="lg:col-span-7 group relative overflow-hidden bg-slate-100 rounded-3xl h-[500px] lg:h-auto">
            <Link href={`/projects/${mainProject.slug}`} className="absolute inset-0 z-10" />
            <Image
              src={mainProject.homepage_thumbnail || mainProject.thumbnail || "/images/projects/Exterior/exterior.png"}
              alt={mainProject.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-90" />
            
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-10 lg:p-16">
              <div className="inline-block px-4 py-1.5 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                Featured Enclave
              </div>
              <h3 className="text-3xl lg:text-5xl font-montserrat font-bold text-white mb-4 uppercase tracking-tight leading-none">
                {mainProject.title}
              </h3>
              <p className="text-white/60 text-sm lg:text-base font-medium max-w-lg line-clamp-2 mb-8">
                {mainProject.overview}
              </p>
              <div className="flex items-center gap-4 text-white font-montserrat font-bold text-[10px] uppercase tracking-[0.3em]">
                View Details
                <span className="w-20 h-[1px] bg-white/30 group-hover:w-32 group-hover:bg-accent transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Secondary Featured — Right (Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="flex-1 group relative overflow-hidden bg-slate-100 rounded-3xl min-h-[300px]"
              >
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" />
                <Image
                  src={project.homepage_thumbnail || project.thumbnail || "/images/projects/Exterior/exterior.png"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent opacity-80" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="text-accent text-[9px] font-bold uppercase tracking-widest mb-3">
                    {project.region}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-montserrat font-bold text-white mb-5 uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/50 group-hover:text-white font-montserrat font-bold text-[9px] uppercase tracking-[0.25em] transition-colors">
                    Explore
                    <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* If only 2 projects total, show a CTA card for the 3rd slot */}
            {secondaryProjects.length < 2 && (
              <div className="flex-1 bg-primary rounded-3xl p-10 flex flex-col justify-center items-center text-center border border-white/5 shadow-inner">
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                  <ArrowRight size={24} />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white uppercase tracking-wider mb-4">
                  More Upcoming Enclaves
                </h4>
                <p className="text-white/40 text-sm mb-8 max-w-xs">
                  Discover our pipeline of signature residential and commercial enclaves.
                </p>
                <Link 
                  href="/projects" 
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-[10px] font-montserrat font-bold uppercase tracking-widest transition-all"
                >
                  View Catalogue
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
