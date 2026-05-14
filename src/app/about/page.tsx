import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import ChairmanMessage from "@/components/about/ChairmanMessage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAboutSections, getTeamMembers } from "@/app/actions/about";

export const metadata = {
  title: "About Us | Tripax Homes Ltd.",
  description: "Learn about the legacy, purpose, and leadership behind Tripax Homes Ltd. - Building Trust, Elevating Lifestyles.",
};

export default async function AboutPage() {
  const sections = await getAboutSections();
  const team = await getTeamMembers();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        <AboutHero content={sections.hero} />
        <WhoWeAre content={sections.who_we_are} />
        <MissionVisionValues content={sections.mission_vision} />
        <ChairmanMessage content={sections.chairman_message} team={team} />
      </main>
      <Footer />
    </>
  );
}
