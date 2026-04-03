import { Project } from "@/data/projectsMock";
import Link from "next/link";
import { MapPin, FileText, ChevronRight } from "lucide-react";

export default function ProjectInfoScrollable({ project }: { project: Project }) {
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
        <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          {project.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-2">
          {project.title}
        </h1>
        {project.subtitle && (
          <h2 className="text-xl md:text-2xl text-accent font-heading mb-4">
            {project.subtitle}
          </h2>
        )}
        <div className="flex items-start text-gray-600">
          <MapPin className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-primary" />
          <p className="text-lg">{project.location}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2">
          Overview
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {project.overview}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2">
          Project Progress
        </h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex justify-between items-end mb-2">
            <span className="font-semibold text-gray-700">Completion</span>
            <span className="text-2xl font-bold text-primary">{project.progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${project.progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold font-heading text-secondary mb-4 border-b border-gray-100 pb-2">
          Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(project.specs).map(([key, value]) => {
            // Convert camelCase to Title Case for label
            const label = key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase());
            
            return (
              <div key={key} className="flex flex-col py-3 border-b border-gray-100/50">
                <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">{label}</span>
                <span className="font-semibold text-secondary">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-gray-200">
        <button className="flex justify-center items-center w-full md:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-colors group">
          <FileText className="w-5 h-5 mr-3" />
          Download E-Brochure
        </button>
      </div>
    </div>
  );
}
