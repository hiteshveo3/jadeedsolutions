import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/leads/create";
import { allow, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/* The free-audit form on /contact. Like Jadeed Marketing's /api/lead, every request becomes a
   lead in the dashboard: scored A/B/C, summarised by Jadeed AI, saved, and emailed to the
   team (score in the subject) with a confirmation to the owner that links their private
   audit page. A and B leads can book a call there. */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Service is required").max(120),
  budget: z.string().trim().min(1, "Budget is required").max(120),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  jobValue: z.coerce.number().int().min(0).max(1_000_000).optional(),
  preferredCall: z
    .object({
      method: z.string().max(40),
      day: z.string().max(40),
      time: z.string().max(20),
      timeZone: z.string().max(64).optional(),
    })
    .optional(),
  page: z.string().max(300).optional(),
  referrer: z.string().max(300).optional(),
  utm: z.string().max(300).optional(),
  /** Honeypot: people never fill it in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  if (!allow(`contact:${clientIp(request) ?? "unknown"}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Please wait a minute and try again." }, { status: 429 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 422 });
  }

  const lead = parsed.data;
  try {
    const result = await createLead({
      source: "form",
      name: lead.name,
      email: lead.email.toLowerCase(),
      phone: lead.phone || undefined,
      company: lead.company || undefined,
      service: lead.service,
      budget: lead.budget,
      jobValue: lead.jobValue,
      message: lead.message,
      preferredCall: lead.preferredCall,
      pageUrl: lead.page,
      referrer: lead.referrer,
      utm: lead.utm,
    });
    if (!result.delivered) return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    return NextResponse.json({
      ok: true,
      auditUrl: result.auditUrl,
      bookable: result.bookable,
      summary: result.analysis.visitorSummary,
    });
  } catch (error) {
    console.error("[contact] Failed to process lead:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
