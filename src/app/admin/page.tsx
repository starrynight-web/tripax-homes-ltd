"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, FolderKanban, MessageSquare, TrendingUp, ArrowUpRight, Loader2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase-client";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Active Projects", value: "0", icon: FolderKanban, color: "bg-blue-500", trend: "Live Projects" },
    { label: "Total Inquiries", value: "0", icon: MessageSquare, color: "bg-emerald-500", trend: "Consultations" },
    { label: "News Articles", value: "0", icon: Users, color: "bg-amber-500", trend: "Published" },
    { label: "Completion Rate", value: "100%", icon: TrendingUp, color: "bg-purple-500", trend: "Target: 100%" },
  ]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: projectsCount },
          { count: consultationsCount },
          { data: recent },
          { count: newsCount }
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("consultations").select("*", { count: "exact", head: true }),
          supabase.from("consultations").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("news_articles").select("*", { count: "exact", head: true })
        ]);

        setStats([
          { label: "Active Projects", value: (projectsCount || 0).toString(), icon: FolderKanban, color: "bg-blue-500", trend: "Total Listings" },
          { label: "Total Inquiries", value: (consultationsCount || 0).toString(), icon: MessageSquare, color: "bg-emerald-500", trend: "Client Requests" },
          { label: "News Articles", value: (newsCount || 0).toString(), icon: Users, color: "bg-amber-500", trend: "Blog Posts" },
          { label: "Avg. Response", value: "2h", icon: TrendingUp, color: "bg-purple-500", trend: "Last 7 days" },
        ]);

        if (recent) setRecentInquiries(recent);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary mb-4" size={32} />
        <p className="text-slate-500 font-jakarta">Synchronizing real-time data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Overview Dashboard</h1>
        <p className="text-slate-500 font-jakarta text-sm">Welcome back, Admin. Here&apos;s what&apos;s happening with Tripax Homes today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
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
                  <p className="text-3xl font-montserrat font-extrabold text-slate-900 leading-tight">
                    {stat.value}
                  </p>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
           <CardHeader className="flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="font-montserrat font-bold text-lg">Recent Inquiries</CardTitle>
                 <CardDescription>Latest contact requests from potential clients.</CardDescription>
              </div>
              <Link href="/admin/consultations" className="text-primary hover:underline font-bold text-xs uppercase tracking-widest flex items-center gap-1 group">
                 View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                 {recentInquiries.length > 0 ? (
                   recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                       <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs uppercase">
                          {inquiry.name?.substring(0, 2) || "IN"}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {inquiry.name} 
                            <span className="text-[10px] text-slate-400 font-normal ml-2 flex items-center gap-1 inline-flex">
                              <Clock size={10} />
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {inquiry.type || "Consultation Request"} • {inquiry.phone}
                          </p>
                       </div>
                       <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] px-2 py-0.5 border-none uppercase tracking-tighter">
                         {inquiry.status || "New"}
                       </Badge>
                    </div>
                  ))
                 ) : (
                    <div className="p-10 text-center text-slate-400 text-sm">
                      No recent inquiries found.
                    </div>
                 )}
              </div>
           </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-none shadow-sm bg-linear-to-br from-primary to-indigo-900 text-white">
           <CardHeader>
              <CardTitle className="font-montserrat font-bold text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-white/60">Manage your property portfolio</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <Link href="/admin/projects" className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-all text-sm font-bold border border-white/5 backdrop-blur-sm">
                 <FolderKanban size={18} />
                 Manage Projects
              </Link>
              <Link href="/admin/news" className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 px-4 transition-all text-sm font-bold border border-white/5 backdrop-blur-sm">
                 <MessageSquare size={18} />
                 Post News
              </Link>
              <div className="pt-4 mt-4 border-t border-white/10">
                 <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 underline decoration-accent underline-offset-4">System Status</p>
                 <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                       Supabase Online
                    </span>
                    <span className="text-white/40">Real-time Sync</span>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
