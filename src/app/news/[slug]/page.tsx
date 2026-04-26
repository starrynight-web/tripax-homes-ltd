import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getArticleBySlug, getPublishedArticles } from "@/app/actions/news";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles
    .filter((article) => article.slug)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | Tripax Homes Ltd." };

  return {
    title: `${article.title} | News | Tripax Homes Ltd.`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.cover_image],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24 font-jakarta">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Back to News
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="px-4 py-1.5 bg-accent/10 text-primary border border-accent/20 rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-accent" />
                {new Date(article.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-accent" />
                By {article.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-primary leading-[1.15] uppercase tracking-tight mb-12">
              {article.title}
            </h1>

            {/* Hero Image */}
            <div className="relative aspect-21/9 rounded-3xl overflow-hidden mb-16 shadow-2xl">
              <Image
                src={article.cover_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Sidebar Share */}
              <div className="lg:col-span-1 flex lg:flex-col gap-6 items-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest vertical-text hidden lg:block">
                  Share Article
                </span>
                <div className="flex lg:flex-col gap-4">
                  {[Share2].map((Icon, idx) => (
                    <button 
                      key={idx}
                      className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Body */}
              <div className="lg:col-span-11 prose prose-lg prose-slate max-w-none prose-headings:font-montserrat prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-primary prose-a:text-accent prose-img:rounded-3xl">
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
              </div>
            </div>

            {/* Footer Tag/Social */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-3 px-8 py-3 bg-primary text-white font-montserrat font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-secondary transition-all shadow-xl shadow-primary/20">
                <Share2 size={14} />
                Copy Article Link
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
