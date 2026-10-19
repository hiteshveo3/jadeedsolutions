/* Firebase web config for the dashboard and client portal. These values are public
   identifiers, not secrets: access is enforced by Firebase Auth, authorised domains and the
   server (every read and write goes through Next.js). They live in env so local development
   can point at the emulators (`npm run emulators`, project "demo-jadeed-solutions"). */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "jadeed-solutions",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

/** True on a developer machine running `npm run emulators`: nothing touches production. */
export const useEmulators = process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "1";

/** The session cookie the dashboard uses (httpOnly, set by /api/auth/session). */
export const SESSION_COOKIE = "__session";
