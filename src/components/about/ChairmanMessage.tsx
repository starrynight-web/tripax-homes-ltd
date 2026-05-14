import Image from "next/image";
import { Quote, Users } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";

export default function ChairmanMessage({ content, team }: { content?: any, team?: any[] }) {
  const chairman = {
    name: content?.name || "Mr. John Doe",
    designation: content?.designation || "Chairman, Tripax Group",
    image: content?.image_url || "/images/about/chairman.png",
    message: content?.content || "Tripax Homes has been built upon the bold vision of delivering high-quality and aesthetically profound residences that remain within the reach of a wider segment of our population...",
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="w-full md:w-1/2 space-y-4">
            <RevealHeading
              tag="h4"
              className="text-accent font-semibold tracking-wider uppercase text-sm"
              color="#F2CD13"
              delay={0.1}
            >
              Leadership
            </RevealHeading>
            <RevealHeading
              tag="h2"
              className="text-4xl md:text-5xl font-bold text-gray-900"
              color="#11261A"
              delay={0.3}
            >
              Message from the <span className="text-accent">Chairman</span>
            </RevealHeading>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-xl text-gray-600 italic">
              "We have a bold vision: making high-quality, beautifully designed
              residences accessible, while delivering unparalleled trust and
              reliability."
            </p>
          </div>
        </div>

        {/* Profile & Message Content */}
        <div className="relative mb-24">
          {/* Background decorative element */}
          <div className="absolute top-10 right-0 w-3/4 h-[90%] bg-stone-50 rounded-3xl -z-10" />

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Portrait */}
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={chairman.image}
                  alt={chairman.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-primary/90 to-transparent p-6 text-white text-center">
                  <h3 className="text-2xl font-bold">{chairman.name}</h3>
                  <p className="text-accent font-medium text-sm">
                    {chairman.designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="w-full lg:w-2/3 py-8 lg:pr-8 relative">
              <Quote className="absolute -top-4 -left-8 w-24 h-24 text-primary/10 -z-10 rotate-180 opacity-50" />
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify whitespace-pre-wrap">
                {chairman.message}
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team Section */}
        {team && team.length > 0 && (
          <div className="pt-24 border-t border-slate-100">
            <div className="text-center mb-16">
              <h4 className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Core Management</h4>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-primary uppercase tracking-tight">
                Our <span className="text-accent">Executive</span> Board
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="group relative bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 bg-slate-50">
                    {member.image_url ? (
                      <Image 
                        src={member.image_url} 
                        alt={member.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-300">
                        <Users size={48} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-accent font-bold text-[11px] uppercase tracking-widest mb-4">{member.designation}</p>
                  {member.bio && (
                    <p className="text-slate-500 font-jakarta text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
