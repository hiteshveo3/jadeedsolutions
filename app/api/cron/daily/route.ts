import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { loadChat } from "@/lib/jadeed-ai/store";
import { summarizeChat } from "@/lib/jadeed-ai/summary";
import { money } from "@/lib/money";
import { draftInvoiceFor } from "@/lib/portal/invoices";
import { clientRecipients, sendPortalEmail, teamInbox } from "@/lib/portal/notify";
import { pkToday } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 300;

/* The one daily job (vercel.json, 06:00 Pakistan time; from Jadeed Marketing):
   1. On the 1st of the month, draft invoices from every client's paid jobs and tell Sameer.
   2. Summarise chats whose "chat ended" beacon never arrived.
   3. Remind clients once about invoices more than three days overdue.
   Vercel calls it with "Authorization: Bearer CRON_SECRET". */

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Not allowed", { status: 401 });
  const db = adminDb();
  const today = pkToday();
  const report: string[] = [];

  // 1. Monthly invoice drafts.
  if (today.endsWith("-01")) {
    const clients = await db.collection("clients").where("status", "in", ["active", "onboarding", "paused"]).get();
    const drafted: string[] = [];
    for (const client of clients.docs) {
      const id = await draftInvoiceFor(client.id, "monthly job").catch((error) => {
        console.error("[cron] Invoice draft failed", client.id, error instanceof Error ? error.message : error);
        return null;
      });
      if (id) drafted.push(String(client.get("businessName")));
    }
    report.push(`Invoice drafts: ${drafted.length}${drafted.length ? ` (${drafted.join(", ")})` : ""}`);
    if (drafted.length) {
      await sendPortalEmail(teamInbox(), {
        subject: `${drafted.length} invoice ${drafted.length === 1 ? "draft is" : "drafts are"} ready to check`,
        heading: "Monthly invoice drafts",
        paragraphs: [`Drafted from last month's paid jobs: ${drafted.join(", ")}.`, "Check each one, then press Send."],
        button: { label: "Open invoices", path: "/invoices" },
      });
    }
  }

  // 2. Chats that ended without a summary.
  const recent = await db.collection("chats").where("updatedAt", ">=", Timestamp.fromMillis(Date.now() - 3 * 86_400_000)).orderBy("updatedAt", "desc").limit(200).get();
  const hourAgo = Date.now() - 3600_000;
  const stale = recent.docs.filter((d) => Number(d.get("messageCount") ?? 0) > Number(d.get("summarizedCount") ?? 0) && d.get("updatedAt").toMillis() < hourAgo).slice(0, 25);
  for (const doc of stale) {
    const chat = await loadChat(doc.id);
    if (chat) await summarizeChat(chat).catch(() => null);
  }
  report.push(`Chats summarised: ${stale.length}`);

  // 3. One reminder per overdue invoice.
  const sent = await db.collection("invoices").where("status", "==", "sent").get();
  const threeDaysAgo = new Date(Date.parse(`${today}T00:00:00Z`) - 3 * 86_400_000).toISOString().slice(0, 10);
  let reminded = 0;
  for (const invoice of sent.docs) {
    const due = String(invoice.get("dueOn") ?? "");
    if (!due || due > threeDaysAgo || invoice.get("overdueReminderAt")) continue;
    await sendPortalEmail(await clientRecipients(String(invoice.get("clientId"))), {
      subject: `Reminder: invoice ${invoice.get("number")} was due ${due}`,
      heading: "A friendly reminder",
      paragraphs: [
        `Invoice ${invoice.get("number")} for ${money(invoice.get("totalCents"), invoice.get("currency"))} was due on ${due}.`,
        "If you've already paid, please upload the transfer screenshot on the invoice so we can match it.",
      ],
      button: { label: "View the invoice", path: "/invoices" },
    });
    await invoice.ref.update({ overdueReminderAt: FieldValue.serverTimestamp() });
    reminded += 1;
  }
  report.push(`Overdue reminders: ${reminded}`);

  console.info("[cron] daily", report.join(" · "));
  return Response.json({ ok: true, report });
}
