import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { money } from "@/lib/money";
import { AccessError, viewer } from "@/lib/portal/access";
import { billingSettings, getClient, getInvoice } from "@/lib/portal/data";
import { siteConfig } from "@/lib/site";
import { INVOICE_STATUS_LABEL } from "@/lib/system/types";

export const runtime = "nodejs";

/* An invoice as a PDF (pdf-lib, no paid service; from Jadeed Marketing). An invoice is real
   paper, so it is light: who it's from, who it's for, each paid job's fee, the total and
   where to pay. Staff and the client owner only. */

const INK = rgb(0.043, 0.122, 0.071);
const MUTED = rgb(0.33, 0.38, 0.35);
const LINE = rgb(0.86, 0.89, 0.83);
const LIME = rgb(0.745, 0.969, 0.039);
const FOREST = rgb(0.024, 0.188, 0.114);

/** Standard PDF fonts only cover Latin text; anything else becomes "?" rather than failing. */
const clean = (text: string) =>
  text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/·/g, "-")
    .replace(/[^\x20-\x7E -ÿ€]/g, "?");

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) return new Response("Not found", { status: 404 });
  try {
    const access = await viewer(invoice.clientId);
    if (!access.canSeeMoney) throw new AccessError();
    if (access.side === "client" && invoice.status === "draft") throw new AccessError();
  } catch (error) {
    if (error instanceof AccessError) return new Response("Not allowed", { status: 403 });
    throw error;
  }
  const [client, billing] = await Promise.all([getClient(invoice.clientId), billingSettings()]);
  // pdf-lib's standard fonts cover "£" (WinAnsi), so amounts keep their symbol.
  const amount = (cents?: number) => money(cents, invoice.currency);

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Invoice ${invoice.number}`);
  pdf.setAuthor(siteConfig.name);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page: PDFPage = pdf.addPage([595.28, 841.89]); // A4
  const margin = 48;
  const width = page.getWidth() - margin * 2;
  let y = page.getHeight() - margin;

  const safe = clean;
  const text = (value: string, x: number, size = 10, font: PDFFont = regular, color = INK) => page.drawText(safe(value), { x, y, size, font, color });
  const right = (value: string, xRight: number, size = 10, font: PDFFont = regular, color = INK) =>
    page.drawText(safe(value), { x: xRight - font.widthOfTextAtSize(safe(value), size), y, size, font, color });
  const wrap = (value: string, size: number, maxWidth: number, font: PDFFont = regular) => {
    const lines: string[] = [];
    let line = "";
    for (const word of safe(value).split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };
  const newPageIfNeeded = (space: number) => {
    if (y - space < margin + 40) {
      page = pdf.addPage([595.28, 841.89]);
      y = page.getHeight() - margin;
    }
  };

  // Header: a forest band with the lime mark, who it's from, invoice details.
  page.drawRectangle({ x: 0, y: page.getHeight() - 10, width: page.getWidth(), height: 10, color: FOREST });
  page.drawRectangle({ x: margin, y: y - 6, width: 46, height: 6, color: LIME });
  y -= 24;
  text(siteConfig.name, margin, 18, bold);
  right("INVOICE", margin + width, 18, bold);
  y -= 16;
  text("Local SEO, websites and the Growth Partnership", margin, 9, regular, MUTED);
  right(invoice.number, margin + width, 11, bold);
  y -= 13;
  text(`Narowal, Punjab, Pakistan - ${siteConfig.email}`, margin, 9, regular, MUTED);
  right(INVOICE_STATUS_LABEL[invoice.status], margin + width, 9, regular, MUTED);
  if (billing?.registration) {
    y -= 13;
    text(billing.registration, margin, 9, regular, MUTED);
  }

  y -= 32;
  text("BILL TO", margin, 8, bold, MUTED);
  text("DATES", margin + width / 2, 8, bold, MUTED);
  y -= 14;
  const billTo = [client?.businessName ?? invoice.clientName, client?.contactName, [client?.city, client?.state, client?.country].filter(Boolean).join(", "), client?.ownerEmail].filter(Boolean) as string[];
  const dates = [invoice.issuedOn ? `Issued: ${invoice.issuedOn}` : "Issued: not yet", invoice.dueOn ? `Due: ${invoice.dueOn}` : "", `Fees earned: ${invoice.period}`, invoice.paidOn ? `Paid: ${invoice.paidOn}` : ""].filter(Boolean);
  for (let i = 0; i < Math.max(billTo.length, dates.length); i += 1) {
    if (billTo[i]) text(billTo[i], margin, 10, i === 0 ? bold : regular);
    if (dates[i]) text(dates[i], margin + width / 2, 10);
    y -= 14;
  }

  // Lines.
  y -= 18;
  const cols = { base: margin + width * 0.62, pct: margin + width * 0.78, amount: margin + width };
  page.drawLine({ start: { x: margin, y: y + 12 }, end: { x: margin + width, y: y + 12 }, thickness: 0.8, color: LINE });
  text("Paid job", margin, 8, bold, MUTED);
  right("Customer paid", cols.base, 8, bold, MUTED);
  right("Fee %", cols.pct, 8, bold, MUTED);
  right("Fee", cols.amount, 8, bold, MUTED);
  y -= 8;
  page.drawLine({ start: { x: margin, y }, end: { x: margin + width, y }, thickness: 0.8, color: LINE });
  y -= 16;
  for (const line of invoice.lines) {
    const described = wrap(line.description, 10, width * 0.5);
    newPageIfNeeded(described.length * 13 + 10);
    described.forEach((part, index) => {
      text(part, margin, 10);
      if (index === 0) {
        if (line.baseCents !== undefined) right(amount(line.baseCents), cols.base);
        if (line.feePercent !== undefined) right(`${line.feePercent}%`, cols.pct);
        right(amount(line.amountCents), cols.amount, 10, bold);
      }
      y -= 13;
    });
    y -= 4;
    page.drawLine({ start: { x: margin, y: y + 6 }, end: { x: margin + width, y: y + 6 }, thickness: 0.5, color: LINE });
    y -= 6;
  }
  y -= 8;
  newPageIfNeeded(60);
  text("Total due", cols.pct - 60, 12, bold);
  right(amount(invoice.totalCents), cols.amount, 14, bold);

  // Where to pay.
  y -= 40;
  newPageIfNeeded(140);
  text("HOW TO PAY", margin, 8, bold, MUTED);
  y -= 15;
  if (billing) {
    const rows: [string, string | undefined][] = [
      ["Bank transfer to", billing.accountTitle],
      ["Bank", billing.bankName],
      ["IBAN", billing.iban],
      ["Account number", billing.accountNumber],
      ["SWIFT / BIC", billing.swift],
      ["Branch", billing.branch],
      ["Reference", invoice.number],
    ];
    for (const [label, value] of rows) {
      if (!value) continue;
      text(label, margin, 10, regular, MUTED);
      text(value, margin + 130, 10, label === "IBAN" ? bold : regular);
      y -= 14;
    }
    if (billing.notes) {
      y -= 4;
      for (const part of wrap(billing.notes, 9, width)) {
        text(part, margin, 9, regular, MUTED);
        y -= 12;
      }
    }
  } else {
    text("Bank details will be added before this invoice is sent.", margin, 10, regular, MUTED);
    y -= 14;
  }
  y -= 10;
  for (const part of wrap(
    "After paying, upload the transfer screenshot on this invoice in your Jadeed portal. Fees are charged only on jobs your customers have completed and paid for.",
    9,
    width
  )) {
    text(part, margin, 9, regular, MUTED);
    y -= 12;
  }

  const bytes = await pdf.save();
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${invoice.number}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
