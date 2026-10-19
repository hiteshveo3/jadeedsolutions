"use client";

import { useState, useTransition } from "react";
import { inviteMember, revokeInvite, setMemberRole } from "@/app/app/(dash)/actions";
import { ErrorText, Select, field, primaryButton, secondaryButton } from "@/components/system/ui";

/* Settings → Team (from Jadeed Marketing): invite people, change roles, remove invites. */

export function InviteForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"team" | "admin">("team");
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        start(async () => {
          const result = await inviteMember(email, role);
          if (result.ok) {
            setEmail("");
            setMessage("Invited. They sign in at the dashboard with this email (Google or email and password) and get access straight away.");
          } else setMessage(result.error);
        });
      }}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="invite-email">
          Email
        </label>
        <input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className={field} />
      </div>
      <div className="w-full sm:w-40">
        <Select
          label="Role"
          value={role}
          options={[
            { value: "team", label: "Team" },
            { value: "admin", label: "Admin" },
          ]}
          onChange={setRole}
        />
      </div>
      <button type="submit" disabled={pending || !email.includes("@")} className={primaryButton}>
        {pending ? "Inviting…" : "Invite"}
      </button>
      {message ? (
        <p role="status" className="text-sm text-white/80 sm:basis-full">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function RoleMenu({ uid, role, label }: { uid: string; role: "admin" | "team" | "visitor"; label: string }) {
  const [value, setValue] = useState(role);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  return (
    <div className={pending ? "opacity-60" : undefined}>
      <Select
        label={`Role for ${label}`}
        hideLabel
        value={value}
        options={[
          { value: "admin", label: "Admin" },
          { value: "team", label: "Team" },
          { value: "visitor", label: "No access" },
        ]}
        onChange={(next) => {
          const previous = value;
          setValue(next);
          setError("");
          start(async () => {
            const result = await setMemberRole(uid, next);
            if (!result.ok) {
              setValue(previous);
              setError(result.error);
            }
          });
        }}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function RevokeInviteButton({ email }: { email: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => start(async () => void (await revokeInvite(email)))} className={secondaryButton}>
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
