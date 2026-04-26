"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Search, 
  X, 
  Edit2, 
  Trash2, 
  Eye, 
  Loader2, 
  Image as ImageIcon,
  Calendar,
  Tag,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/app/actions/news";
import { cn } from "@/lib/utils";

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getNewsArticles();
    setArticles(data);
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    try {
      if (currentArticle) {
        await updateNewsArticle(currentArticle.id, data);
      } else {
        await createNewsArticle({
          ...data,
          slug: (data.title as string).toLowerCase().replace(/ /g, "-"),
          published_at: new Date().toISOString(),
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteNewsArticle(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">News & Insights</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">Manage blog posts, press releases, and company updates.</p>
        </div>
        <button 
          onClick={() => { setCurrentArticle(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-xl shadow-primary/10"
        >
          <Plus size={16} />
          New Article
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse" />)
        ) : (
          filtered.map((article) => (
            <Card key={article.id} className="border-none shadow-sm group hover:shadow-xl transition-all duration-500 overflow-hidden bg-white">
              <div className="relative h-48 overflow-hidden">
                <img src={article.image_url || "/images/news-placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-primary font-bold uppercase tracking-widest text-[9px]">
                    {article.category || "General"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-slate-900 mb-2 line-clamp-1 uppercase tracking-tight">{article.title}</h3>
                <p className="text-xs text-slate-500 mb-6 line-clamp-2 font-jakarta">{article.excerpt}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {new Date(article.published_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setCurrentArticle(article); setIsModalOpen(true); }}
                      className="p-2 hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSave}>
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-montserrat font-bold text-slate-900">{currentArticle ? "Edit Article" : "New Article"}</h2>
                    <p className="text-slate-500 text-xs mt-1">Publish news to the homepage vanguard section.</p>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-50 text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
                    <input 
                      required
                      name="title"
                      defaultValue={currentArticle?.title}
                      placeholder="The Future of Urban Living..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                      <input 
                        name="category"
                        defaultValue={currentArticle?.category}
                        placeholder="Lifestyle, Construction, etc."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                      <input 
                        name="image_url"
                        defaultValue={currentArticle?.image_url}
                        placeholder="https://..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Short Excerpt</label>
                    <textarea 
                      name="excerpt"
                      rows={2}
                      defaultValue={currentArticle?.excerpt}
                      placeholder="Brief summary for the homepage card..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Content (Markdown supported)</label>
                    <textarea 
                      name="content"
                      rows={8}
                      defaultValue={currentArticle?.content}
                      placeholder="Write your article content here..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                    />
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                   <button 
                    disabled={saving}
                    type="submit"
                    className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : "Publish Article"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
