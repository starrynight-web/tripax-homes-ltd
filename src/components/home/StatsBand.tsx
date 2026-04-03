import React from "react";

export function StatsBand() {
  const stats = [
    { val: "15+", label: "Years of Legacy" },
    { val: "42", label: "Signature Projects" },
    { val: "1,200+", label: "Happy Families" },
    { val: "100%", label: "On-time Delivery" },
  ];

  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-montserrat font-extrabold text-accent mb-2">
                {stat.val}
              </div>
              <div className="text-[10px] font-jakarta font-semibold text-white/60 tracking-[0.25em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
