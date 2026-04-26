"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber = "+8801234567890" }: WhatsAppButtonProps) {
  // Remove any non-digit characters except the +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber.replace("+", "")}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center group transition-shadow hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)]"
      title="Chat with us on WhatsApp"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#25D366] rounded-full opacity-20"
      />
      <MessageCircle size={24} fill="currentColor" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
}
