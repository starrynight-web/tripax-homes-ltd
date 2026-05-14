"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Phone,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  Link2,
  Bell,
  Palette,
  ChevronDown,
  ChevronUp,
  Loader2,
  AtSign
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getSiteConfig, saveSiteConfig } from "@/app/actions/config";

type Section = "general" | "contact" | "social" | "seo" | "notifications" | "appearance";

export default function AdminConfigPage() {
  const [activeSection, setActiveSection] = useState<Section | null>("general");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      try {
        const data = await getSiteConfig();
        setConfig(data);
      } catch (err) {
        console.error("Failed to load config:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSiteConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary mb-4" size={32} />
        <p className="text-slate-500 font-jakarta">Loading site configuration...</p>
      </div>
    );
  }

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
              Changes Saved
            </motion.span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save All
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {/* General */}
        <AccordionSection id="general" label="General" icon={<Globe size={16} />} desc="Site name, logo, and basic settings" active={activeSection === "general"} onToggle={() => setActiveSection(s => s === "general" ? null : "general")}>
          <TextField label="Site Title" value={config.site_title || ""} onChange={v => updateConfig("site_title", v)} />
          <TextField label="Tagline" value={config.site_tagline || ""} onChange={v => updateConfig("site_tagline", v)} />
          <TextField label="Website URL" value={config.site_url || ""} onChange={v => updateConfig("site_url", v)} type="url" />
        </AccordionSection>

        {/* Contact Info */}
        <AccordionSection id="contact" label="Contact Info" icon={<Phone size={16} />} desc="Office address, phone, and email" active={activeSection === "contact"} onToggle={() => setActiveSection(s => s === "contact" ? null : "contact")}>
          <TextField label="Primary Phone" value={config.primary_phone || ""} onChange={v => updateConfig("primary_phone", v)} type="tel" />
          <TextField label="Enquiry Mobile" value={config.enquiry_mobile || ""} onChange={v => updateConfig("enquiry_mobile", v)} type="tel" />
          <TextField label="CTA Phone Number" value={config.cta_phone_number || ""} onChange={v => updateConfig("cta_phone_number", v)} type="tel" />
          <TextField label="Email Address" value={config.email_address || ""} onChange={v => updateConfig("email_address", v)} type="email" />
          <TextField label="Office Address" value={config.office_address || ""} onChange={v => updateConfig("office_address", v)} />
          <TextField label="Google Maps Embed URL" value={config.maps_embed_url || ""} onChange={v => updateConfig("maps_embed_url", v)} placeholder="https://maps.google.com/..." />
        </AccordionSection>

        {/* Social Media */}
        <AccordionSection id="social" label="Social Media" icon={<Link2 size={16} />} desc="Social profile links" active={activeSection === "social"} onToggle={() => setActiveSection(s => s === "social" ? null : "social")}>
          <TextField label="Facebook URL" value={config.facebook_url || ""} onChange={v => updateConfig("facebook_url", v)} type="url" />
          <TextField label="Instagram URL" value={config.instagram_url || ""} onChange={v => updateConfig("instagram_url", v)} type="url" />
          <TextField label="LinkedIn URL" value={config.linkedin_url || ""} onChange={v => updateConfig("linkedin_url", v)} type="url" />
        </AccordionSection>

        {/* SEO */}
        <AccordionSection id="seo" label="SEO & Meta" icon={<Type size={16} />} desc="Page titles, descriptions, and OG image" active={activeSection === "seo"} onToggle={() => setActiveSection(s => s === "seo" ? null : "seo")}>
          <TextField label="Default Meta Title" value={config.meta_title || ""} onChange={v => updateConfig("meta_title", v)} />
          <TextField label="Default Meta Description" value={config.meta_description || ""} onChange={v => updateConfig("meta_description", v)} />
          <TextField label="Google Analytics ID" value={config.ga_id || ""} onChange={v => updateConfig("ga_id", v)} placeholder="G-XXXXXXXXXX" />
        </AccordionSection>
      </div>
    </div>
  );
}

function AccordionSection({ id, label, icon, desc, active, onToggle, children }: any) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-6 text-left hover:bg-slate-50/80 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-montserrat font-bold text-sm text-slate-900">{label}</h3>
          <p className="text-xs text-slate-400 font-jakarta">{desc}</p>
        </div>
        {active ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-slate-100 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function TextField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="mt-4">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );
}
