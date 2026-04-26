import Image from "next/image";
import { Project } from "@/data/projectsMock";

export default function ProjectGallerySticky({ project }: { project: any }) {
  const allImages = [project.homepage_thumbnail || project.thumbnail, ...(project.gallery || [])];
  const [mainImage, ...otherImages] = allImages;

  return (
    <div className="flex flex-col gap-4 py-8 lg:py-12">
      {/* Main Image */}
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gray-100 shadow-md">
        <Image
          src={mainImage}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {otherImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {otherImages.slice(0, 3).map((imgSrc, i) => (
            <div key={i} className="relative aspect-4/3 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imgSrc}
                alt={`${project.title} view ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 33vw, 17vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

