import type { Metadata } from "next";
import { BillingForm } from "@/components/portal/Invoices";
import { Icon } from "@/components/system/Icon";
import { EmptyState, Label, PageHeader, Panel } from "@/components/system/Page";
import { InviteForm, RevokeInviteButton, RoleMenu } from "@/components/system/SettingsControls";
import { primaryButton } from "@/components/system/ui";
import { monthlyBudgetUsd } from "@/lib/ai/gemini";
import { calendarStatus, googleConfigured } from "@/lib/google/calendar";
import { mailConfigured } from "@/lib/mail";
import { billingSettings } from "@/lib/portal/data";
import { aiUsage, listInvites, listUsers } from "@/lib/system/data";
import { requireUser } from "@/lib/system/session";
import { ROLE_LABEL } from "@/lib/system/types";
import { cn, pkMonth } from "@/lib/utils";

export const metadata: Metadata = { title: "Settings" };

const NOTICE: Record<string, { text: string; good: boolean }> = {
  connected: { text: "Google Calendar is connected. New calls now get a Meet link and block your calendar.", good: true },
  denied: { text: "Google wasn't given access, so nothing changed.", good: false },
  expired: { text: "That sign-in took too long. Please press Connect again.", good: false },
  error: { text: "Google didn't accept the connection. Please try again.", good: false },
  not_configured: { text: "The Google OAuth client keys aren't set on the server yet (GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET).", good: false },
};

/* Settings (from Jadeed Marketing): Google Calendar, the team and roles, this month's AI
   spend, and the bank details on invoices. Admins only. */
export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ google?: string }> }) {
  const [user, params] = await Promise.all([requireUser(), searchParams]);
  if (user.role !== "admin") {
    return (
      <>
        <PageHeader title="Settings" />
        <Panel>
          <EmptyState icon="lock" title="Admins only" body="Settings change how the whole system works, so only Sameer can open them." />
        </Panel>
      </>
    );
  }

  const month = pkMonth();
  const [status, users, invites, usage, billing] = await Promise.all([calendarStatus(), listUsers(), listInvites(), aiUsage(month), billingSettings()]);
  const budget = monthlyBudgetUsd();
  const spent = usage.costMicros / 1_000_000;
  const staffUsers = users.filter((u) => u.role === "admin" || u.role === "team").sort((a, b) => a.name.localeCompare(b.name));
  const openInvites = invites.filter((invite) => !invite.acceptedAt && (invite.role === "team" || invite.role === "admin"));
  const FEATURE: Record<string, string> = { chat: "Site chat", chat_summary: "Chat summaries and reports", lead: "Lead scoring and drafts", portal: "Client portal assistant" };
  const notice = params.google ? NOTICE[params.google] : undefined;
  const ready = googleConfigured();

  return (
    <>
      <PageHeader title="Settings" description="How calls, the team, email and Jadeed AI work." />
      {notice ? (
        <p role="status" className={cn("mb-4 rounded-[16px] px-4 py-3 text-sm text-white", notice.good ? "bg-[#BEF70A]/[0.1]" : "bg-white/[0.06]")}>
          {notice.text}
        </p>
      ) : null}

      <div className="space-y-4">
        <Panel title="Google Calendar">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BEF70A]/[0.1] text-[#BEF70A]">
                <Icon name="calendar" size={20} />
              </span>
              <div className="text-sm leading-relaxed text-white/70">
                {status.connected ? (
                  <>
                    <p className="font-semibold text-white">Connected{status.email ? ` to ${status.email}` : ""}</p>
                    <p>Booked calls go on this calendar with a Google Meet link, and busy times there are never offered to visitors.</p>
                    {status.lastError ? <p className="mt-1 text-[#ffb4a8]">Last problem: {status.lastError}. Reconnect to fix it.</p> : null}
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-white">Not connected</p>
                    <p>Calls still get booked, but without a Meet link or a calendar event. Connect jadeedsolutionz@gmail.com once to turn both on.</p>
                  </>
                )}
              </div>
            </div>
            {ready ? (
              // A plain link: the route redirects to Google, which needs a full page load.
              <a href="/api/google/connect" className={cn(primaryButton, "min-h-11 shrink-0")}>
                <Icon name="calendar" size={18} />
                {status.connected ? "Reconnect" : "Connect Google Calendar"}
              </a>
            ) : (
              <p className="text-sm text-white/55">Waiting for the OAuth client keys on the server.</p>
            )}
          </div>
        </Panel>

        <Panel title="Team">
          <ul className="divide-y divide-white/[0.06]">
            {staffUsers.map((member) => (
              <li key={member.uid} className="flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{member.name || member.email}</p>
                  <p className="truncate text-xs text-white/50">{member.email}</p>
                </div>
                {member.uid === user.uid ? (
                  <span className="text-sm text-white/60">{ROLE_LABEL[member.role]} (you)</span>
                ) : (
                  <div className="w-40">
                    <RoleMenu uid={member.uid} role={member.role === "admin" ? "admin" : "team"} label={member.name || member.email} />
                  </div>
                )}
              </li>
            ))}
          </ul>
          {openInvites.length ? (
            <div className="mt-4 border-t border-white/[0.08] pt-4">
              <Label>Invited, not signed in yet</Label>
              <ul className="mt-2 divide-y divide-white/[0.06]">
                {openInvites.map((invite) => (
                  <li key={invite.email} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0 truncate text-sm text-white">
                      {invite.email} · {ROLE_LABEL[invite.role]}
                    </span>
                    <RevokeInviteButton email={invite.email} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <InviteForm />
          </div>
        </Panel>

        <Panel title={`Jadeed AI spend · ${month}`}>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-3xl font-extrabold tabular-nums text-[#BEF70A]">${spent.toFixed(2)}</p>
            <p className="text-sm text-white/60">
              of ${budget.toFixed(2)} this month · {usage.calls} AI calls
            </p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.1]" role="img" aria-label={`${Math.round((spent / budget) * 100)}% of the budget used`}>
            <div className="h-full rounded-full bg-[#BEF70A]" style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} />
          </div>
          <ul className="mt-4 space-y-1.5 text-sm text-white/70">
            {Object.entries(usage.byFeature).map(([feature, value]) => (
              <li key={feature} className="flex justify-between gap-3">
                <span>{FEATURE[feature] ?? feature}</span>
                <span className="tabular-nums">
                  ${((value.costMicros ?? 0) / 1_000_000).toFixed(3)} · {value.calls ?? 0} calls
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/45">Emails go to you at 50%, 80% and 100%. At 100% the site chat answers from the site&apos;s own pages until next month. Change the limit with AI_MONTHLY_BUDGET_USD.</p>
        </Panel>

        <Panel title="Email">
          <p className="text-sm text-white/70">
            {mailConfigured()
              ? "Email is set up: lead alerts, confirmations, call reminders and portal notices go out."
              : "Email isn't set up on this server yet, so emails are only logged. Add RESEND_API_KEY and LEAD_FROM_EMAIL (or the SMTP settings) to send them."}
          </p>
        </Panel>

        <Panel title="Bank details on invoices">
          <BillingForm billing={billing} />
        </Panel>
      </div>
    </>
  );
}
