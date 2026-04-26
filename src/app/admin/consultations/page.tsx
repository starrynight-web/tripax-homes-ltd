"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCheck, 
  Trash2, 
  Search, 
  X, 
  Loader2, 
  ShieldAlert,
  Building2,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConsultations, updateConsultationStatus, deleteConsultation } from "@/app/actions/consultations";
import { cn } from "@/lib/utils";

type ConsultationStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

const statusStyles: Record<ConsultationStatus, string> = {
  Pending:   "bg-amber-100 text-amber-700 border-none",
  Confirmed: "bg-blue-100 text-blue-700 border-none",
  Completed: "bg-emerald-100 text-emerald-700 border-none",
  Cancelled: "bg-slate-100 text-slate-500 border-none",
};

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
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
      const data = await getConsultations();
      setConsultations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = consultations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: ConsultationStatus) => {
    setSaving(true);
    try {
      await updateConsultationStatus(id, status);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
      if (selected?.id === id) setSelected((s: any) => s ? { ...s, status } : null);
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    setSaving(true);
    try {
      await deleteConsultation(id);
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Consultations & Visits</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">Review and manage private bookings and site visits.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or type..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
        {/* List Pane */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-none shadow-sm overflow-hidden h-full">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="font-montserrat text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
                {loading ? "Refreshing..." : `${filtered.length} Bookings`}
                {loading && <Loader2 size={12} className="animate-spin" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-50 max-h-[700px] overflow-y-auto">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={cn(
                    "p-5 cursor-pointer transition-all hover:bg-slate-50 flex items-start justify-between group",
                    selected?.id === item.id ? "bg-primary/5 border-l-2 border-primary" : "border-l-2 border-transparent"
                  )}
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                       <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={cn("text-[9px] px-2 py-0 font-bold uppercase tracking-widest", item.type === "Site Visit" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")}>
                        {item.type}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className={cn("text-slate-300 transition-transform", selected?.id === item.id && "translate-x-1 text-primary")} />
                </div>
              ))}
              {!loading && filtered.length === 0 && (
                <div className="p-12 text-center text-slate-300">
                  <Calendar size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-xs uppercase tracking-widest font-bold">No bookings found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detail Pane */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full"
              >
                <Card className="border-none shadow-sm overflow-hidden h-full flex flex-col">
                  <div className={cn("h-2 w-full", selected.type === "Site Visit" ? "bg-purple-500" : "bg-primary")} />
                  <CardHeader className="p-8 border-b border-slate-100">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <Badge className={cn("font-bold uppercase tracking-widest text-[10px] px-3 py-1", statusStyles[selected.status as ConsultationStatus])}>
                          {selected.status}
                        </Badge>
                        <CardTitle className="text-3xl font-montserrat font-bold text-slate-900">{selected.name}</CardTitle>
                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                           <div className="flex items-center gap-1.5">
                              <Mail size={14} />
                              <span>{selected.email}</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <Phone size={14} />
                              <span>{selected.phone}</span>
                           </div>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Booking Date</span>
                         <span className="text-lg font-montserrat font-bold text-slate-900">{new Date(selected.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 flex-1 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Preferred Time</span>
                              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                 <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                                    <Clock size={18} />
                                 </div>
                                 <span className="font-bold text-slate-900">{selected.time}</span>
                              </div>
                           </div>
                           
                           {selected.project_name && (
                             <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Interested Project</span>
                                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                   <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent">
                                      <Building2 size={18} />
                                   </div>
                                   <span className="font-bold text-slate-900 uppercase tracking-tight">{selected.project_name}</span>
                                </div>
                             </div>
                           )}
                        </div>

                        <div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Additional Details</span>
                           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 min-h-[120px] italic text-slate-600 text-sm leading-relaxed">
                              {selected.message || "No additional message provided by the client."}
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-4 pt-8 border-t border-slate-100">
                        {selected.status === "Pending" && (
                           <button
                             onClick={() => handleUpdateStatus(selected.id, "Confirmed")}
                             disabled={saving}
                             className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-slate-800 transition-all shadow-xl shadow-primary/10"
                           >
                             <CheckCheck size={16} />
                             Confirm Booking
                           </button>
                        )}
                        {selected.status === "Confirmed" && (
                           <button
                             onClick={() => handleUpdateStatus(selected.id, "Completed")}
                             disabled={saving}
                             className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-emerald-600 transition-all"
                           >
                             <CheckCheck size={16} />
                             Mark Completed
                           </button>
                        )}
                        <button
                          onClick={() => handleUpdateStatus(selected.id, "Cancelled")}
                          disabled={saving || selected.status === "Cancelled"}
                          className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl font-montserrat font-bold text-[10px] tracking-widest uppercase hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(selected.id)}
                          disabled={saving}
                          className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-100 hover:text-red-600 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 bg-white rounded-3xl border border-dashed border-slate-100 p-20">
                <Calendar size={60} className="mb-6 opacity-10" />
                <h3 className="font-montserrat font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-sm">Booking Viewer</h3>
                <p className="font-jakarta text-xs text-slate-400">Select a consultation or site visit to manage</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
