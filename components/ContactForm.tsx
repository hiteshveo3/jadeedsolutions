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
import { Button } from "./Button";
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
  "< $1k / month",
  "$1k - $5k / month",
  "$5k - $10k / month",
  "$10k+ / month",
  "One-time project",
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
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <HugeiconsIcon icon={CheckCircleIcon} size={48} className="text-brand-500" />
        <h3 className="font-display text-2xl font-semibold text-ink">
          Opening WhatsApp…
        </h3>
        <p className="max-w-md text-slate-600">
          Your details are ready to send on WhatsApp. If it didn&rsquo;t open, tap
          the button below.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            placeholder="Jane Doe"
            className={inputClass(!!errors.name)}
            {...register("name", { required: "Please enter your name" })}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
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
            placeholder="Company Inc."
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
          placeholder="Tell us about your project and goals..."
          className={inputClass(!!errors.message)}
          {...register("message", {
            required: "Please tell us a bit about your project",
            minLength: { value: 10, message: "Please add a little more detail" },
          })}
        />
      </Field>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <HugeiconsIcon icon={AlertIcon} size={16} />
          Something went wrong. Please try again or message us on WhatsApp.
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
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
      </Button>
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
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 ${
    hasError ? "border-red-300" : "border-slate-200"
  }`;
}
