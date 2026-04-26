import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPublishedArticles } from "@/app/actions/news";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Latest News & Updates | Tripax Homes Ltd.",
  description: "Stay updated with the latest construction updates, award wins, and real estate news from Tripax Homes Ltd.",
};

export default async function NewsPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24 font-jakarta">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-montserrat font-bold text-primary uppercase tracking-tight mb-6">
              News & <span className="text-accent">Updates</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
              Stay connected with our latest project milestones, corporate achievements, and insights into the premium real estate landscape in Dhaka.
            </p>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article) => (
                <article 
                  key={article.id} 
                  className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.cover_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-accent text-[9px] font-bold uppercase tracking-widest rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-accent" />
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-accent" />
                        {article.author}
                      </div>
                    </div>

                    <h2 className="text-xl font-montserrat font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-3 text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors"
                    >
                      Read Full Article
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="text-slate-400 mb-4">
                <Newspaper size={48} className="mx-auto opacity-20" />
              </div>
              <h3 className="text-xl font-montserrat font-bold text-primary uppercase tracking-wider">
                No Articles Found
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Check back soon for latest news and updates.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Newspaper({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}
