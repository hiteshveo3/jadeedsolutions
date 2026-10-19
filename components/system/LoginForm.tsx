"use client";

import { useState, type FormEvent } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Icon } from "@/components/system/Icon";
import { field, primaryButton } from "@/components/system/ui";
import { firebaseAuth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";

/* Sign in to the dashboard or client portal: Google or email + password (as on Jadeed
   Marketing). The browser only proves who you are; the server sets the role and the
   session cookie. Design Lab idea 100 A — one centred card — with Google added and more
   room, as the owner asked. */

type Mode = "signin" | "signup" | "reset";

const MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "That email and password don't match.",
  "auth/user-not-found": "No account with that email yet.",
  "auth/wrong-password": "That email and password don't match.",
  "auth/email-already-in-use": "There's already an account with that email. Sign in instead.",
  "auth/weak-password": "Use at least 8 characters.",
  "auth/invalid-email": "That doesn't look like an email address.",
  "auth/popup-closed-by-user": "The Google window was closed before signing in.",
  "auth/too-many-requests": "Too many tries. Please wait a minute and try again.",
};

const input = cn(field, "h-12 rounded-full px-5 text-[15px]");

export function LoginForm({ base, next }: { base: string; next?: string }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function finish(user: User) {
    const post = async (force: boolean) => {
      const idToken = await user.getIdToken(force);
      const res = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
      return { res, data: (await res.json()) as { ok?: boolean; refresh?: boolean; error?: string; verify?: boolean } };
    };
    let { res, data } = await post(false);
    if (data.refresh) ({ res, data } = await post(true));
    if (data.verify) {
      await sendEmailVerification(user);
      throw new Error(data.error);
    }
    if (!res.ok || !data.ok) throw new Error(data.error ?? "Couldn't sign you in. Please try again.");
    window.location.assign(`${base}${next && next.startsWith("/") ? next : ""}` || "/");
  }

  async function run(task: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await setPersistence(firebaseAuth(), inMemoryPersistence);
      await task();
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : "";
      setError(MESSAGES[code] ?? (err instanceof Error && !code ? err.message : "Something went wrong. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  const google = () =>
    run(async () => {
      const { user } = await signInWithPopup(firebaseAuth(), new GoogleAuthProvider());
      await finish(user);
    });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (mode === "reset") {
      run(async () => {
        await sendPasswordResetEmail(firebaseAuth(), email);
        setNotice("If that email has an account, a reset link is on its way.");
      });
      return;
    }
    run(async () => {
      if (mode === "signup") {
        const { user } = await createUserWithEmailAndPassword(firebaseAuth(), email, password);
        if (name.trim()) await updateProfile(user, { displayName: name.trim() });
        await finish(user);
      } else {
        const { user } = await signInWithEmailAndPassword(firebaseAuth(), email, password);
        await finish(user);
      }
    });
  };

  const title = mode === "signup" ? "Create your account" : mode === "reset" ? "Reset your password" : "Sign in to Jadeed";

  return (
    <div className="w-full">
      <h1 className="text-center text-[30px] leading-tight tracking-[-0.03em] text-white">{title}</h1>
      <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-white/60">
        {mode === "reset" ? "We'll email you a link to choose a new password." : "Your results, updates, messages and invoices — or the team dashboard — in one place."}
      </p>

      {mode !== "reset" ? (
        <>
          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="mt-9 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white/[0.09] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.14] disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]">
              <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
              <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8Z" />
              <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z" />
            </svg>
            Continue with Google
          </button>
          <div className="my-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            <span className="h-px flex-1 bg-white/[0.1]" />
            or with email
            <span className="h-px flex-1 bg-white/[0.1]" />
          </div>
        </>
      ) : (
        <div className="mt-9" />
      )}

      <form onSubmit={submit} className="space-y-5" noValidate>
        {mode === "signup" ? (
          <div>
            <label htmlFor="login-name" className="mb-2 block pl-1 text-sm font-semibold text-white/85">
              Your name
            </label>
            <input id="login-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={input} />
          </div>
        ) : null}
        <div>
          <label htmlFor="login-email" className="mb-2 block pl-1 text-sm font-semibold text-white/85">
            Email
          </label>
          <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@business.com" className={input} />
        </div>
        {mode !== "reset" ? (
          <div>
            <div className="mb-2 flex items-baseline justify-between px-1">
              <label htmlFor="login-password" className="text-sm font-semibold text-white/85">
                Password
              </label>
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("reset")} className="text-xs font-semibold text-white/55 hover:text-[#BEF70A]">
                  Forgot password?
                </button>
              ) : null}
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className={cn(input, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/55 hover:text-white"
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="rounded-[16px] bg-white/[0.06] px-4 py-3 text-sm text-[#ffb4a8]">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p role="status" className="rounded-[16px] bg-[#BEF70A]/[0.1] px-4 py-3 text-sm text-white">
            {notice}
          </p>
        ) : null}

        <button type="submit" disabled={busy} className={cn(primaryButton, "mt-2 h-12 w-full text-[15px]")}>
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "reset" ? "Send reset link" : "Sign in"}
          {busy ? null : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1F12] text-[#BEF70A]">
              <Icon name="arrowRight" size={14} />
            </span>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-white/60">
        {mode === "signin" ? (
          <>
            Invited by Jadeed?{" "}
            <button type="button" onClick={() => setMode("signup")} className="font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4">
              Create your password
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setMode("signin")} className="font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4">
            Back to sign in
          </button>
        )}
      </p>
    </div>
  );
}
