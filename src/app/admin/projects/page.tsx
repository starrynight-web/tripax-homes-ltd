"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Filter,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Star,
  StarOff,
  Loader2,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  toggleFeaturedProject 
} from "@/app/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

type ProjectCategory = "Ongoing" | "Upcoming" | "Handed Over" | "Ready";

const statusColors: Record<ProjectCategory, { bg: string; text: string; icon: React.ReactNode }> = {
  Ongoing:      { bg: "bg-blue-100",   text: "text-blue-700",   icon: <Clock size={12} /> },
  Upcoming:     { bg: "bg-amber-100",  text: "text-amber-700",  icon: <AlertCircle size={12} /> },
  "Handed Over":{ bg: "bg-emerald-100",text: "text-emerald-700",icon: <CheckCircle2 size={12} /> },
  Ready:        { bg: "bg-teal-100",   text: "text-teal-700",   icon: <Building2 size={12} /> },
};

type ModalMode = "view" | "edit" | "delete" | "add" | null;

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "All">("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ mode: ModalMode; project: any | null }>({ mode: null, project: null });
  const [saving, setSaving] = useState(false);

  // Form State
  const [thumbnail, setThumbnail] = useState("");
  const [homepageThumbnail, setHomepageThumbnail] = useState("");
  const [brochureUrl, setBrochureUrl] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{key: string, value: string}[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory === "All" || p.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [projects, search, filterCategory]);

  const openModal = (mode: ModalMode, project: any) => {
    if (mode === "edit" || mode === "add") {
      setThumbnail(project?.thumbnail || "");
      setHomepageThumbnail(project?.homepage_thumbnail || "");
      setBrochureUrl(project?.brochure_url || "");
      setGallery(project?.gallery || []);
      
      const s = project?.specs || {};
      setSpecs(Object.keys(s).map(k => ({ key: k, value: s[k] })));
    }
    setModal({ mode, project });
  };
  
  const closeModal = () => setModal({ mode: null, project: null });

  const handleDelete = async () => {
    if (!modal.project) return;
    setSaving(true);
    try {
      await deleteProject(modal.project.id);
      setProjects((prev) => prev.filter((p) => p.id !== modal.project!.id));
      closeModal();
    } catch (err) {
      alert("Failed to delete project");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert specs array back to object
    const specsObj = specs.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const projectData = {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      location: formData.get("location") as string,
      region: formData.get("region") as string,
      category: formData.get("category") as string,
      type: formData.get("type") as string,
      overview: formData.get("overview") as string,
      progress_percent: Number(formData.get("progress_percent")) || 0,
      video_url: formData.get("video_url") as string,
      is_featured: formData.get("is_featured") === "on",
      thumbnail,
      homepage_thumbnail: homepageThumbnail,
      brochure_url: brochureUrl,
      gallery,
      specs: specsObj
    };

    try {
      if (modal.mode === "add") {
        const slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await addProject({ ...projectData, slug });
      } else if (modal.mode === "edit" && modal.project) {
        await updateProject(modal.project.id, projectData);
      }
      await fetchProjects();
      closeModal();
    } catch (err) {
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      await toggleFeaturedProject(id, !current);
      setProjects((prev) => prev.map(p => p.id === id ? { ...p, is_featured: !current } : p));
    } catch (err) {
      alert("Failed to update featured status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">
            Manage all Tripax real estate listings, media, and specifications.
          </p>
        </div>
        <button
          onClick={() => openModal("add", null)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(["All", "Ongoing", "Upcoming", "Ready"] as const).map((cat) => {
          const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
          return (
            <Card
              key={cat}
              className={cn(
                "border-none shadow-sm cursor-pointer transition-all",
                filterCategory === (cat === "All" ? "All" : cat) ? "ring-2 ring-primary" : "hover:shadow-md"
              )}
              onClick={() => setFilterCategory(cat === "All" ? "All" : cat)}
            >
              <CardContent className="p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{cat}</p>
                <p className="text-3xl font-montserrat font-extrabold text-slate-900">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Handed Over">Handed Over</option>
            <option value="Ready">Ready</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Featured", "Project", "Location", "Status", "Progress", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Loader2 className="animate-spin mx-auto text-primary mb-2" size={24} />
                      <p className="text-sm text-slate-400">Fetching live data...</p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filtered.map((project, idx) => {
                      const status = statusColors[project.category as ProjectCategory] || statusColors.Upcoming;
                      return (
                        <motion.tr
                          key={project.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleFeatured(project.id, project.is_featured)}
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                project.is_featured ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-300"
                              )}
                            >
                              {project.is_featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                {project.thumbnail ? (
                                  <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="48px" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={16} /></div>
                                )}
                              </div>
                              <div>
                                <p className="font-montserrat font-bold text-sm text-slate-900 whitespace-nowrap">{project.title}</p>
                                <p className="font-jakarta text-[11px] text-slate-400">{project.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-jakarta text-xs text-slate-600 max-w-[160px] truncate">{project.location}</p>
                            <p className="font-jakarta text-[11px] text-slate-400">{project.region}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${status.bg} ${status.text}`}>
                              {status.icon}
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress_percent}%` }} />
                              </div>
                              <span className="font-montserrat font-bold text-xs text-slate-700">{project.progress_percent}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => openModal("view", project)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-primary hover:text-white flex items-center justify-center text-slate-500 transition-colors"><Eye size={14} /></button>
                              <button onClick={() => openModal("edit", project)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center text-slate-500 transition-colors"><Pencil size={14} /></button>
                              <button onClick={() => openModal("delete", project)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white flex items-center justify-center text-slate-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ────────── MODALS ────────── */}
      <AnimatePresence>
        {modal.mode && modal.project !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-10"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn("bg-white rounded-2xl shadow-2xl w-full", modal.mode === "view" ? "max-w-lg" : "max-w-5xl")}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Add/Edit Modal */}
              {(modal.mode === "add" || modal.mode === "edit") && (
                <div className="flex flex-col h-full max-h-[90vh]">
                  <div className="p-8 pb-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-montserrat font-bold text-slate-900 text-xl uppercase tracking-tight">
                      {modal.mode === "add" ? "Add New Project" : "Edit Project"}
                    </h3>
                    <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10">
                    
                    {/* Basic Info Section */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Title *</label>
                          <input name="title" required defaultValue={modal.project?.title} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtitle</label>
                          <input name="subtitle" defaultValue={modal.project?.subtitle} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                          <input name="location" defaultValue={modal.project?.location} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Region</label>
                          <input name="region" defaultValue={modal.project?.region} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                          <select name="category" defaultValue={modal.project?.category || "Upcoming"} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm bg-white">
                            <option value="Ongoing">Ongoing</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Handed Over">Handed Over</option>
                            <option value="Ready">Ready</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label>
                          <select name="type" defaultValue={modal.project?.type || "Residential"} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm bg-white">
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion %</label>
                          <input name="progress_percent" type="number" min={0} max={100} defaultValue={modal.project?.progress_percent || 0} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm" />
                        </div>
                        <div className="flex items-center pt-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="is_featured" defaultChecked={modal.project?.is_featured} className="w-4 h-4 accent-accent" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured on Homepage</span>
                          </label>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overview</label>
                          <textarea name="overview" rows={3} defaultValue={modal.project?.overview} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm resize-none" />
                        </div>
                      </div>
                    </div>

                    {/* Media & Resources Section */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                        Media & Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CloudinaryUpload 
                          label="Main Thumbnail" 
                          resourceType="image" 
                          value={thumbnail} 
                          onUpload={setThumbnail} 
                          onRemove={() => setThumbnail("")} 
                        />
                        <CloudinaryUpload 
                          label="Homepage Thumbnail" 
                          resourceType="image" 
                          value={homepageThumbnail} 
                          onUpload={setHomepageThumbnail} 
                          onRemove={() => setHomepageThumbnail("")} 
                        />
                        <div className="col-span-2">
                          <CloudinaryUpload 
                            label="Brochure (PDF)" 
                            resourceType="image" 
                            accept=".pdf"
                            value={brochureUrl} 
                            onUpload={setBrochureUrl} 
                            onRemove={() => setBrochureUrl("")} 
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Video URL (YouTube/Facebook/Vimeo)</label>
                          <input name="video_url" type="url" placeholder="https://www.youtube.com/watch?v=..." defaultValue={modal.project?.video_url} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Image Gallery</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {gallery.map((img, idx) => (
                              <div key={idx} className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-200 group">
                                <Image src={img} alt="Gallery item" fill className="object-cover" />
                                <button type="button" onClick={() => setGallery(gallery.filter((_, i) => i !== idx))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                            <div className="col-span-1">
                              <CloudinaryUpload label="" resourceType="image" onUpload={(url) => setGallery([...gallery, url])} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Custom Specs Section */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                        Custom Specifications
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {specs.map((spec, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <input
                              placeholder="e.g. Land Size"
                              value={spec.key}
                              onChange={(e) => {
                                const newSpecs = [...specs];
                                newSpecs[idx].key = e.target.value;
                                setSpecs(newSpecs);
                              }}
                              className="w-1/3 border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <input
                              placeholder="e.g. 90 Katha"
                              value={spec.value}
                              onChange={(e) => {
                                const newSpecs = [...specs];
                                newSpecs[idx].value = e.target.value;
                                setSpecs(newSpecs);
                              }}
                              className="flex-1 border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                              type="button"
                              onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                              className="w-12 h-[46px] shrink-0 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSpecs([...specs, { key: "", value: "" }])}
                        className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mt-6 hover:text-accent transition-colors"
                      >
                        <Plus size={14} /> Add Custom Field
                      </button>
                    </div>

                    <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-slate-100 flex gap-3 mt-auto">
                      <button type="button" onClick={closeModal} className="flex-1 py-3.5 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                      <button type="submit" disabled={saving} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                        {saving && <Loader2 size={14} className="animate-spin" />}
                        {modal.mode === "add" ? "Create Project" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* View Modal */}
              {modal.mode === "view" && modal.project && (
                <div className="flex flex-col h-full max-h-[90vh]">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                      <h3 className="font-montserrat font-bold text-slate-900 text-2xl uppercase tracking-tight">{modal.project.title}</h3>
                      <p className="text-accent font-bold uppercase tracking-widest text-[10px] mt-1">{modal.project.category} — {modal.project.type}</p>
                    </div>
                    <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-medium text-slate-900">{modal.project.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Region</p>
                        <p className="text-sm font-medium text-slate-900">{modal.project.region}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${modal.project.progress_percent}%` }} />
                          </div>
                          <span className="text-xs font-bold text-primary">{modal.project.progress_percent}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overview</p>
                      <p className="text-sm text-slate-600 leading-relaxed font-jakarta italic">"{modal.project.overview}"</p>
                    </div>

                    {/* Specifications Grid */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Specifications</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {modal.project.specs && Object.entries(modal.project.specs).map(([key, value]) => (
                          <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="text-xs font-bold text-slate-900">{String(value)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visuals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thumbnails</p>
                          <div className="flex gap-4">
                            <div className="flex-1 aspect-video rounded-xl overflow-hidden border border-slate-200 relative bg-slate-50">
                              {modal.project.thumbnail ? <Image src={modal.project.thumbnail} alt="Main" fill className="object-cover" /> : <div className="flex items-center justify-center h-full text-slate-300">No Image</div>}
                              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-[8px] font-bold uppercase rounded">Main</div>
                            </div>
                            <div className="flex-1 aspect-video rounded-xl overflow-hidden border border-slate-200 relative bg-slate-50">
                              {modal.project.homepage_thumbnail ? <Image src={modal.project.homepage_thumbnail} alt="Home" fill className="object-cover" /> : <div className="flex items-center justify-center h-full text-slate-300">No Image</div>}
                              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-[8px] font-bold uppercase rounded">Homepage</div>
                            </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">E-Brochure</p>
                          {modal.project.brochure_url ? (
                            <a href={modal.project.brochure_url} target="_blank" className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl text-primary hover:bg-primary/10 transition-colors">
                              <FileText size={20} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate">Download Project Brochure</p>
                                <p className="text-[9px] opacity-60 truncate">{modal.project.brochure_url}</p>
                              </div>
                            </a>
                          ) : (
                            <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs text-center">No brochure uploaded</div>
                          )}
                       </div>
                       <div className="col-span-1 md:col-span-2 space-y-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Gallery</p>
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {modal.project.gallery && modal.project.gallery.map((img: string, i: number) => (
                              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200 relative bg-slate-50 group/img">
                                <Image src={img} alt={`View ${i}`} fill className="object-cover" />
                              </div>
                            ))}
                            {(!modal.project.gallery || modal.project.gallery.length === 0) && (
                              <div className="col-span-full py-10 border-2 border-dashed border-slate-100 rounded-2xl text-center text-slate-300 text-xs font-medium">
                                No gallery images uploaded
                              </div>
                            )}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50">
                    <button onClick={() => openModal("edit", modal.project)} className="flex-1 py-4 bg-secondary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-800 transition-colors shadow-lg shadow-secondary/10">Edit Project</button>
                    <button onClick={closeModal} className="px-8 py-4 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
                  </div>
                </div>
              )}

              {/* View/Delete Modals (Truncated for brevity, reusing original logic) */}
              {modal.mode === "delete" && modal.project && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5 text-red-500">
                    <Trash2 size={28} />
                  </div>
                  <h3 className="font-montserrat font-bold text-slate-900 text-lg mb-2">Delete Project?</h3>
                  <p className="font-jakarta text-slate-500 text-sm mb-8">
                    Are you sure you want to remove <span className="font-bold text-slate-700">{modal.project.title}</span>?
                  </p>
                  <div className="flex gap-3">
                    <button onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button onClick={handleDelete} disabled={saving} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                      {saving && <Loader2 size={14} className="animate-spin" />}
                      Delete
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
