"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, CheckCheck, Trash2, Search, X, Clock, Mail, Phone, Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/app/actions/inquiries";
import { cn } from "@/lib/utils";

type InquiryStatus = "New" | "In Progress" | "Resolved";

const statusStyles: Record<InquiryStatus, string> = {
  New:           "bg-blue-100 text-blue-700 border-none",
  "In Progress": "bg-amber-100 text-amber-700 border-none",
  Resolved:      "bg-emerald-100 text-emerald-700 border-none",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = inquiries.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    (i.project?.toLowerCase().includes(search.toLowerCase())) ||
    i.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: InquiryStatus) => {
    setSaving(true);
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
      if (selected?.id === id) setSelected((s: any) => s ? { ...s, status } : null);
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setSaving(true);
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert("Failed to delete inquiry");
    } finally {
      setSaving(false);
    }
  };

  const stats = {
    New: inquiries.filter((i) => i.status === "New").length,
    "In Progress": inquiries.filter((i) => i.status === "In Progress").length,
    Resolved: inquiries.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Inquiries</h1>
        <p className="text-slate-500 font-jakarta text-sm mt-1">Manage and respond to client inquiries.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {(["New", "In Progress", "Resolved"] as InquiryStatus[]).map((s) => (
          <Card key={s} className="border-none shadow-sm">
            <CardContent className="p-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s}</p>
              <p className="text-3xl font-montserrat font-extrabold text-slate-900">{stats[s]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, project, or email..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Two-pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* List Pane */}
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50">
            <CardTitle className="font-montserrat text-sm font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
              {loading ? "Syncing..." : `${filtered.length} Inquir${filtered.length !== 1 ? "ies" : "y"}`}
              {loading && <Loader2 size={14} className="animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-50">
            {filtered.map((inq, idx) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => setSelected(inq)}
                className={cn(
                  "flex items-start gap-4 p-5 cursor-pointer transition-colors hover:bg-slate-50 relative",
                  selected?.id === inq.id && "bg-primary/5 border-l-2 border-primary"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-[10px] shrink-0 uppercase tracking-widest">
                  {inq.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{inq.name}</h4>
                    <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5 shrink-0 font-bold uppercase tracking-widest", statusStyles[inq.status as InquiryStatus])}>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest truncate">{inq.project || "General Inquiry"}</p>
                  <p className="text-xs text-slate-400 font-jakarta truncate mt-1">{inq.message}</p>
                </div>
              </motion.div>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="py-20 text-center text-slate-300">
                <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
                <p className="font-jakarta text-sm">No inquiries found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Pane */}
        <div className="sticky top-24 h-fit">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-100 flex flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="font-montserrat font-bold text-slate-900 text-xl uppercase tracking-tight">{selected.name}</CardTitle>
                      <CardDescription className="text-accent font-bold uppercase tracking-widest text-[10px] mt-1">{selected.project || "General Request"}</CardDescription>
                    </div>
                    <Badge variant="secondary" className={cn("text-[10px] px-3 py-1 shrink-0 font-bold uppercase tracking-widest", statusStyles[selected.status as InquiryStatus])}>
                      {selected.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Mail size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                          <a href={`mailto:${selected.email}`} className="font-bold text-slate-900 hover:text-primary transition-colors">{selected.email}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Phone size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                          <a href={`tel:${selected.phone}`} className="font-bold text-slate-900 hover:text-primary transition-colors">{selected.phone}</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pt-2">
                      <Clock size={12} />
                      <span>Received: {new Date(selected.created_at).toLocaleString()}</span>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Client Message</p>
                      <p className="font-jakarta text-sm text-slate-700 leading-relaxed italic">"{selected.message}"</p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      {selected.status !== "Resolved" && (
                        <button
                          onClick={() => handleUpdateStatus(selected.id, "Resolved")}
                          disabled={saving}
                          className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50"
                        >
                          <CheckCheck size={14} />
                          Mark Resolved
                        </button>
                      )}
                      {selected.status === "New" && (
                        <button
                          onClick={() => handleUpdateStatus(selected.id, "In Progress")}
                          disabled={saving}
                          className="flex-1 flex items-center justify-center gap-2 py-4 bg-amber-500 text-white rounded-xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/10 disabled:opacity-50"
                        >
                          <Clock size={14} />
                          Work On It
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selected.id)}
                        disabled={saving}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-400 rounded-xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-300 bg-white rounded-3xl border border-dashed border-slate-100">
                <Eye size={40} className="mb-3 opacity-20" />
                <p className="font-jakarta text-xs uppercase tracking-widest font-bold">Select an inquiry to view</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

