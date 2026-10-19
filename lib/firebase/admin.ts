import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/* Server-side Firebase (route handlers, server components, server actions). Never import
   from a client component.

   Local development: FIREBASE_AUTH_EMULATOR_HOST / FIRESTORE_EMULATOR_HOST point at
   `npm run emulators`, so no credentials are needed and nothing touches production.
   Production: FIREBASE_SERVICE_ACCOUNT holds the service-account JSON, base64-encoded,
   set in Vercel by the owner at launch. */

/* Route handlers and server components can load this module separately, but they share
   one Firebase app — so the Firestore instance is cached on globalThis and settings()
   runs exactly once. */
const globalCache = globalThis as typeof globalThis & { __jadeedDb?: Firestore };

const projectId = () => process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "jadeed-solutions";

function adminApp(): App {
  if (getApps().length) return getApp();
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.FIRESTORE_EMULATOR_HOST) {
    return initializeApp({ projectId: projectId() });
  }
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!encoded) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set (and no emulator is configured).");
  const credentials = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  return initializeApp({ credential: cert(credentials), projectId: projectId() });
}

export function adminAuth(): Auth {
  return getAuth(adminApp());
}

export function adminDb(): Firestore {
  if (globalCache.__jadeedDb) return globalCache.__jadeedDb;
  const db = getFirestore(adminApp());
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch {
    /* Already configured by another module instance. */
  }
  globalCache.__jadeedDb = db;
  return db;
}

/** The project's default Storage bucket (the emulator locally, via FIREBASE_STORAGE_EMULATOR_HOST). */
export function adminBucket() {
  const name = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId()}.firebasestorage.app`;
  return getStorage(adminApp()).bucket(name);
}

/** True when a database is configured (the emulator locally, the service account in production). */
export function firestoreReady() {
  return Boolean(process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_SERVICE_ACCOUNT);
}

/** Rejects after `ms` so a slow or missing database can't hang a request. */
export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms)),
  ]);
}
