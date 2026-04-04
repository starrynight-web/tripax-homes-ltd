import React from "react";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/ui/RevealHeading";

export default function ContactInfoMap() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Location",
      value: "Tripax Homes Ltd., Dhaka, Bangladesh",
      detail: "House-21, Road-04, Block-A, Bashundhara R/A, Dhaka-1229",
      href: "https://goo.gl/maps/tripax-homes-location-placeholder"
    },
    {
      icon: Phone,
      title: "Hotline",
      value: "16760",
      detail: "Available 24/7 for your enquiries",
      href: "tel:16760"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+880 1708 080822",
      detail: "Chat with our sales team",
      href: "https://wa.me/8801708080822"
    },
    {
      icon: Mail,
      title: "Email Address",
      value: "hello@tripaxhomes.com",
      detail: "Send us your queries anytime",
      href: "mailto:hello@tripaxhomes.com"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact details */}
          <div className="space-y-12">
            <div>
              <RevealHeading
                tag="p"
                className="text-secondary font-montserrat font-bold text-xs tracking-[0.3em] uppercase mb-4"
                color="#F2CD13"
                delay={0.1}
              >
                Keep in Touch
              </RevealHeading>
              <RevealHeading
                tag="h2"
                className="text-2xl md:text-3xl font-montserrat font-bold text-primary leading-tight mb-6 uppercase tracking-wide"
                color="#11261A"
                delay={0.3}
              >
                Reach out to us for <br />
                <span className="text-accent">personalized consultations</span>
              </RevealHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="group flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-primary group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-sm text-primary uppercase tracking-wider mb-1">
                      {item.title}
                    </h3>
                    <a 
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-jakarta font-bold text-slate-800 hover:text-accent transition-colors mb-1 block"
                    >
                      {item.value}
                    </a>
                    <p className="text-xs text-slate-500 font-jakarta leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Map placeholder - using a stylized box matching project aesthetic */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl h-112.5 bg-slate-100 border border-primary/5">
            <div className="absolute inset-0 z-0 bg-slate-200 animate-pulse" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.09828551778!2d90.42293427618296!3d23.81508866211833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c7cae5087%3A0xc3fa595e1e19488a!2sTripax%20Properties!5e0!3m2!1sen!2sbd!4v1712160000000!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Map pointer stylized overlay (optional aesthetic) */}
            <div className="absolute top-1/2 left-1/2 -ms-4 -mt-4 z-20 pointer-events-none group-hover:scale-125 transition-transform">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin size={16} className="text-primary" />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
