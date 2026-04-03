import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import ChairmanMessage from "@/components/about/ChairmanMessage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About Us | Tripax Homes Ltd.",
  description: "Learn about the legacy, purpose, and leadership behind Tripax Homes Ltd. - Building Trust, Elevating Lifestyles.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        <AboutHero />
        <WhoWeAre />
        <MissionVisionValues />
        <ChairmanMessage />
      </main>
      <Footer />
    </>
  );
}
