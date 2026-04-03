"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Project, projectsMock, ProjectCategory, ProjectType } from "@/data/projectsMock";
import ProjectCard from "./ProjectCard";
import { ChevronDown } from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [type, setType] = useState<ProjectType | "All">("All");
  const [region, setRegion] = useState<string>("All");

  // Sync category state with 'status' query parameter on mount
  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      const statusMap: Record<string, ProjectCategory> = {
        "ongoing": "Ongoing",
        "handed-over": "Handed Over",
        "upcoming": "Upcoming",
        "ready": "Ready"
      };
      
      const mappedCategory = statusMap[status.toLowerCase()];
      if (mappedCategory) {
        setCategory(mappedCategory);
      }
    }
  }, [searchParams]);

  const regions = useMemo(() => {
    const allRegions = projectsMock.map(p => p.region);
    return ["All", ...Array.from(new Set(allRegions))];
  }, []);

  const filteredProjects = projectsMock.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (type !== "All" && p.type !== type) return false;
    if (region !== "All" && p.region !== region) return false;
    return true;
  });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filters */}
        <div className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Project Status
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-md py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Handed Over">Handed Over</option>
                  <option value="Ready">Ready</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-md py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Region Filter */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-md py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "All Locations" : r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-heading text-secondary mb-2">No Projects Found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => { setCategory("All"); setType("All"); setRegion("All"); }}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default function CatalogueClient() {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <CatalogueContent />
    </Suspense>
  );
}
