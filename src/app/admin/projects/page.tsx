"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { projectsMock, Project, ProjectCategory } from "@/data/projectsMock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusColors: Record<ProjectCategory, { bg: string; text: string; icon: React.ReactNode }> = {
  Ongoing:      { bg: "bg-blue-100",   text: "text-blue-700",   icon: <Clock size={12} /> },
  Upcoming:     { bg: "bg-amber-100",  text: "text-amber-700",  icon: <AlertCircle size={12} /> },
  "Handed Over":{ bg: "bg-emerald-100",text: "text-emerald-700",icon: <CheckCircle2 size={12} /> },
  Ready:        { bg: "bg-teal-100",   text: "text-teal-700",   icon: <Building2 size={12} /> },
};

type ModalMode = "view" | "edit" | "delete" | "add" | null;

const EMPTY_PROJECT: Omit<Project, 'id' | 'slug'> = {
  title: "",
  subtitle: "",
  location: "",
  region: "",
  category: "Upcoming",
  type: "Residential",
  overview: "",
  progressPercent: 0,
  thumbnail: "/images/projects/Exterior/exterior.png",
  homepageThumbnail: "/images/projects/Exterior/exterior.png",
  gallery: [],
  specs: {
    orientation: "",
    frontRoad: "",
    landSize: "",
    apartmentSize: "",
    towers: "",
    numberOfApartments: "",
    numberOfParking: "",
    numberOfFloors: "",
  },
};

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "All">("All");
  const [projects, setProjects] = useState<Project[]>(projectsMock);
  const [modal, setModal] = useState<{ mode: ModalMode; project: Project | null }>({ mode: null, project: null });

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory === "All" || p.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [projects, search, filterCategory]);

  const openModal = (mode: ModalMode, project: Project) => setModal({ mode, project });
  const closeModal = () => setModal({ mode: null, project: null });

  const handleDelete = () => {
    if (modal.project) {
      setProjects((prev) => prev.filter((p) => p.id !== modal.project!.id));
    }
    closeModal();
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get  = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)?.value ?? "";
    const title = get("add_title").trim();
    if (!title) return;
    const newProject: Project = {
      ...EMPTY_PROJECT,
      id:       Date.now().toString(),
      slug:     title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title:    title.toUpperCase(),
      subtitle: get("add_subtitle"),
      location: get("add_location"),
      region:   get("add_region"),
      category: get("add_category") as ProjectCategory,
      type:     get("add_type") as any,
      overview: get("add_overview"),
      progressPercent: Number(get("add_progress")) || 0,
    };
    setProjects((prev) => [newProject, ...prev]);
    closeModal();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">
            Manage all Tripax real estate listings.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add", project: null })}
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
              className={`border-none shadow-sm cursor-pointer transition-all ${filterCategory === (cat === "All" ? "All" : cat) ? "ring-2 ring-primary" : "hover:shadow-md"}`}
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
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X size={14} />
            </button>
          )}
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
        <CardHeader className="border-b border-slate-100 bg-slate-50">
          <CardTitle className="font-montserrat text-sm font-bold text-slate-500 uppercase tracking-widest">
            {filtered.length} Project{filtered.length !== 1 ? "s" : ""} Found
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Project", "Location", "Type", "Status", "Progress", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((project, idx) => {
                    const status = statusColors[project.category];
                    return (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        {/* Project name + thumbnail */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div>
                              <p className="font-montserrat font-bold text-sm text-slate-900 whitespace-nowrap">{project.title}</p>
                              <p className="font-jakarta text-[11px] text-slate-400">{project.subtitle}</p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4">
                          <p className="font-jakarta text-xs text-slate-600 max-w-[160px] truncate">{project.location}</p>
                          <p className="font-jakarta text-[11px] text-slate-400">{project.region}</p>
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4">
                          <span className="font-jakarta text-xs text-slate-600">{project.type}</span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${status.bg} ${status.text}`}>
                            {status.icon}
                            {project.category}
                          </span>
                        </td>

                        {/* Progress */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${project.progressPercent}%` }}
                              />
                            </div>
                            <span className="font-montserrat font-bold text-xs text-slate-700">{project.progressPercent}%</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openModal("view", project)}
                              title="View"
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-primary hover:text-white flex items-center justify-center text-slate-500 transition-colors"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => openModal("edit", project)}
                              title="Edit"
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center text-slate-500 transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => openModal("delete", project)}
                              title="Delete"
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white flex items-center justify-center text-slate-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <p className="font-jakarta text-slate-400 text-sm">No projects match your search criteria.</p>
                      <button onClick={() => { setSearch(""); setFilterCategory("All"); }} className="mt-3 text-primary font-bold text-xs uppercase tracking-widest hover:underline">
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ────────── MODALS ────────── */}
      <AnimatePresence>
        {modal.mode && modal.project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* View Modal */}
              {modal.mode === "view" && (
                <div className="max-h-[90vh] overflow-y-auto">
                  {/* Exterior Hero Image */}
                  <div className="relative h-64">
                    <Image src={modal.project.thumbnail} alt={modal.project.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold mb-2 ${statusColors[modal.project.category].bg} ${statusColors[modal.project.category].text}`}>
                          {statusColors[modal.project.category].icon}
                          {modal.project.category}
                        </span>
                        <h3 className="font-montserrat font-bold text-white text-xl">{modal.project.title}</h3>
                        <p className="text-white/70 text-xs font-jakarta mt-1">{modal.project.subtitle}</p>
                      </div>
                    </div>
                    <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                      <X size={14} />
                    </button>
                  </div>

                  {/* Interior Gallery Strip */}
                  {modal.project.gallery.length > 0 && (
                    <div className="flex gap-2 px-4 pt-4 overflow-x-auto hide-scrollbar pb-1">
                      {modal.project.gallery.map((img, i) => (
                        <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <Image src={img} alt={`Interior ${i + 1}`} fill className="object-cover" sizes="96px" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Overview</p>
                      <p className="font-jakarta text-sm text-slate-600 leading-relaxed">{modal.project.overview}</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion</p>
                        <span className="font-montserrat font-bold text-xs text-slate-700">{modal.project.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${modal.project.progressPercent}%` }} />
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Specifications</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(modal.project.specs).map(([k, v]) => (
                          <div key={k} className="bg-slate-50 rounded-xl p-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.replace(/([A-Z])/g, " $1")}</p>
                            <p className="font-montserrat font-bold text-xs text-slate-800 mt-0.5">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Add Project Modal */}
              {modal.mode === "add" && (
                <div className="p-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-montserrat font-bold text-slate-900 text-lg">Add New Project</h3>
                      <p className="text-slate-400 text-xs font-jakarta mt-0.5">Fill in the details below to create a listing.</p>
                    </div>
                    <button onClick={closeModal}><X size={18} className="text-slate-400 hover:text-slate-700" /></button>
                  </div>

                  <form onSubmit={handleAdd} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Title *</label>
                        <input name="add_title" required placeholder="e.g. TRIPAX AURORA" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtitle</label>
                        <input name="add_subtitle" placeholder="e.g. Luxury in the Heart of Dhaka" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                        <input name="add_location" placeholder="Road, Area, City" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Region</label>
                        <input name="add_region" placeholder="e.g. Gulshan, Banani" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                        <select name="add_category" defaultValue="Upcoming" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                          <option>Ongoing</option>
                          <option>Upcoming</option>
                          <option>Handed Over</option>
                          <option>Ready</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label>
                        <select name="add_type" defaultValue="Residential" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                          <option>Residential</option>
                          <option>Commercial</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion % (0–100)</label>
                        <input name="add_progress" type="number" min={0} max={100} placeholder="0" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overview</label>
                        <textarea name="add_overview" rows={3} placeholder="Brief description of the project..." className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                      <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors">
                        Add Project
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-slate-400 font-jakarta">⚠️ Demo mode — added to local state only.</p>
                  </form>
                </div>
              )}

              {/* Edit Modal (UI-only demo) */}
              {modal.mode === "edit" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-montserrat font-bold text-slate-900 text-lg">Edit Project</h3>
                    <button onClick={closeModal}><X size={18} className="text-slate-400 hover:text-slate-700" /></button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Title</label>
                      <input defaultValue={modal.project.title} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtitle</label>
                      <input defaultValue={modal.project.subtitle} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                      <select defaultValue={modal.project.category} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                        <option>Ongoing</option>
                        <option>Upcoming</option>
                        <option>Handed Over</option>
                        <option>Ready</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion %</label>
                      <input type="number" defaultValue={modal.project.progressPercent} min={0} max={100} className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button onClick={closeModal} className="flex-1 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors">
                      Save Changes
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-jakarta">⚠️ Demo mode — changes are not persisted.</p>
                </div>
              )}


              {/* Delete Confirmation Modal */}
              {modal.mode === "delete" && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                    <Trash2 size={28} className="text-red-500" />
                  </div>
                  <h3 className="font-montserrat font-bold text-slate-900 text-lg mb-2">Delete Project?</h3>
                  <p className="font-jakarta text-slate-500 text-sm mb-8">
                    Are you sure you want to remove <span className="font-bold text-slate-700">{modal.project.title}</span>? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={closeModal} className="flex-1 py-3 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-red-600 transition-colors">
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
