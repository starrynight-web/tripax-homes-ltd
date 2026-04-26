"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { getNewsArticles } from "@/app/actions/news";

export function NewsSection() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const data = await getNewsArticles();
      setArticles(data.slice(0, 3)); // Only show top 3 on homepage
      setLoading(false);
    }
    fetchNews();
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section className="py-32 bg-slate-50 font-jakarta overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <RevealHeading
              tag="p"
              className="text-accent font-montserrat font-bold text-xs tracking-[0.4em] uppercase mb-5"
              color="#11261A"
              delay={0.1}
            >
              Latest Updates
            </RevealHeading>
            <RevealHeading
              tag="h2"
              className="text-4xl md:text-5xl font-montserrat font-bold text-primary leading-[1.1] uppercase tracking-tight"
              color="#11261A"
              delay={0.2}
            >
              News & insights from the <span className="text-secondary/50 font-normal italic">vanguard</span> of luxury
            </RevealHeading>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-4 text-[10px] font-montserrat font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-colors shrink-0 mb-2"
          >
            All Articles
            <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Skeletons
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-[500px] animate-pulse border border-slate-100" />
            ))
          ) : (
            articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <Link href={`/news/${article.slug}`} className="block relative h-64 overflow-hidden">
                  <Image
                    src={article.image_url || "/images/news-placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-primary uppercase tracking-widest shadow-sm">
                      {article.category || "Lifestyle"}
                    </div>
                  </div>
                </Link>

                <div className="p-8">
                  <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-accent" />
                      <span>{new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                  
                  <Link href={`/news/${article.slug}`}>
                    <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight uppercase tracking-tight">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Link 
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-montserrat font-bold text-primary uppercase tracking-[0.2em] group/btn"
                  >
                    Read Full Story
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
