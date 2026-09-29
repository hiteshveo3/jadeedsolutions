"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HugeiconsIcon,
  CheckCircleIcon,
  LoaderIcon,
  AlertIcon,
  WhatsappBusinessIcon,
} from "./icons";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
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
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(values: FormValues) {
    setStatus("idle");
    const lines = [
      `Hi Jadeed Solutions — new enquiry from the website.`,
      ``,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : null,
      `Service: ${values.service}`,
      `Budget: ${values.budget}`,
      ``,
      `Message:`,
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    const phone = siteConfig.phoneHref.replace("+", "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 border-y border-black/10 py-10 md:rounded-[24px] md:border md:bg-white md:p-10">
        <HugeiconsIcon icon={CheckCircleIcon} size={44} className="text-[#015f45]" />
        <h3 className="font-sans text-3xl font-semibold tracking-[-.04em]">Opening WhatsApp…</h3>
        <p className="max-w-md leading-7 text-black/65">
          Your details are ready to send on WhatsApp. If it didn&rsquo;t open, message us on {siteConfig.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex h-12 items-center rounded-xl border border-[#015f45]/25 px-5 text-sm font-semibold text-[#015f45] transition-colors hover:bg-[#edf5f1]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 md:rounded-[24px] md:border md:border-black/10 md:bg-white md:p-8 lg:p-10"
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
        <Field label="Service of interest" error={errors.service?.message}>
          <select
            className={`${inputClass(!!errors.service)} select-custom`}
            defaultValue=""
            {...register("service", { required: "Please select a service" })}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Growth Partnership (10%)">Growth Partnership (10%)</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Monthly budget" error={errors.budget?.message}>
        <select
          className={`${inputClass(!!errors.budget)} select-custom`}
          defaultValue=""
          {...register("budget", { required: "Please select a budget range" })}
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

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

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <HugeiconsIcon icon={AlertIcon} size={16} />
          Something went wrong. Please try again or message us on WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#014f39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#015f45] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <HugeiconsIcon icon={LoaderIcon} size={16} className="animate-spin" />
            Preparing…
          </>
        ) : (
          <>
            <HugeiconsIcon icon={WhatsappBusinessIcon} size={18} />
            Continue on WhatsApp
          </>
        )}
      </button>
      <p className="text-center text-xs text-black/50">Your message opens in WhatsApp, ready to send.</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0d0d0d]">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0d0d0d] outline-none transition-colors placeholder:text-black/35 focus:border-[#015f45] focus:ring-2 focus:ring-[#015f45]/15 md:bg-[#f7f5ef] md:focus:bg-white ${
    hasError ? "border-red-400" : "border-black/15"
  }`;
}
