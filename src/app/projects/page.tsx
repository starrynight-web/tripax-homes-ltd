import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CatalogueHero from "@/components/projects/CatalogueHero";
import CatalogueClient from "@/components/projects/CatalogueClient";

import { getSiteConfig } from "@/app/actions/config";

export const metadata = {
  title: 'Projects | Tripax Homes Ltd.',
  description: 'Explore our portfolio of premium residential and commercial real estate projects.',
};

export default async function ProjectsCataloguePage() {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main className="min-h-screen bg-stone-50">
        <CatalogueHero />
        <CatalogueClient />
      </main>
      <Footer config={config} />
    </>
  );
}
