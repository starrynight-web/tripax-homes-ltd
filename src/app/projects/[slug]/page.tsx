import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ProjectGallerySticky from "@/components/projects/detail/ProjectGallerySticky";
import ProjectInfoScrollable from "@/components/projects/detail/ProjectInfoScrollable";
import ProjectLocationMap from "@/components/projects/detail/ProjectLocationMap";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).single();

  if (!project) return { title: "Project Not Found | Tripax Homes Ltd." };

  return {
    title: `${project.title} | Tripax Homes Ltd.`,
    description: project.overview,
  };
}

export default async function ProjectDetailSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).single();

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
            {/* LEFT — Sticky Gallery Pane */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
              <ProjectGallerySticky project={project} />
            </div>

            {/* RIGHT — Scrolling Info Pane */}
            <div className="w-full lg:w-1/2">
              <ProjectInfoScrollable project={project} />
            </div>
          </div>
        </div>

        <ProjectLocationMap project={project} />
      </main>
      <Footer />
    </>
  );
}

