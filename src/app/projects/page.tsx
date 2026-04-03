import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CatalogueHero from "@/components/projects/CatalogueHero";
import CatalogueClient from "@/components/projects/CatalogueClient";

export const metadata = {
  title: 'Projects | Tripax Homes Ltd.',
  description: 'Explore our portfolio of premium residential and commercial real estate projects.',
};

export default function ProjectsCataloguePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        <CatalogueHero />
        <CatalogueClient />
      </main>
      <Footer />
    </>
  );
}
