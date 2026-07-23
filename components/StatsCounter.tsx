"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export function StatsCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-display text-4xl font-semibold text-gradient sm:text-5xl"
      >
        {display}
        {suffix}
      </span>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}
