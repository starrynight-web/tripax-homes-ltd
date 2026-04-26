import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projectsMock";
import { MapPin } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1 text-accent" />
          <span className="truncate">{project.region}</span>
        </div>

        <h3 className="text-xl font-bold font-heading text-secondary mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Tagline/Subtitle */}
        {project.subtitle && (
          <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
            {project.subtitle}
          </p>
        )}

        <p className="text-gray-600 font-sans line-clamp-3 mb-6 grow">
          {project.overview}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="inline-flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors uppercase tracking-wider">
            Explore Project
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

