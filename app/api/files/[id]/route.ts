import { adminBucket, adminDb } from "@/lib/firebase/admin";
import { AccessError, viewer } from "@/lib/portal/access";

export const runtime = "nodejs";

/** Sends a portal file to someone allowed to see it: Jadeed staff, or that client's people
    (payment screenshots only to the client owner). Images and PDFs open in the browser. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{8,40}$/.test(id)) return new Response("Not found", { status: 404 });
  const doc = await adminDb().collection("files").doc(id).get();
  if (!doc.exists) return new Response("Not found", { status: 404 });
  const file = doc.data()!;
  try {
    const access = await viewer(file.clientId);
    if (file.purpose === "payment" && !access.canSeeMoney) throw new AccessError();
  } catch (error) {
    if (error instanceof AccessError) return new Response("Not allowed", { status: 403 });
    throw error;
  }
  const [bytes] = await adminBucket().file(file.path).download();
  const inline = /^image\//.test(file.type) || file.type === "application/pdf";
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${String(file.name).replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
