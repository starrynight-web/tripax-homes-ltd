"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Bell, ShieldCheck, Palette, Database, Save, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "data", label: "Data & Privacy", icon: Database },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    newInquiry: true,
    projectUpdate: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-jakarta text-sm mt-1">Manage your admin account and preferences.</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Tabs */}
        <div className="w-52 shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Panel */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold text-slate-900">Profile Information</CardTitle>
                  <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Avatar */}
                  <div className="flex items-center gap-5 pb-5 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-montserrat font-bold text-white text-2xl">A</div>
                    <div>
                      <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Change Photo</button>
                      <p className="text-xs text-slate-400 font-jakarta mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                      <input defaultValue="Admin" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                      <input defaultValue="User" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input defaultValue="admin@tripaxhomes.com" type="email" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
                    <input defaultValue="Super Admin" disabled className="mt-1 w-full border border-slate-100 rounded-lg px-4 py-3 font-jakarta text-sm bg-slate-50 text-slate-400 cursor-not-allowed" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold text-slate-900">Notification Preferences</CardTitle>
                  <CardDescription>Choose which events trigger alerts.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-slate-100">
                  {[
                    { key: "newInquiry",      label: "New Inquiry",       desc: "When a new client inquiry is submitted" },
                    { key: "projectUpdate",   label: "Project Update",    desc: "When a project status changes" },
                    { key: "weeklyReport",    label: "Weekly Report",     desc: "Summary of the past week's activity" },
                    { key: "marketingEmails", label: "Marketing Emails",  desc: "Promotional content and newsletters" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{label}</p>
                        <p className="text-xs text-slate-400 font-jakarta">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-slate-200"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications[key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold text-slate-900">Security Settings</CardTitle>
                  <CardDescription>Manage your password and access controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-400 font-jakarta">Require a code on each login</p>
                      </div>
                      <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Not Set Up
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold text-slate-900">Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the admin panel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Theme Mode</p>
                    <div className="flex gap-3">
                      {["Light", "Dark", "System"].map((mode) => (
                        <button key={mode} className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${mode === "Light" ? "border-primary text-primary bg-primary/5" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sidebar Layout</p>
                    <div className="flex gap-3">
                      {["Compact", "Default", "Wide"].map((layout) => (
                        <button key={layout} className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${layout === "Default" ? "border-primary text-primary bg-primary/5" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                          {layout}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Data Tab */}
          {activeTab === "data" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold text-slate-900">Data & Privacy</CardTitle>
                  <CardDescription>Manage your data and export options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Export All Inquiries", desc: "Download a CSV of all client inquiry data", action: "Export CSV" },
                    { label: "Export Project Data",  desc: "Download all project records as JSON",     action: "Export JSON" },
                    { label: "Clear Analytics Cache", desc: "Refresh all dashboard counters",           action: "Clear Cache" },
                  ].map(({ label, desc, action }) => (
                    <div key={label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{label}</p>
                        <p className="text-xs text-slate-400 font-jakarta">{desc}</p>
                      </div>
                      <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold font-montserrat uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
                        {action}
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Save size={14} />
              Save Changes
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-600 text-xs font-bold"
              >
                <CheckCircle2 size={14} />
                Changes saved (demo)
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
