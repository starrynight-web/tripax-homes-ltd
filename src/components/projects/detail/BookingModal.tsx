"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { createConsultation } from "@/app/actions/booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  defaultType?: "Private Consultation" | "Site Visit";
}

export function BookingModal({ isOpen, onClose, projectTitle, defaultType = "Private Consultation" }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
    type: defaultType,
    project_name: projectTitle,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createConsultation(form);
      setStep(3); // Success step
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {step < 3 && (
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block mb-2">{form.type}</span>
              <h2 className="text-3xl font-montserrat font-bold text-slate-900 leading-tight">
                {step === 1 ? "Your Information" : "Schedule Details"}
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-jakarta">Interested in <span className="font-bold text-primary">{projectTitle}</span></p>
            </div>

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          type="email" 
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          type="tel" 
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="+880..."
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-2xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-xl shadow-primary/10"
                  >
                    Next Step
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          type="date" 
                          value={form.date}
                          onChange={e => setForm({...form, date: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Time</label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          required
                          value={form.time}
                          onChange={e => setForm({...form, time: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm appearance-none"
                        >
                          <option value="">Select Time</option>
                          <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                          <option value="Afternoon (2 PM - 4 PM)">Afternoon (2 PM - 4 PM)</option>
                          <option value="Late Afternoon (4 PM - 6 PM)">Late Afternoon (4 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Additional Message (Optional)</label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-4 top-4 text-slate-400" />
                      <textarea 
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-jakarta text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-5 bg-slate-50 text-slate-400 rounded-2xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all"
                    >
                      Back
                    </button>
                    <button 
                      disabled={loading}
                      type="submit"
                      className="flex-1 py-5 bg-primary text-white rounded-2xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : "Confirm Booking"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="p-12 md:p-20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-3xl font-montserrat font-bold text-slate-900 mb-4">Request Received!</h2>
            <p className="text-slate-500 font-jakarta leading-relaxed max-w-sm mx-auto">
              Thank you for your interest in <span className="font-bold text-primary">{projectTitle}</span>. 
              Our relationship manager will contact you shortly to confirm your {form.type.toLowerCase()}.
            </p>
            <button 
              onClick={onClose}
              className="mt-10 px-12 py-5 bg-slate-900 text-white rounded-2xl font-montserrat font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
