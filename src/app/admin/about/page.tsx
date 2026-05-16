"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Info,
  Users,
  Target,
  MessageSquare,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Pencil,
  Image as ImageIcon,
  Loader2,
  ChevronDown,
  ChevronUp,
  BookOpen
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAboutSections, saveAboutSection, getTeamMembers, saveTeamMember, deleteTeamMember } from "@/app/actions/about";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

type Section = "hero" | "who_we_are" | "mission_vision" | "chairman_message" | "team";

export default function AdminAboutPage() {
  const [activeSection, setActiveSection] = useState<Section | null>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Data State
  const [sections, setSections] = useState<any>({});
  const [team, setTeam] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const sData = await getAboutSections();
      const tData = await getTeamMembers();
      setSections(sData);
      setTeam(tData);
    } catch (err) {
      console.error("Failed to fetch about data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveSection = async (name: string, content: any) => {
    setSaving(true);
    try {
      await saveAboutSection(name, content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert("Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const memberData = {
      id: editingMember?.id,
      name: formData.get("name"),
      designation: formData.get("designation"),
      image_url: editingMember?.image_url,
      bio: formData.get("bio"),
      sort_order: Number(formData.get("sort_order")) || 0,
    };

    try {
      await saveTeamMember(memberData);
      await fetchData();
      setEditingMember(null);
    } catch (err) {
      alert("Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteTeamMember(id);
      await fetchData();
    } catch (err) {
      alert("Failed to delete team member");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary mb-4" size={32} />
        <p className="text-slate-500 font-jakarta">Loading About Page content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-slate-900 tracking-tight">About Page Editor</h1>
          <p className="text-slate-500 font-jakarta text-sm mt-1">Manage the content and leadership team on the About page.</p>
        </div>
        {saved && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <CheckCircle2 size={14} />
            Changes Saved
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {/* HERO SECTION */}
        <AccordionSection 
          id="hero" 
          label="Hero Section" 
          icon={<Info size={16} />} 
          active={activeSection === "hero"} 
          onToggle={() => setActiveSection(s => s === "hero" ? null : "hero")}
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Hero Title</label>
              <input 
                defaultValue={sections.hero?.title} 
                onBlur={(e) => setSections({...sections, hero: {...sections.hero, title: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Hero Subtitle</label>
              <textarea 
                defaultValue={sections.hero?.subtitle} 
                onBlur={(e) => setSections({...sections, hero: {...sections.hero, subtitle: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" 
              />
            </div>
            <CloudinaryUpload 
              label="Hero Image" 
              value={sections.hero?.image_url} 
              onUpload={(url) => setSections({...sections, hero: {...sections.hero, image_url: url}})} 
              onRemove={() => setSections({...sections, hero: {...sections.hero, image_url: ""}})}
            />
            <button 
              onClick={() => handleSaveSection("hero", sections.hero)} 
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Hero Section
            </button>
          </div>
        </AccordionSection>
        
        {/* WHO WE ARE */}
        <AccordionSection 
          id="who_we_are" 
          label="Who We Are" 
          icon={<BookOpen size={16} />} 
          active={activeSection === "who_we_are"} 
          onToggle={() => setActiveSection(s => s === "who_we_are" ? null : "who_we_are")}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Section Tag</label>
                <input 
                  defaultValue={sections.who_we_are?.tag} 
                  onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, tag: e.target.value}})}
                  placeholder="e.g. Our Story"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Section Title</label>
                <input 
                  defaultValue={sections.who_we_are?.title} 
                  onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, title: e.target.value}})}
                  placeholder="e.g. Who We Are"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Paragraph 1</label>
              <textarea 
                defaultValue={sections.who_we_are?.text1} 
                onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, text1: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Paragraph 2</label>
              <textarea 
                defaultValue={sections.who_we_are?.text2} 
                onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, text2: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Full Story (Modal Content)</label>
              <textarea 
                defaultValue={sections.who_we_are?.fullStory} 
                onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, fullStory: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-48" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CloudinaryUpload 
                label="Section Image" 
                value={sections.who_we_are?.image_url} 
                onUpload={(url) => setSections({...sections, who_we_are: {...sections.who_we_are, image_url: url}})} 
                onRemove={() => setSections({...sections, who_we_are: {...sections.who_we_are, image_url: ""}})}
              />
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Video Embed URL (YouTube/Vimeo)</label>
                <input 
                  defaultValue={sections.who_we_are?.videoUrl} 
                  onBlur={(e) => setSections({...sections, who_we_are: {...sections.who_we_are, videoUrl: e.target.value}})}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
            </div>
            <button 
              onClick={() => handleSaveSection("who_we_are", sections.who_we_are)} 
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Who We Are Section
            </button>
          </div>
        </AccordionSection>

        {/* MISSION & VISION */}
        <AccordionSection 
          id="mission_vision" 
          label="Mission & Vision" 
          icon={<Target size={16} />} 
          active={activeSection === "mission_vision"} 
          onToggle={() => setActiveSection(s => s === "mission_vision" ? null : "mission_vision")}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Our Mission</label>
                <textarea 
                  defaultValue={sections.mission_vision?.mission} 
                  onBlur={(e) => setSections({...sections, mission_vision: {...sections.mission_vision, mission: e.target.value}})}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-32" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Our Vision</label>
                <textarea 
                  defaultValue={sections.mission_vision?.vision} 
                  onBlur={(e) => setSections({...sections, mission_vision: {...sections.mission_vision, vision: e.target.value}})}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-32" 
                />
              </div>
            </div>
            <button 
              onClick={() => handleSaveSection("mission_vision", sections.mission_vision)} 
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Mission & Vision
            </button>
          </div>
        </AccordionSection>

        {/* CHAIRMAN'S MESSAGE */}
        <AccordionSection 
          id="chairman_message" 
          label="Chairman's Message" 
          icon={<MessageSquare size={16} />} 
          active={activeSection === "chairman_message"} 
          onToggle={() => setActiveSection(s => s === "chairman_message" ? null : "chairman_message")}
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Chairman Name</label>
              <input 
                defaultValue={sections.chairman_message?.name} 
                onBlur={(e) => setSections({...sections, chairman_message: {...sections.chairman_message, name: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Message Content</label>
              <textarea 
                defaultValue={sections.chairman_message?.content} 
                onBlur={(e) => setSections({...sections, chairman_message: {...sections.chairman_message, content: e.target.value}})}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm h-48" 
              />
            </div>
            <CloudinaryUpload 
              label="Chairman Image" 
              value={sections.chairman_message?.image_url} 
              onUpload={(url) => setSections({...sections, chairman_message: {...sections.chairman_message, image_url: url}})} 
              onRemove={() => setSections({...sections, chairman_message: {...sections.chairman_message, image_url: ""}})}
            />
            <button 
              onClick={() => handleSaveSection("chairman_message", sections.chairman_message)} 
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Message
            </button>
          </div>
        </AccordionSection>

        {/* TEAM MEMBERS */}
        <AccordionSection 
          id="team" 
          label="Leadership Team" 
          icon={<Users size={16} />} 
          active={activeSection === "team"} 
          onToggle={() => setActiveSection(s => s === "team" ? null : "team")}
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-700">Manage Officials</h4>
              <button 
                onClick={() => setEditingMember({ name: "", designation: "", sort_order: team.length })}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg font-montserrat font-bold text-[10px] tracking-widest uppercase hover:opacity-90 transition-all"
              >
                <Plus size={14} /> Add Official
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl group">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    {member.image_url ? <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-400 m-auto" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{member.name}</p>
                    <p className="text-xs text-slate-500 truncate">{member.designation}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingMember(member)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AccordionSection>
      </div>

      {/* Member Edit Modal */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <h3 className="font-montserrat font-bold text-slate-900 text-lg mb-6 uppercase tracking-tight">
                {editingMember.id ? "Edit Official" : "Add Official"}
              </h3>
              <form onSubmit={handleSaveMember} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Full Name</label>
                  <input name="name" required defaultValue={editingMember.name} className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Designation</label>
                  <input name="designation" required defaultValue={editingMember.designation} className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm" />
                </div>
                <CloudinaryUpload 
                  label="Profile Image" 
                  value={editingMember.image_url} 
                  onUpload={(url) => setEditingMember({...editingMember, image_url: url})} 
                  onRemove={() => setEditingMember({...editingMember, image_url: ""})} 
                />
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Bio (Optional)</label>
                  <textarea name="bio" defaultValue={editingMember.bio} className="w-full border border-slate-200 rounded-lg px-4 py-3 font-jakarta text-sm h-24" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setEditingMember(null)} className="flex-1 py-3 border border-slate-200 rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase text-slate-600">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 bg-primary text-white rounded-xl font-montserrat font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    Save Official
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccordionSection({ id, label, icon, active, onToggle, children }: any) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-6 text-left hover:bg-slate-50/80 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-montserrat font-bold text-sm text-slate-900">{label}</h3>
        </div>
        {active ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-slate-100 pt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
