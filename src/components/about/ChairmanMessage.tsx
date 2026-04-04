import Image from "next/image";
import { Quote } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";

export default function ChairmanMessage() {
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
              Message from the Chairman
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
        <div className="relative">
          {/* Background decorative element */}
          <div className="absolute top-10 right-0 w-3/4 h-[90%] bg-stone-50 rounded-3xl -z-10" />

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Portrait */}
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/about/chairman.png"
                  alt="Chairman of Tripax Homes Ltd."
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-primary/90 to-transparent p-6 text-white text-center">
                  <h3 className="text-2xl font-bold">Mr. John Doe</h3>
                  <p className="text-accent font-medium text-sm">
                    Chairman, Tripax Group
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="w-full lg:w-2/3 py-8 lg:pr-8 relative">
              <Quote className="absolute -top-4 -left-8 w-24 h-24 text-primary/10 -z-10 rotate-180 opacity-50" />
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
                <p>
                  Tripax Homes has been built upon the bold vision of delivering
                  high-quality and aesthetically profound residences that remain
                  within the reach of a wider segment of our population. We clearly
                  understand the pressing need for more trusted, reliable, and
                  ethical companies within the real estate sector.
                </p>
                <p>
                  Our goal is to continually fill the vacuum of trust in the
                  market through our steadfast efforts to delight our customers. We
                  are a highly competent and motivated unit of professionals,
                  suppliers, and partners who work in close synergy to ensure that
                  strict processes and unyielding policies are adhered to. This
                  guarantees complete and consistent value across all our projects.
                </p>
                <p>
                  We actively listen to our customers to drive continuous
                  improvement and pride ourselves on serving them with premium,
                  uninterrupted service in every conceivable way.
                </p>
                
                <hr className="border-stone-200 my-8" />
                
                {/* Chairman background snapshot */}
                <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Professional Background</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Before founding Tripax Group, Mr. Doe accumulated over two decades of experience
                    in global corporate leadership and sustainable urban development. His ventures
                    span across technology, real estate, and consumer brands, recognized consistently
                    for outstanding corporate governance and financial strength.
                  </p>
                  <a href="#" className="text-primary font-bold hover:text-accent underline text-sm transition-colors">
                    View Full Executive Profile &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
