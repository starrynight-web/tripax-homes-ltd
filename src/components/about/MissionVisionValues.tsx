import { Target, Eye, Shield, Users, Heart, BookOpen, TrendingUp } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";

const values = [
  {
    title: "Integrity",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Respectful & Long Term Partnership",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Customer Satisfaction",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Open & Transparent Culture",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Engaging & Growing Team Member",
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

export default function MissionVisionValues() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Purpose */}
          <div className="bg-primary text-white p-10 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <Target className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-secondary rounded-lg">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <RevealHeading
                  tag="h3"
                  className="text-3xl font-bold"
                  color="#F2CD13"
                  delay={0.1}
                >
                  Purpose
                </RevealHeading>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                To elevate the living standards of our customers and bring them
                enduring happiness through meticulously crafted homes.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-stone-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Eye className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <RevealHeading
                  tag="h3"
                  className="text-3xl font-bold text-gray-900"
                  color="#11261A"
                  delay={0.1}
                >
                  Vision
                </RevealHeading>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To emerge as the most trusted, respected, and premier real estate
                entity in Bangladesh, setting benchmarks in luxury and reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="text-center mb-12">
          <RevealHeading
            tag="h3"
            className="text-sm font-bold tracking-widest text-accent uppercase mb-2"
            color="#F2CD13"
            delay={0.1}
          >
            Our Foundation
          </RevealHeading>
          <RevealHeading
            tag="h2"
            className="text-3xl md:text-5xl font-bold text-primary"
            color="#11261A"
            delay={0.3}
          >
            Core Values
          </RevealHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-colors duration-300">
                {value.icon}
              </div>
              <h4 className="font-semibold text-gray-900 leading-tight">
                {value.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
