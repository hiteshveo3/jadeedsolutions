"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/blog";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon, FileIcon, HomeIcon, LayersIcon } from "./icons";

type SearchItem = {
  label: string;
  href: string;
  group: "Home" | "Services" | "Docs" | "FAQ";
  keywords?: string;
};

// Creating a dummy FAQ for the UI mockup
const dummyFAQ = { label: "Jadeed: Terms of Service", href: "#", group: "FAQ" as const, keywords: "license your content to others), royalty-free..." };

const items: SearchItem[] = [
  ...navLinks.map((l) => ({ label: l.label, href: l.href, group: "Home" as const, keywords: "Explore our main sections and offerings to get started." })),
  ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, group: "Services" as const, keywords: s.summary })),
  ...posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}`, group: "Docs" as const, keywords: `${p.excerpt}` })),
  dummyFAQ
];

const groupIcon = {
  Home: HomeIcon,
  Services: LayersIcon,
  Docs: FileIcon,
  FAQ: FileIcon
} as const;

export function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "ask">("search");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.keywords?.toLowerCase().includes(q)
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-search", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-search", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex sm:pt-[10vh] sm:px-4 justify-center font-sans" role="dialog">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={close} 
          />
          
          {/* Inkeep Style Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[800px] bg-white sm:rounded-2xl shadow-2xl flex flex-col h-full sm:h-auto sm:max-h-[85vh] overflow-hidden"
          >
            {/* Header / Input Row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#cdcdcd]/50 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 shrink-0"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === "ask" ? "Ask anything about Jadeed..." : "Search for anything..."}
                className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400 font-medium"
              />
              
              {/* Toggles */}
              <div className="hidden sm:flex items-center gap-1 bg-[#f9f9f9] p-1 rounded-lg border border-[#cdcdcd]/60 shrink-0">
                <button 
                  onClick={() => setMode("search")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-all ${mode === "search" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  Search
                </button>
                <button 
                  onClick={() => setMode("ask")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-all ${mode === "ask" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Ask AI
                </button>
              </div>

              {/* Close (Mobile) */}
              <button onClick={close} className="sm:hidden p-2 text-gray-400 hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#d8dce2] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              
              {mode === "search" ? (
                <>
                  {/* Ask AI Banner */}
                  <div 
                    onClick={() => setMode("ask")}
                    className="bg-[#f9f9f9] border border-[#cdcdcd] rounded-2xl flex items-center justify-between p-4 mb-6 cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/logo.png" alt="AI" width={24} height={24} className="rounded-md" />
                      <span className="text-gray-600 text-[15px] font-medium">Ask AI <strong className="text-black ml-1">{query}</strong></span>
                    </div>
                    <div className="text-gray-400 text-[13px] flex items-center gap-2 font-medium">
                      Start conversation
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                    </div>
                  </div>

                  {/* Sticky Mobile Filters */}
                  <div className="sticky top-[-16px] sm:top-[-24px] bg-white z-10 py-3 mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-transparent">
                    <button className="shrink-0 border border-black bg-white px-4 py-1.5 rounded-full text-[13px] font-semibold text-black">All ({results.length})</button>
                    <button className="shrink-0 border border-[#cdcdcd] bg-white px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-black">Home ({items.filter(i=>i.group==='Home').length})</button>
                    <button className="shrink-0 border border-[#cdcdcd] bg-white px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-black">FAQ (1)</button>
                    <button className="shrink-0 border border-[#cdcdcd] bg-white px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-black">Docs ({items.filter(i=>i.group==='Docs').length})</button>
                  </div>

                  {/* Result Cards */}
                  <div className="space-y-3">
                    {results.length === 0 ? (
                      <div className="py-12 text-center text-sm text-gray-400 font-medium">No results found for &ldquo;{query}&rdquo;</div>
                    ) : (
                      results.map((item) => {
                        const Icon = groupIcon[item.group] || FileIcon;
                        return (
                        <div key={item.href} onClick={() => go(item.href)} className="border border-[#cdcdcd] rounded-xl p-4 hover:border-gray-400 cursor-pointer transition-colors bg-white group">
                          {/* Group Name */}
                          <div className="text-[13px] text-gray-400 mb-2 font-medium">{item.group}</div>
                          
                          {/* Title & Icon */}
                          <div className="font-semibold text-[16px] text-black mb-1.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                               <HugeiconsIcon icon={Icon} size={18} className="text-gray-500 shrink-0" />
                               {item.label}
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black opacity-0 group-hover:opacity-100 transition-opacity"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                          </div>
                          
                          {/* Description */}
                          {item.keywords && <div className="text-[14px] text-gray-500 truncate mt-1">... {item.keywords}</div>}
                        </div>
                      )})
                    )}
                  </div>
                </>
              ) : (
                /* Ask AI Chat UI */
                <div className="flex flex-col h-full">
                  <div className="flex gap-4 mb-8">
                     <Image src="/logo.png" alt="AI" width={32} height={32} className="rounded-md shrink-0 h-8 w-8" />
                     <div className="space-y-4">
                        <p className="text-[15px] text-gray-700">Hi!</p>
                        <p className="text-[15px] text-gray-700 leading-relaxed">I'm an AI assistant trained on documentation, help articles, and other content.</p>
                        <p className="text-[15px] text-gray-700">Ask me anything about <span className="bg-black text-white px-2 py-0.5 rounded-md font-medium text-sm">Jadeed</span>.</p>
                     </div>
                  </div>
                  <div className="mt-auto pt-8">
                     <div className="bg-[#f9f9f9] border border-[#cdcdcd] rounded-xl p-4 flex items-center justify-between shadow-sm focus-within:border-gray-400 transition-colors">
                        <input placeholder="How do I get started?" className="bg-transparent outline-none w-full text-[15px] text-black" />
                        <button className="text-gray-400 hover:text-black transition-colors shrink-0">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                        </button>
                     </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-3 border-t border-[#cdcdcd]/50 shrink-0 flex items-center justify-between text-[12px] text-gray-400">
               <span>Powered by <strong className="font-semibold text-black">Jadeed Solutions</strong></span>
               <div className="flex items-center gap-2">
                 <span>Press <kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-black/70">ESC</kbd> to close</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
