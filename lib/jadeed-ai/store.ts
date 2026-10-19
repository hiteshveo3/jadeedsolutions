import { createHash, randomBytes } from "node:crypto";
import { FieldValue, Timestamp, type DocumentData } from "firebase-admin/firestore";
import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";
import type { ChatMessageRecord, ChatSession } from "@/lib/system/types";

/* Jadeed AI chat storage (server only), from Jadeed Marketing (lib/jadeed-ai/store.ts).
   Saving must never break a chat: every function here catches its own errors, and the chat
   carries on unsaved if Firestore is down.

   On this site the chat id and a random visitor id live in httpOnly cookies set by
   /api/ask, so the browser code doesn't change: a new conversation starts a new chat
   document, and later questions in it are added to the same one. */

const RETENTION_DAYS = 730;
export const CHAT_ID = /^[A-Za-z0-9]{20}$/;
export const VISITOR_ID = /^[A-Za-z0-9_-]{16,64}$/;
export const CHAT_COOKIE = "jadeed_chat";
export const VISITOR_COOKIE = "jadeed_vid";

const expireAt = () => Timestamp.fromMillis(Date.now() + RETENTION_DAYS * 24 * 3600_000);
const iso = (value: unknown) => (value instanceof Timestamp ? value.toDate().toISOString() : typeof value === "string" ? value : "");

function log(action: string, error: unknown) {
  console.error(`[jadeed-ai] ${action} failed`, error instanceof Error ? error.message : error);
}

export const newVisitorId = () => randomBytes(18).toString("base64url");
/** A new chat document id (Firestore's own 20-character ids). */
export const newChatId = () => adminDb().collection("chats").doc().id;

export function toSession(id: string, data: DocumentData): ChatSession {
  return { ...(data as ChatSession), id, createdAt: iso(data.createdAt), updatedAt: iso(data.updatedAt) };
}

export async function loadChat(id: string | undefined): Promise<ChatSession | null> {
  if (!id || !CHAT_ID.test(id) || !firestoreReady()) return null;
  try {
    const snap = await withTimeout(adminDb().collection("chats").doc(id).get(), 4000, "Reading the chat");
    return snap.exists ? toSession(snap.id, snap.data()!) : null;
  } catch (error) {
    log("Reading a chat", error);
    return null;
  }
}

/**
 * Saves one visitor message and the reply. The first turn creates the chat document; later
 * turns add to it. Never throws.
 */
export async function recordTurn(input: {
  chatId: string;
  isNew: boolean;
  visitorId: string;
  page: string;
  user: ChatMessageRecord;
  reply: ChatMessageRecord;
}) {
  if (!firestoreReady() || !CHAT_ID.test(input.chatId)) return;
  const ref = adminDb().collection("chats").doc(input.chatId);
  try {
    await withTimeout(
      ref.set(
        {
          ...(input.isNew ? { visitorId: input.visitorId, contact: {}, firstPage: input.page, createdAt: FieldValue.serverTimestamp() } : {}),
          messages: FieldValue.arrayUnion(input.user, input.reply),
          messageCount: FieldValue.increment(2),
          userMessageCount: FieldValue.increment(1),
          pages: FieldValue.arrayUnion(input.page),
          updatedAt: FieldValue.serverTimestamp(),
          expireAt: expireAt(),
        },
        { merge: true }
      ),
      5000,
      "Saving the chat turn"
    );
  } catch (error) {
    log("Saving a chat turn", error);
  }
}

export async function updateChat(id: string, fields: Record<string, unknown>) {
  try {
    await withTimeout(adminDb().collection("chats").doc(id).update({ ...fields, updatedAt: FieldValue.serverTimestamp() }), 4000, "Updating the chat");
  } catch (error) {
    log("Updating a chat", error);
  }
}

/** Contact details merge field by field, so a later phone number doesn't erase an email. */
export function contactFields(contact: ChatSession["contact"]) {
  return Object.fromEntries(
    Object.entries(contact)
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([key, value]) => [`contact.${key}`, (value as string).trim()])
  );
}

/* ------------------------------ Teach Jadeed AI ------------------------------ */

const questionKey = (question: string) => createHash("sha256").update(question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()).digest("hex").slice(0, 24);

/** Saves a question Jadeed AI couldn't answer, for the team to answer in "Teach Jadeed AI". */
export async function logUnanswered(question: string, chatId: string | null) {
  if (!firestoreReady() || question.trim().length < 5) return;
  const ref = adminDb().collection("knowledge").doc(`q_${questionKey(question)}`);
  try {
    await withTimeout(
      adminDb().runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (snap.exists) {
          tx.update(ref, {
            count: FieldValue.increment(1),
            ...(chatId ? { chatIds: FieldValue.arrayUnion(chatId) } : {}),
            lastAskedAt: FieldValue.serverTimestamp(),
          });
        } else {
          tx.set(ref, {
            question: question.slice(0, 300),
            answer: "",
            status: "pending",
            createdBy: "chat",
            count: 1,
            chatIds: chatId ? [chatId] : [],
            createdAt: FieldValue.serverTimestamp(),
            lastAskedAt: FieldValue.serverTimestamp(),
          });
        }
      }),
      4000,
      "Logging the question"
    );
    if (chatId) await updateChat(chatId, { loggedQuestions: FieldValue.increment(1) });
  } catch (error) {
    log("Logging an unanswered question", error);
  }
}

/* ------------------------------ tickets ------------------------------ */

export async function createTicket(input: { chatId?: string; question: string; email?: string; phone?: string; name?: string; page?: string }) {
  if (!firestoreReady()) return null;
  try {
    const ref = adminDb().collection("tickets").doc();
    await withTimeout(ref.set({ ...input, status: "open", createdAt: FieldValue.serverTimestamp() }), 4000, "Saving the ticket");
    return ref.id;
  } catch (error) {
    log("Saving a ticket", error);
    return null;
  }
}
