import { randomBytes } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminBucket, adminDb } from "@/lib/firebase/admin";
import { AccessError, viewer } from "@/lib/portal/access";
import { allow, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/* Uploads for the client portal (from Jadeed Marketing): message attachments, work-update
   files, payment screenshots and proposal files. Files go to Storage under clients/{id}/,
   and only people with access to that client can download them again (/api/files/[id]). */

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/heic",
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
const PURPOSES = new Set(["message", "update", "payment", "proposal"]);

const safeName = (name: string) => name.replace(/[^\w.\- ]+/g, "_").replace(/\s+/g, " ").trim().slice(0, 120) || "file";

export async function POST(request: Request) {
  if (!allow(`files:${clientIp(request) ?? "unknown"}`, 40, 10 * 60 * 1000)) return Response.json({ error: "Too many uploads. Please wait a minute." }, { status: 429 });
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "That upload couldn't be read." }, { status: 400 });
  }
  const file = form.get("file");
  const purpose = String(form.get("purpose") ?? "");
  const requested = String(form.get("clientId") ?? "") || undefined;
  if (!(file instanceof File)) return Response.json({ error: "No file was sent." }, { status: 400 });
  if (!PURPOSES.has(purpose)) return Response.json({ error: "Unknown upload." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Files can be up to 10 MB." }, { status: 413 });
  if (!TYPES.has(file.type)) return Response.json({ error: "Use an image, PDF, Word, Excel, PowerPoint, CSV or text file." }, { status: 415 });

  let access;
  try {
    access = await viewer(requested);
  } catch (error) {
    if (error instanceof AccessError) return Response.json({ error: "Not allowed." }, { status: 403 });
    throw error;
  }
  if (purpose === "payment" && !access.canSeeMoney) return Response.json({ error: "Not allowed." }, { status: 403 });
  if ((purpose === "update" || purpose === "proposal") && access.side !== "team") return Response.json({ error: "Not allowed." }, { status: 403 });

  const id = randomBytes(12).toString("base64url");
  const name = safeName(file.name);
  const path = `clients/${access.clientId}/${purpose}/${id}/${name}`;
  await adminBucket()
    .file(path)
    .save(Buffer.from(await file.arrayBuffer()), { contentType: file.type, resumable: false, metadata: { cacheControl: "private, max-age=0" } });
  await adminDb().collection("files").doc(id).set({
    name,
    type: file.type,
    size: file.size,
    clientId: access.clientId,
    purpose,
    path,
    uploadedBy: access.user.email,
    createdAt: FieldValue.serverTimestamp(),
  });
  return Response.json({ file: { id, name, type: file.type, size: file.size } });
}
