import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { firebaseConfig, useEmulators } from "./config";

/* Browser-side Firebase. Only Auth is used from the browser; every database read and write
   goes through the Next.js server, so the Firestore rules stay closed. */

let auth: Auth | null = null;

function app(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function firebaseAuth(): Auth {
  if (auth) return auth;
  auth = getAuth(app());
  if (useEmulators) connectAuthEmulator(auth, "http://127.0.0.1:9098", { disableWarnings: true });
  return auth;
}
