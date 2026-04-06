"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, CheckCheck, Trash2, Search, X, Clock, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type InquiryStatus = "New" | "In Progress" | "Resolved";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
  status: InquiryStatus;
  time: string;
  initials: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: "1", name: "Farhan Ahmed",    email: "farhan@example.com",  phone: "+880 171 234 5678", project: "TRIPAX PORTIA",     message: "I am interested in a 3-bedroom apartment in Gulshan. Please arrange a site visit at the earliest.",               status: "New",         time: "10m ago",  initials: "FA" },
  { id: "2", name: "Nusrat Jahan",    email: "nusrat@example.com",  phone: "+880 181 234 5678", project: "TRIPAX VERONA",     message: "Looking for investment opportunities in Banani. What are the available units for TRIPAX VERONA?",           status: "In Progress", time: "2h ago",   initials: "NJ" },
  { id: "3", name: "Rakibul Islam",   email: "rakib@example.com",   phone: "+880 191 234 5678", project: "TRIPAX DESDEMONA",  message: "We require a commercial space for our regional HQ. Can you send me the floor plan and pricing?",              status: "New",         time: "4h ago",   initials: "RI" },
  { id: "4", name: "Dr. Kamrun N.",   email: "kamrun@example.com",  phone: "+880 161 234 5678", project: "TRIPAX OTHELLO",    message: "Interested in a ready apartment in Uttara. Could you clarify the handover timeline and documentation?",        status: "Resolved",    time: "1d ago",   initials: "KN" },
  { id: "5", name: "Tarek Hossain",   email: "tarek@example.com",   phone: "+880 151 234 5678", project: "TRIPAX PORTIA",     message: "We are a family of four looking for a premium residence in Gulshan. Very interested in TRIPAX PORTIA.",        status: "New",         time: "2d ago",   initials: "TH" },
  { id: "6", name: "Salma Begum",     email: "salma@example.com",   phone: "+880 141 234 5678", project: "General Inquiry",   message: "I would like a general overview of all Tripax projects. A meeting with a sales representative would be great.",  status: "In Progress", time: "3d ago",   initials: "SB" },
];

const statusStyles: Record<InquiryStatus, string> = {
  New:           "bg-blue-100 text-blue-700 border-none",
  "In Progress": "bg-amber-100 text-amber-700 border-none",
  Resolved:      "bg-emerald-100 text-emerald-700 border-none",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.project.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase())
  );

  const markResolved = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Resolved" } : i))
    );
    if (selected?.id === id) setSelected((s) => s ? { ...s, status: "Resolved" } : null);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List Pane */}
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50">
            <CardTitle className="font-montserrat text-sm font-bold text-slate-500 uppercase tracking-widest">
              {filtered.length} Inquir{filtered.length !== 1 ? "ies" : "y"}
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
                className={`flex items-start gap-4 p-5 cursor-pointer transition-colors hover:bg-slate-50 ${selected?.id === inq.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                  {inq.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{inq.name}</h4>
                    <Badge variant="secondary" className={`text-[10px] px-2 py-0.5 shrink-0 ${statusStyles[inq.status]}`}>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-jakarta truncate">{inq.project}</p>
                  <p className="text-xs text-slate-400 font-jakarta truncate mt-1">{inq.message}</p>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm font-jakarta">No inquiries found.</div>
            )}
          </CardContent>
        </Card>

        {/* Detail Pane */}
        <div className="sticky top-24">
          {selected ? (
            <Card className="border-none shadow-sm h-full">
              <CardHeader className="border-b border-slate-100 flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="font-montserrat font-bold text-slate-900">{selected.name}</CardTitle>
                  <CardDescription className="text-accent font-bold">{selected.project}</CardDescription>
                </div>
                <Badge variant="secondary" className={`text-[10px] px-2 py-1 shrink-0 ${statusStyles[selected.status]}`}>
                  {selected.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={14} className="text-slate-400" />
                  <a href={`mailto:${selected.email}`} className="hover:text-primary transition-colors">{selected.email}</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={14} className="text-slate-400" />
                  <a href={`tel:${selected.phone}`} className="hover:text-primary transition-colors">{selected.phone}</a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>{selected.time}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message</p>
                  <p className="font-jakarta text-sm text-slate-700 leading-relaxed">{selected.message}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  {selected.status !== "Resolved" && (
                    <button
                      onClick={() => markResolved(selected.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-emerald-600 transition-colors"
                    >
                      <CheckCheck size={14} />
                      Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => deleteInquiry(selected.id)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-500 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300">
              <Eye size={40} className="mb-3" />
              <p className="font-jakarta text-sm">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
