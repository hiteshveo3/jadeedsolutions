import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Design lab answers → design-lab/round-<n>.json, so Claude can read the
 * owner's picks straight from the project. Development only: in production
 * this route 404s, so nothing on the live site can write files.
 */
const DIR = path.join(process.cwd(), "design-lab");
const MAX_BYTES = 100_000;

// Numbered rounds, plus named side rounds (e.g. "header") that sit outside the numbering.
const round = z.union([z.number().int().min(1).max(20), z.enum(["header", "ideas"])]);

const answersSchema = z.object({
  round,
  answers: z.record(z.array(z.string().max(64)).max(12)),
  notes: z.record(z.string().max(5000)),
  summary: z.string().max(20_000),
  palette: z.record(z.string().max(64)).optional(),
});

const isDev = () => process.env.NODE_ENV === "development";
const fileFor = (n: number | string) => path.join(DIR, `round-${n}.json`);

export async function GET(request: Request) {
  if (!isDev()) return new Response(null, { status: 404 });
  const param = new URL(request.url).searchParams.get("round") ?? "1";
  const parsed = round.safeParse(/^\d+$/.test(param) ? Number(param) : param);
  if (!parsed.success) return NextResponse.json({ error: "Unknown round." }, { status: 400 });

  try {
    const json = await fs.readFile(fileFor(parsed.data), "utf8");
    return new Response(json, { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  if (!isDev()) return new Response(null, { status: 404 });

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return NextResponse.json({ error: "Too large." }, { status: 413 });

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = answersSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: "Unexpected shape." }, { status: 400 });

  const { round: n, summary, answers, notes, palette } = parsed.data;
  const savedAt = new Date().toISOString();
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(fileFor(n), JSON.stringify({ round: n, savedAt, summary, palette, answers, notes }, null, 2), "utf8");
  return NextResponse.json({ ok: true, savedAt });
}
