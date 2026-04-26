"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2 } from "lucide-react";
import { chatWithAI } from "@/app/actions/ai";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Greetings! I am your Tripax Emerald Assistant. How may I help you discover your dream home today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    const result = await chatWithAI([...messages, { role: "user", content: userMsg }]);
    
    setIsTyping(false);
    if (result.success) {
      setMessages(prev => [...prev, { role: "model", content: result.content }]);
    } else {
      setMessages(prev => [...prev, { role: "model", content: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment." }]);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col mb-4 transition-all duration-300",
              isMinimized ? "h-16 w-72" : "h-[500px] w-[350px] md:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-white font-montserrat font-bold text-sm leading-tight">Emerald AI</h3>
                  <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 transition-colors"
                >
                  <Minimize2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                >
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1",
                        msg.role === "user" ? "bg-accent text-primary" : "bg-primary text-white"
                      )}>
                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 mr-auto max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                        <Bot size={14} />
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm rounded-tl-none">
                        <Loader2 size={14} className="animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form 
                  onSubmit={handleSend}
                  className="p-4 bg-white border-t border-slate-100 flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about our projects..."
                    className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/10 font-jakarta outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 group relative",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:hidden" />
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
