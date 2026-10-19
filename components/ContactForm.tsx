"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select } from "@/components/system/Select";
import {
  HugeiconsIcon,
  CheckCircleIcon,
  LoaderIcon,
  AlertIcon,
  ArrowRightIcon,
} from "./icons";
import { services } from "@/lib/services";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

const budgets = [
  "Under £1k / month",
  "£1k–£5k / month",
  "£5k–£10k / month",
  "£10k+ / month",
  "One-time project",
  "Not sure yet",
];

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  // Design-lab ideas 039 A (job value), 082 B (call method, no big icon) and 081 A (day + time).
  const [jobValue, setJobValue] = useState(400);
  const [method, setMethod] = useState<(typeof METHODS)[number][0]>("WhatsApp");
  // Dates are worked out in the browser after mount, so server and client HTML match.
  const [days, setDays] = useState<ReturnType<typeof nextWeekdays>>([]);
  useEffect(() => setDays(nextWeekdays(5)), []);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string>(TIMES[1]);
  const [result, setResult] = useState<{ auditUrl?: string; bookable: boolean; summary?: string } | null>(null);

  /* The request stays on the site (owner, 5 Oct 2026: never out to WhatsApp): like Jadeed
     Marketing's form it becomes a lead in the dashboard, scored and summarised by Jadeed AI,
     and the owner gets a private audit page where good fits book their call. */
  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"].map((key) => (params.get(key) ? `${key}=${params.get(key)}` : "")).filter(Boolean).join("&");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          jobValue,
          preferredCall: { method, day: days[day]?.label ?? "", time, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || undefined },
          page: window.location.pathname,
          referrer: document.referrer.slice(0, 300) || undefined,
          utm: utm || undefined,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { auditUrl?: string; bookable?: boolean; summary?: string };
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setResult({ auditUrl: data.auditUrl, bookable: Boolean(data.bookable), summary: data.summary });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[24px] border border-white/[0.08] bg-white/[0.06] p-7 md:p-10">
        <HugeiconsIcon icon={CheckCircleIcon} size={44} className="text-[#BEF70A]" />
        <h3 className="text-3xl tracking-[-.04em]">Thanks — Sameer has your request</h3>
        <p className="max-w-md leading-7 text-white/73">
          {result?.summary ?? "A confirmation email is on its way. Sameer replies within 24 hours."}
        </p>
        {result?.auditUrl ? (
          <a href={result.auditUrl} className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
            {result.bookable ? "Pick your call time" : "Open your audit page"}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0B1F12] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45">
              <HugeiconsIcon icon={ArrowRightIcon} size={16} />
            </span>
          </a>
        ) : null}
        {/* 086 A — the next three steps, not a dead-end “thank you”. */}
        <ol className="mt-2 grid w-full gap-4">
          {NEXT.map(([when, text], i) => (
            <li key={when} className="flex gap-3">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${i ? "bg-white/[0.08] text-white/70" : "bg-[#BEF70A] text-[#0B1F12]"}`}>{i + 1}</span>
              <div>
                <p className="text-xs font-bold text-[#BEF70A]">{when}</p>
                <p className="mt-0.5 text-[15px] text-white/85">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex h-12 items-center rounded-full bg-white/[0.08] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 md:rounded-[24px] md:border md:border-white/12 md:bg-white/[0.05] md:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass(!!errors.name)}
            {...register("name", { required: "Please enter your name" })}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClass(!!errors.email)}
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)">
          <input
            type="text"
            autoComplete="organization"
            placeholder="Company Ltd"
            className={inputClass(false)}
            {...register("company")}
          />
        </Field>
        {/* Selectors open as a sheet from the bottom on phones (owner, 5 Oct 2026). */}
        <Field label="Service of interest" error={errors.service?.message} as="div">
          <Controller
            name="service"
            control={control}
            defaultValue=""
            rules={{ required: "Please select a service" }}
            render={({ field }) => (
              <Select
                label="Service of interest"
                hideLabel
                size="lg"
                placeholder="Select a service"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={!!errors.service}
                options={[
                  ...services.map((s) => ({ value: s.title, label: s.title })),
                  { value: "Growth Partnership (10%)", label: "Growth Partnership (10%)" },
                  { value: "Not sure yet", label: "Not sure yet" },
                ]}
              />
            )}
          />
        </Field>
      </div>

      <Field label="Monthly budget" error={errors.budget?.message} as="div">
        <Controller
          name="budget"
          control={control}
          defaultValue=""
          rules={{ required: "Please select a budget range" }}
          render={({ field }) => (
            <Select
              label="Monthly budget"
              hideLabel
              size="lg"
              placeholder="Select a range"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              invalid={!!errors.budget}
              options={budgets.map((b) => ({ value: b, label: b }))}
            />
          )}
        />
      </Field>

      {/* 039 A — a typical job's value: a slider, not a text box. */}
      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-bold">Typical value of one job</span>
          <b className="text-lg tabular-nums text-[#BEF70A]">£{jobValue.toLocaleString("en-GB")}</b>
        </div>
        <input type="range" min={50} max={5000} step={50} value={jobValue} onChange={(e) => setJobValue(Number(e.target.value))} aria-label="Typical value of one job" className="calc-range mt-3" style={{ ["--calc-pct" as string]: `${((jobValue - 50) / 4950) * 100}%` }} />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[150, 400, 1200, 3000].map((v) => (
            <button key={v} type="button" onClick={() => setJobValue(v)} className={`h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${jobValue === v ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06]"}`}>£{v.toLocaleString("en-GB")}</button>
          ))}
          <span className="hand ml-1 text-[20px] leading-none text-[#BEF70A]">your best guess is fine</span>
        </div>
      </div>

      {/* 082 B — how should we call (a switch, no big icon) + 081 A — a day and a time. */}
      <div className="grid gap-5">
        <div>
          <span className="text-sm font-bold">How should we call?</span>
          <div className="mt-2 flex w-fit flex-wrap rounded-full border border-white/[0.08] bg-white/[0.06] p-1" role="radiogroup" aria-label="How should we call?">
            {METHODS.map(([m]) => (
              <button key={m} type="button" role="radio" aria-checked={method === m} onClick={() => setMethod(m)} className={`h-9 rounded-full px-4 text-sm font-semibold transition-colors ${method === m ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>{m}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/55">{METHODS.find(([m]) => m === method)?.[1]}</p>
        </div>
        <div>
          <span className="text-sm font-bold">A good time for a call</span>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {days.map((d, i) => (
              <button key={d.label} type="button" aria-pressed={day === i} onClick={() => setDay(i)} className={`flex h-14 min-w-[64px] flex-col items-center justify-center rounded-[14px] text-xs transition-colors ${day === i ? "bg-[#BEF70A] font-bold text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06]"}`}>
                <span>{d.weekday}</span>
                <b className="text-base">{d.date}</b>
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)} className={`h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${time === t ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06]"}`}>{t}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/55">In your time zone. Sameer confirms the exact time with you.</p>
        </div>
      </div>

      <Field label="How can we help?" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Your city, your services and the jobs you want more of…"
          className={inputClass(!!errors.message)}
          {...register("message", {
            required: "Please tell us a bit about your project",
            minLength: { value: 10, message: "Please add a little more detail" },
          })}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers; bots that fill it are ignored. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("website")} />

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-red-300">
          <HugeiconsIcon icon={AlertIcon} size={16} />
          Something went wrong. Please try again, or email info@jadeedsolutions.com.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#BEF70A] px-5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BEF70A] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <HugeiconsIcon icon={LoaderIcon} size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Get my free audit
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B1F12] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45">
              <HugeiconsIcon icon={ArrowRightIcon} size={15} />
            </span>
          </>
        )}
      </button>
      <p className="text-center text-xs text-white/58">Sameer replies within 24 hours. You&rsquo;ll get a private page to follow your audit.</p>
    </form>
  );
}

const METHODS = [
  ["WhatsApp", "We call your phone on WhatsApp."],
  ["Google Meet", "We send a Google Meet link by email."],
  ["Phone", "We call your number directly."],
] as const;
const TIMES = ["10:00", "12:00", "15:00", "17:00"] as const;
const NEXT = [
  ["Now", "Your request is with Sameer, and a confirmation email is on its way."],
  ["Within 24 hours", "We review your website, Google visibility and competitors."],
  ["Then", "Your free plan — and a call at a time that suits you, only if you want one."],
] as const;

function nextWeekdays(n: number) {
  const out: { label: string; weekday: string; date: number }[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd === 0 || wd === 6) continue;
    out.push({ weekday: d.toLocaleDateString("en-GB", { weekday: "short" }), date: d.getDate(), label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) });
  }
  return out;
}

function Field({
  label,
  error,
  children,
  as = "label",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  /** "div" for selectors, which carry their own accessible label. */
  as?: "label" | "div";
}) {
  const Tag = as;
  return (
    <Tag className="block">
      <span aria-hidden={as === "div" ? true : undefined} className="text-sm font-bold text-white">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </Tag>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[14px] border bg-white/[0.05] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/43 focus:border-[#BEF70A] md:bg-white/[0.05] md:focus:bg-white/[0.08] ${
    hasError ? "border-red-400" : "border-white/[0.08]"
  }`;
}
