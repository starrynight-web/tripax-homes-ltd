import { Project } from "@/data/projectsMock";
import { MapPin } from "lucide-react";

export default function ProjectLocationMap({ project }: { project: Project }) {
  return (
    <section className="w-full bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold font-heading text-secondary mb-4">
            Project Location
          </h2>
          <p className="text-gray-600 flex items-center justify-center text-lg">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            {project.location}
          </p>
        </div>
        
        {/* Map Placeholder Block */}
        <div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
          {/* In a real app, integrate Google Maps iframe or library here */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Interactive Map Integration Pending</p>
            <p className="text-gray-400 text-sm mt-2">{project.region} coordinates would load here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
