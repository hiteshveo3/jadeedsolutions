"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
} from "framer-motion";
import { LinkButton } from "./Button";
import { HugeiconsIcon, ArrowRightIcon } from "./icons";
import { HeroBackground } from "./HeroBackground";
import { stats, siteConfig } from "@/lib/site";

const rotatingWords = [
  "SEO",
  "websites that convert",
  "mobile apps",
  "Google Ads",
];

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((v) => (v + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <HeroBackground />

      <div className="container relative z-10 flex flex-col items-center pb-8 pt-16 text-center lg:pb-10 lg:pt-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow self-center"
        >
          For UK &amp; USA local service businesses
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-5xl xl:text-6xl"
        >
          Get more booked jobs with
          <span className="mt-2 flex min-h-[1.15em] items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: "0.35em" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-0.35em" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-brand-500"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
        >
          Jadeed Solutions helps plumbers, cleaners, movers and other local
          services show up on Google and turn visits into calls. Pay fixed fees —
          or 10% of the bookings we generate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.19 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <LinkButton href={siteConfig.whatsappHref} size="lg">
            WhatsApp us
            <HugeiconsIcon icon={ArrowRightIcon} size={18} />
          </LinkButton>
          <LinkButton href="/pricing" size="lg" variant="secondary">
            See pricing
          </LinkButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-4 text-sm text-slate-500"
        >
          Free plan outline · No setup fee · We reply within 24 hours
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
