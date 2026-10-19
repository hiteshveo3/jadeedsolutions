import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { pkToday } from "@/lib/utils";

/* Invoice drafting (server only, from Jadeed Marketing; never exported from a "use server"
   file, because it does no access checks of its own). Callers: the admin's workspace action
   and the monthly cron. */

const db = () => adminDb();
const now = () => FieldValue.serverTimestamp();

async function nextInvoiceNumber() {
  const ref = db().collection("settings").doc("counters");
  const year = pkToday().slice(0, 4);
  const n = await db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const next = Number(snap.get(`invoice${year}`) ?? 0) + 1;
    tx.set(ref, { [`invoice${year}`]: next }, { merge: true });
    return next;
  });
  return `JS-${year}-${String(n).padStart(4, "0")}`;
}

/**
 * Drafts an invoice from every paid customer not yet invoiced. Returns null when there is
 * nothing to bill.
 */
export async function draftInvoiceFor(clientId: string, by: string): Promise<string | null> {
  const clientRef = db().collection("clients").doc(clientId);
  const [client, paid] = await Promise.all([clientRef.get(), clientRef.collection("results").where("status", "==", "paid").get()]);
  const open = paid.docs.filter((doc) => !doc.get("invoiceId") && Number(doc.get("feeCents") ?? 0) > 0);
  if (!client.exists || !open.length) return null;
  const currency = String(client.get("currency") ?? "GBP");
  const lines = open
    .map((doc) => ({
      resultId: doc.id,
      description: `${doc.get("customer")}${doc.get("service") ? ` · ${doc.get("service")}` : ""} · paid ${doc.get("paidOn")}`,
      baseCents: Number(doc.get("paidCents") ?? 0),
      feePercent: Number(doc.get("feePercent") ?? 10),
      amountCents: Number(doc.get("feeCents") ?? 0),
    }))
    .sort((a, b) => a.description.localeCompare(b.description));
  const periods = open.map((doc) => String(doc.get("paidOn")).slice(0, 7)).sort();
  const ref = db().collection("invoices").doc();
  const number = await nextInvoiceNumber();
  const batch = db().batch();
  batch.set(ref, {
    clientId,
    clientName: client.get("businessName"),
    number,
    period: periods.at(-1),
    lines,
    totalCents: lines.reduce((sum, line) => sum + line.amountCents, 0),
    currency,
    status: "draft",
    createdBy: by,
    createdAt: now(),
    updatedAt: now(),
  });
  for (const doc of open) batch.update(doc.ref, { invoiceId: ref.id, updatedAt: now() });
  await batch.commit();
  return ref.id;
}
