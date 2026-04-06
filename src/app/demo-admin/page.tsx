"use client";

import React from "react";
import { motion } from "motion/react";
import { Users, FolderKanban, MessageSquare, TrendingUp, ArrowUpRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { label: "Active Projects",  value: "12",    icon: FolderKanban,  color: "bg-blue-500",    trend: "+2 this month" },
  { label: "Total Inquiries",  value: "48",    icon: MessageSquare, color: "bg-emerald-500", trend: "+15% from last week" },
  { label: "Total Visitors",   value: "1,294", icon: Users,         color: "bg-amber-500",   trend: "+24% increase" },
  { label: "Completion Rate",  value: "98%",   icon: TrendingUp,    color: "bg-teal-500",    trend: "Target: 100%" },
];

const RECENT_INQUIRIES = [
  { initials: "FA", name: "Farhan Ahmed",  time: "10m ago", project: "TRIPAX PORTIA",    status: "New" },
  { initials: "NJ", name: "Nusrat Jahan", time: "2h ago",  project: "TRIPAX VERONA",    status: "In Progress" },
  { initials: "RI", name: "Rakib Islam",  time: "4h ago",  project: "TRIPAX DESDEMONA", status: "New" },
];

export default function DemoAdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Overview Dashboard</h1>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <FlaskConical size={11} />
            Demo
          </span>
        </div>
        <p className="text-slate-500 font-jakarta text-sm">
          Welcome to the Demo Admin Panel. Explore the UI — no changes are saved.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.trend}</span>
                </div>
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                <p className="text-3xl font-montserrat font-extrabold text-slate-900 leading-tight">{stat.value}</p>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-montserrat font-bold text-lg">Recent Inquiries</CardTitle>
              <CardDescription>Latest contact requests from potential clients.</CardDescription>
            </div>
            <Link href="/demo-admin/inquiries" className="text-primary hover:underline font-bold text-xs uppercase tracking-widest flex items-center gap-1 group">
              View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_INQUIRIES.map((inq) => (
                <div key={inq.name} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center font-bold text-slate-600 text-xs">
                    {inq.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {inq.name} <span className="text-[10px] text-slate-400 font-normal ml-2">{inq.time}</span>
                    </h4>
                    <p className="text-xs text-slate-500 truncate max-w-xs">Interested in {inq.project}...</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-2 py-0.5 border-none ${inq.status === "New" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {inq.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-none shadow-sm bg-linear-to-br from-primary to-indigo-900 text-white">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-white/60">Navigate to key sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/demo-admin/projects" className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-all text-sm font-bold border border-white/5 backdrop-blur-sm">
              <FolderKanban size={18} />
              Manage Projects
            </Link>
            <Link href="/demo-admin/inquiries" className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-all text-sm font-bold border border-white/5 backdrop-blur-sm">
              <MessageSquare size={18} />
              View Inquiries
            </Link>
            <Link href="/demo-admin/settings" className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-all text-sm font-bold border border-white/5 backdrop-blur-sm">
              <Users size={18} />
              Settings
            </Link>
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 underline decoration-accent underline-offset-4">System Status</p>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Online
                </span>
                <span className="text-white/40">v1.2.x</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
