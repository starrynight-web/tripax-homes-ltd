"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut, PackageOpen, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, name: "Overview", href: "/admin" },
  { icon: FolderKanban, name: "Projects", href: "/admin/projects" },
  { icon: MessageSquare, name: "Inquiries", href: "/admin/inquiries" },
  { icon: PackageOpen, name: "Resources", href: "/admin/resources" },
  { icon: LayoutTemplate, name: "CMS Config", href: "/admin/config" },
  { icon: Settings, name: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50 font-jakarta">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-400 border-r border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-xl">
              <span className="font-montserrat font-bold text-xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-white tracking-tight leading-none">TRIPAX</span>
              <span className="font-montserrat text-[10px] text-slate-500 uppercase tracking-widest mt-1">Admin Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-primary")} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-slate-800 hover:text-white transition-all">
            <LogOut size={20} className="text-slate-500" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-72">
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
          <h2 className="font-montserrat font-bold text-lg text-slate-900 capitalize">
            {NAV_ITEMS.find((i) => i.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
             <div className="text-right flex flex-col">
                <span className="text-xs font-bold text-slate-900">Admin User</span>
                <span className="text-[10px] text-slate-500">Super Admin</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-primary">
                A
             </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
