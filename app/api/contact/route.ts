import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("A valid email is required"),
  company: z.string().max(160).optional().or(z.literal("")),
  service: z.string().min(1, "Service is required").max(120),
  budget: z.string().min(1, "Budget is required").max(120),
  message: z.string().min(10, "Message is too short").max(5000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  const canSendEmail =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO_EMAIL;

  try {
    if (canSendEmail) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: lead.email,
        subject: `New lead: ${lead.name} - ${lead.service}`,
        text: formatLead(lead),
      });
    } else {
      // No email configured: log the lead so the form still works in dev.
      console.log("[contact] New lead received:\n" + formatLead(lead));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to process lead:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function formatLead(lead: {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}) {
  return [
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Company: ${lead.company || "-"}`,
    `Service: ${lead.service}`,
    `Budget:  ${lead.budget}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");
}
