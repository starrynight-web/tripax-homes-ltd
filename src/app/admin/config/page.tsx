"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  AtSign,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  Link2,
  Bell,
  Palette,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Section = "general" | "contact" | "social" | "seo" | "notifications" | "appearance";

const SECTIONS: { id: Section; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "general",       label: "General",       icon: <Globe size={16} />,    desc: "Site name, logo, and basic settings" },
  { id: "contact",       label: "Contact Info",  icon: <Phone size={16} />,    desc: "Office address, phone, and email" },
  { id: "social",        label: "Social Media",  icon: <Link2 size={16} />,    desc: "Social profile links" },
  { id: "seo",           label: "SEO & Meta",    icon: <Type size={16} />,     desc: "Page titles, descriptions, and OG image" },
  { id: "notifications", label: "Notifications", icon: <Bell size={16} />,     desc: "Inquiry alerts and system emails" },
  { id: "appearance",    label: "Appearance",    icon: <Palette size={16} />,  desc: "Theme colors and typography" },
];

function AccordionSection({
  id, label, icon, desc, active, onToggle, children,
}: {
  id: Section; label: string; icon: React.ReactNode; desc: string;
  active: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-slate-50/80 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-montserrat font-bold text-sm text-slate-900">{label}</h3>
          <p className="text-xs text-slate-400 font-jakarta">{desc}</p>
        </div>
        {active ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-slate-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-bold text-slate-800">{label}</p>
        {desc && <p className="text-xs text-slate-400 font-jakarta">{desc}</p>}
      </div>
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-slate-200"}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function TextField({ label, defaultValue, type = "text", placeholder }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div className="mt-4">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );
}

export default function AdminConfigPage() {
  const [activeSection, setActiveSection] = useState<Section | null>("general");
  const [saved, setSaved] = useState(false);

  const [toggles, setToggles] = useState({
    maintenanceMode: false,
    showProgressBars: true,
    enableContactForm: true,
    inquiryEmailAlert: true,
    weeklyDigest: false,
    autoResponder: true,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((t) => ({ ...t, [key]: !t[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">CMS Config</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">Configure site-wide content and behaviour.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold whitespace-nowrap"
            >
              <CheckCircle2 size={14} />
              Saved (demo)
            </motion.span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Save size={14} />
            Save All
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">

        {/* General */}
        <AccordionSection id="general" label="General" icon={<Globe size={16} />} desc="Site name, logo, and basic settings" active={activeSection === "general"} onToggle={() => setActiveSection(s => s === "general" ? null : "general")}>
          <TextField label="Site Title" defaultValue="Tripax Homes Ltd." />
          <TextField label="Tagline" defaultValue="Crafting Homes Beyond Excellence" />
          <TextField label="Website URL" defaultValue="https://tripaxhomes.com" type="url" />
          <div className="mt-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Default Language</label>
            <select defaultValue="en" className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option value="en">English</option>
              <option value="bn">Bengali (বাংলা)</option>
            </select>
          </div>
          <div className="mt-4 space-y-0">
            <Toggle label="Maintenance Mode" desc="Display a maintenance page to all visitors" value={toggles.maintenanceMode} onChange={() => toggle("maintenanceMode")} />
            <Toggle label="Show Progress Bars" desc="Display project completion bars on cards" value={toggles.showProgressBars} onChange={() => toggle("showProgressBars")} />
            <Toggle label="Enable Contact Form" desc="Allow inquiries via the website contact form" value={toggles.enableContactForm} onChange={() => toggle("enableContactForm")} />
          </div>
        </AccordionSection>

        {/* Contact Info */}
        <AccordionSection id="contact" label="Contact Info" icon={<Phone size={16} />} desc="Office address, phone, and email" active={activeSection === "contact"} onToggle={() => setActiveSection(s => s === "contact" ? null : "contact")}>
          <TextField label="Primary Phone" defaultValue="+880 2-123 456 789" type="tel" />
          <TextField label="Enquiry Mobile" defaultValue="+880 171 234 5678" type="tel" />
          <TextField label="Email Address" defaultValue="info@tripaxhomes.com" type="email" />
          <TextField label="Office Address" defaultValue="House 12, Road 3, Gulshan 2, Dhaka 1212" />
          <TextField label="Google Maps Embed URL" placeholder="https://maps.google.com/..." />
        </AccordionSection>

        {/* Social Media */}
        <AccordionSection id="social" label="Social Media" icon={<Link2 size={16} />} desc="Social profile links" active={activeSection === "social"} onToggle={() => setActiveSection(s => s === "social" ? null : "social")}>
          <div className="space-y-0 mt-4">
            {[
              { label: "Facebook",  placeholder: "https://facebook.com/tripaxhomes" },
              { label: "Instagram", placeholder: "https://instagram.com/tripaxhomes" },
              { label: "LinkedIn",  placeholder: "https://linkedin.com/company/tripaxhomes" },
              { label: "Twitter/X", placeholder: "https://x.com/tripaxhomes" },
              { label: "YouTube",   placeholder: "https://youtube.com/@tripaxhomes" },
            ].map(({ label, placeholder }) => (
              <div key={label} className="mt-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                  <AtSign size={12} /> {label}
                </label>
                <input type="url" placeholder={placeholder} className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
        </AccordionSection>


        {/* SEO */}
        <AccordionSection id="seo" label="SEO & Meta" icon={<Type size={16} />} desc="Page titles, descriptions, and OG image" active={activeSection === "seo"} onToggle={() => setActiveSection(s => s === "seo" ? null : "seo")}>
          <TextField label="Default Meta Title" defaultValue="Tripax Homes Ltd. | Premium Real Estate in Dhaka" />
          <TextField label="Default Meta Description" defaultValue="Discover luxury residential and commercial properties by Tripax Homes Ltd. in Dhaka's most prestigious locations." />
          <TextField label="OG Image URL" placeholder="https://tripaxhomes.com/og-image.jpg" />
          <TextField label="Google Analytics ID" placeholder="G-XXXXXXXXXX" />
          <TextField label="Google Tag Manager ID" placeholder="GTM-XXXXXXX" />
        </AccordionSection>

        {/* Notifications */}
        <AccordionSection id="notifications" label="Notifications" icon={<Bell size={16} />} desc="Inquiry alerts and system emails" active={activeSection === "notifications"} onToggle={() => setActiveSection(s => s === "notifications" ? null : "notifications")}>
          <div className="mt-4 space-y-0">
            <Toggle label="Inquiry Email Alerts" desc="Email admin when a new inquiry arrives" value={toggles.inquiryEmailAlert} onChange={() => toggle("inquiryEmailAlert")} />
            <Toggle label="Weekly Activity Digest" desc="Receive a weekly summary every Monday" value={toggles.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
            <Toggle label="Auto-Responder" desc="Send confirmation email to clients after inquiry" value={toggles.autoResponder} onChange={() => toggle("autoResponder")} />
          </div>
          <TextField label="Notification Recipient Email" defaultValue="admin@tripaxhomes.com" type="email" />
          <TextField label="From Email Name" defaultValue="Tripax Homes Ltd." />
        </AccordionSection>

        {/* Appearance */}
        <AccordionSection id="appearance" label="Appearance" icon={<Palette size={16} />} desc="Theme colors and typography" active={activeSection === "appearance"} onToggle={() => setActiveSection(s => s === "appearance" ? null : "appearance")}>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { label: "Primary Color",  value: "#11261A" },
              { label: "Accent Color",   value: "#B8962E" },
              { label: "Background",     value: "#F8F7F4" },
              { label: "Text Color",     value: "#1A1A2E" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{label}</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">
                  <input type="color" defaultValue={value} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0" />
                  <span className="font-mono text-xs text-slate-600">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Font Family</label>
            <select className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option>Montserrat + Plus Jakarta Sans</option>
              <option>Inter + Inter</option>
              <option>Playfair Display + Lato</option>
            </select>
          </div>
        </AccordionSection>

      </div>
    </div>
  );
}
