"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Download,
  Eye,
  Search,
  X,
  BookOpen,
  ImageIcon,
  FileSpreadsheet,
  Presentation,
  ExternalLink,
  Upload,
  FolderOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResourceType = "All" | "Brochure" | "Floor Plan" | "Report" | "Media Kit" | "Presentation";

const typeIcon: Record<string, React.ReactNode> = {
  Brochure:     <BookOpen size={18} className="text-blue-500" />,
  "Floor Plan": <FileSpreadsheet size={18} className="text-emerald-500" />,
  Report:       <FileText size={18} className="text-amber-500" />,
  "Media Kit":  <ImageIcon size={18} className="text-rose-500" />,
  Presentation: <Presentation size={18} className="text-teal-500" />,
};

const typeBg: Record<string, string> = {
  Brochure:     "bg-blue-50",
  "Floor Plan": "bg-emerald-50",
  Report:       "bg-amber-50",
  "Media Kit":  "bg-rose-50",
  Presentation: "bg-teal-50",
};

interface Resource {
  id: string;
  name: string;
  project: string;
  type: keyof typeof typeIcon;
  size: string;
  updated: string;
  pages?: number;
}

const RESOURCES: Resource[] = [
  { id: "1", name: "TRIPAX PORTIA — Sales Brochure",       project: "TRIPAX PORTIA",    type: "Brochure",     size: "4.2 MB", updated: "1 Apr 2026",  pages: 24 },
  { id: "2", name: "TRIPAX PORTIA — Floor Plans (All)",    project: "TRIPAX PORTIA",    type: "Floor Plan",   size: "6.8 MB", updated: "28 Mar 2026", pages: 12 },
  { id: "3", name: "TRIPAX VERONA — Sales Brochure",       project: "TRIPAX VERONA",    type: "Brochure",     size: "3.9 MB", updated: "25 Mar 2026", pages: 20 },
  { id: "4", name: "TRIPAX VERONA — Investor Report Q1",   project: "TRIPAX VERONA",    type: "Report",       size: "1.1 MB", updated: "1 Apr 2026",  pages: 8 },
  { id: "5", name: "TRIPAX DESDEMONA — Commercial Pack",   project: "TRIPAX DESDEMONA", type: "Presentation", size: "9.2 MB", updated: "20 Mar 2026", pages: 36 },
  { id: "6", name: "TRIPAX DESDEMONA — Floor Plans",       project: "TRIPAX DESDEMONA", type: "Floor Plan",   size: "5.4 MB", updated: "18 Mar 2026", pages: 6 },
  { id: "7", name: "TRIPAX OTHELLO — Media Kit",           project: "TRIPAX OTHELLO",   type: "Media Kit",    size: "24 MB",  updated: "10 Mar 2026" },
  { id: "8", name: "TRIPAX OTHELLO — Q4 Completion Report",project: "TRIPAX OTHELLO",   type: "Report",       size: "800 KB", updated: "2 Apr 2026",  pages: 5 },
  { id: "9", name: "Company Overview — Marketing Deck",    project: "Corporate",        type: "Presentation", size: "11 MB",  updated: "15 Mar 2026", pages: 42 },
];

const FILTER_TYPES: ResourceType[] = ["All", "Brochure", "Floor Plan", "Report", "Media Kit", "Presentation"];

export default function AdminResourcesPage() {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<ResourceType>("All");

  const filtered = RESOURCES.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.project.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Resources</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">Manage brochures, floor plans, reports, and media.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <Upload size={15} />
          Upload File
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {FILTER_TYPES.filter((t) => t !== "All").map((type) => {
          const count = RESOURCES.filter((r) => r.type === type).length;
          return (
            <Card
              key={type}
              className={`border-none shadow-sm cursor-pointer transition-all ${filter === type ? "ring-2 ring-primary" : "hover:shadow-md"}`}
              onClick={() => setFilter(type)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${typeBg[type]} flex items-center justify-center shrink-0`}>
                  {typeIcon[type]}
                </div>
                <div>
                  <p className="font-montserrat font-extrabold text-2xl text-slate-900 leading-none">{count}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{type}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search + Filter Pills */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name or project..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === t ? "bg-primary text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/40"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((res, idx) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Icon + type */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl ${typeBg[res.type]} flex items-center justify-center`}>
                      {typeIcon[res.type]}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-sm text-slate-900 mb-1 leading-snug group-hover:text-primary transition-colors">
                    {res.name}
                  </h3>
                  <p className="text-xs text-accent font-bold uppercase tracking-wider mb-3">{res.project}</p>

                  {/* Meta */}
                  <div className="flex gap-4 mt-auto mb-5">
                    <span className="text-xs text-slate-400 font-jakarta">{res.size}</span>
                    {res.pages && <span className="text-xs text-slate-400 font-jakarta">{res.pages} pages</span>}
                    <span className="text-xs text-slate-400 font-jakarta ml-auto">{res.updated}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 border-t border-slate-100 pt-4">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-600 hover:text-primary bg-slate-50 hover:bg-primary/5 rounded-lg transition-colors">
                      <Eye size={13} />
                      Preview
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors">
                      <Download size={13} />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <FolderOpen size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="font-jakarta text-slate-400 text-sm">No resources match your criteria.</p>
          <button onClick={() => { setSearch(""); setFilter("All"); }} className="mt-3 text-primary font-bold text-xs uppercase tracking-widest hover:underline">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
