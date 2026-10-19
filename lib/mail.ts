import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/* Email for the dashboard, portal, bookings and leads (server only).

   Same approach as Jadeed Marketing: Resend (free tier, 3,000 a month), with scheduled
   sends for reminders and batched message alerts. This site already had SMTP settings for
   its contact form, so when Resend isn't set up, mail goes out by SMTP instead (scheduled
   emails then wait for Resend and are skipped). With neither, emails are logged, so local
   development works without any keys. */

export type Mail = { subject: string; html: string; text: string };

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Where the team's emails go: LEAD_TO_EMAIL (as on Jadeed Marketing) or the contact form's inbox. */
export const teamInbox = () =>
  (process.env.LEAD_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

const fromAddress = () => process.env.LEAD_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || "";

const smtpReady = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

/** True when real email can be sent (Resend or SMTP). */
export const mailConfigured = () => Boolean(fromAddress() && (process.env.RESEND_API_KEY || smtpReady()));

/**
 * A short branded email: a dark brand band, then the message on paper (light colours are
 * kept for "paper" things, and email apps handle a light body more reliably).
 */
export function noticeEmail(input: {
  subject: string;
  badge?: string;
  preheader?: string;
  heading: string;
  paragraphs: string[];
  button?: { label: string; href: string };
  footer?: string;
}): Mail {
  const paragraphs = input.paragraphs.filter(Boolean);
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(input.subject)}</title></head>
<body style="margin:0;background:#E9EDE2;font-family:Arial,Helvetica,sans-serif;color:#0B1F12">
<span style="display:none;max-height:0;overflow:hidden">${esc(input.preheader ?? paragraphs[0] ?? "")}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9EDE2;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="background:#06301D;border-radius:18px 18px 0 0;padding:22px 28px">
<span style="font-size:18px;font-weight:800;color:#EEF2E7;letter-spacing:-0.3px">Jadeed <span style="color:#BEF70A">Solutions</span></span>
${input.badge ? `<span style="float:right;margin-top:2px;background:#BEF70A;color:#0B1F12;border-radius:999px;padding:4px 10px;font-size:11px;font-weight:700">${esc(input.badge)}</span>` : ""}
</td></tr>
<tr><td style="background:#F5F6EF;border-radius:0 0 18px 18px;padding:28px">
<h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:#0B1F12">${esc(input.heading)}</h1>
${paragraphs.map((p) => `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#22382A">${esc(p)}</p>`).join("")}
${input.button ? `<p style="margin:22px 0 6px"><a href="${esc(input.button.href)}" style="display:inline-block;background:#0B561C;color:#EEF2E7;text-decoration:none;font-weight:700;font-size:14px;border-radius:999px;padding:12px 22px">${esc(input.button.label)} &rarr;</a></p>` : ""}
${input.footer ? `<p style="margin:22px 0 0;padding-top:14px;border-top:1px solid #DCE2D3;font-size:12px;line-height:1.5;color:#5A6B5E">${esc(input.footer)}</p>` : ""}
</td></tr>
<tr><td style="padding:14px 8px;font-size:11px;color:#5A6B5E;text-align:center">${esc(siteConfig.name)} · ${esc(siteConfig.url.replace(/^https?:\/\//, ""))}</td></tr>
</table></td></tr></table></body></html>`;
  const text = [input.heading, "", ...paragraphs, input.button ? `\n${input.button.label}: ${input.button.href}` : "", input.footer ? `\n${input.footer}` : ""].join("\n");
  return { subject: input.subject, html, text };
}

/** A plain-text email (team alerts). */
export function textEmail(subject: string, text: string): Mail {
  return { subject, text, html: `<pre style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(text)}</pre>` };
}

/**
 * Sends (or schedules) one email. Returns the Resend id when there is one. Never throws:
 * a failed email must not undo whatever caused it.
 */
export async function sendMail(
  to: string | string[],
  mail: Mail,
  options: { replyTo?: string; scheduledAt?: string } = {}
): Promise<{ id: string | null; sent: boolean }> {
  const recipients = (Array.isArray(to) ? to : [to]).filter(Boolean);
  if (!recipients.length) return { id: null, sent: false };
  const from = fromAddress();
  try {
    if (process.env.RESEND_API_KEY && from) {
      const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
        from,
        to: recipients,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        ...(options.replyTo ? { replyTo: options.replyTo } : {}),
        ...(options.scheduledAt ? { scheduledAt: options.scheduledAt } : {}),
      });
      if (result.error) {
        console.error("[mail] Resend failed", result.error);
        return { id: null, sent: false };
      }
      return { id: result.data?.id ?? null, sent: true };
    }
    if (options.scheduledAt) {
      console.info("[mail] Scheduled email needs Resend — skipped", { to: recipients, subject: mail.subject, at: options.scheduledAt });
      return { id: null, sent: false };
    }
    if (smtpReady() && from) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({ from, to: recipients.join(", "), replyTo: options.replyTo, subject: mail.subject, text: mail.text, html: mail.html });
      return { id: null, sent: true };
    }
    console.info("[mail] Email not configured — logged only", { to: recipients, subject: mail.subject });
    return { id: null, sent: false };
  } catch (error) {
    console.error("[mail] Sending failed", error instanceof Error ? error.message : error);
    return { id: null, sent: false };
  }
}

/** Cancels a scheduled Resend email (a reminder or a batched message alert). Never throws. */
export async function cancelScheduled(id: string | undefined) {
  if (!id || id === "not-sent" || !process.env.RESEND_API_KEY) return;
  await new Resend(process.env.RESEND_API_KEY).emails.cancel(id).catch(() => null);
}
