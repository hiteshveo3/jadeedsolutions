"use client";

import React, { useState, useEffect } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed z-40 right-5 lg:right-8 bottom-24 lg:bottom-8 w-11 h-11 rounded-full bg-[#151515] text-white hover:bg-[#015f45] border border-white/10 shadow-lg flex items-center justify-center transition-all duration-300 group cursor-pointer"
    >
      <svg
        className="w-5 h-5 group-hover:text-[#cbd810] -translate-y-0.5 group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
