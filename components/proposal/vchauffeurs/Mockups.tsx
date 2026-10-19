import type { ReactNode } from "react";
import { CheckIcon, HugeiconsIcon } from "@/components/icons";
import "./mockups.css";

/* Concept UI previews of the planned V Chauffeurs system. Ultra-minimal on purpose:
   one task per screen, large type, few elements, so a director can read them at a
   glance. Pure illustration (aria-hidden): no customer names, prices or statistics, and
   no domain shown as final. Colours are site tokens; the V Chauffeurs brand is TBC. */

/** Wraps devices in the mockup styles. Devices size themselves from their own width. */
export function Scale({ children, className = "" }: { units?: number; children: ReactNode; className?: string }) {
  return (
    <div className={`m ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="m-dev">
      <div className="m-phone">
        <div className="m-screen">
          <div className="m-island" />
          <div className="m-status">
            <span>9:41</span>
            <i />
          </div>
          <div className="m-app">{children}</div>
          <div className="m-home" />
        </div>
      </div>
    </div>
  );
}

export function Browser({ children }: { children: ReactNode }) {
  return (
    <div className="m-dev">
      <div className="m-browser">
        <div className="m-chrome">
          <i />
          <i />
          <i />
        </div>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className="m-logo">
      <i>V</i>
      Chauffeurs
    </span>
  );
}

function Route() {
  return (
    <>
      <div className="m-stop">
        <span className="m-dot" />
        <span>
          <span className="k">Pickup</span>
          <span className="v">Airport, Terminal 5</span>
        </span>
      </div>
      <div className="m-stop">
        <span className="m-dot sq" />
        <span>
          <span className="k">Drop-off</span>
          <span className="v">Hotel, city centre</span>
        </span>
      </div>
    </>
  );
}

/* Customer app: one task, request a journey. */
export function CustomerAppMock() {
  return (
    <Phone>
      <div>
        <div className="mut" style={{ fontSize: "0.8em" }}>
          Good afternoon
        </div>
        <div className="disp" style={{ fontSize: "2.1em", marginTop: "0.15em" }}>
          Where to?
        </div>
      </div>
      <div className="m-card">
        <Route />
      </div>
      <div className="m-card m-row" style={{ boxShadow: "inset 0 0 0 0.1em #BEF70A" }}>
        <span className="grow">
          <b>Executive saloon</b>
          <span className="mut" style={{ display: "block", fontSize: "0.75em" }}>
            Up to 3 passengers
          </span>
        </span>
        <span className="m-chip on">Selected</span>
      </div>
      <div className="m-card" style={{ display: "grid", gap: "0.7em" }}>
        <div className="m-row">
          <span className="grow mut" style={{ fontSize: "0.8em" }}>When</span>
          <b style={{ fontSize: "0.85em" }}>Today · 14:30</b>
        </div>
        <div className="m-row">
          <span className="grow mut" style={{ fontSize: "0.8em" }}>Passengers</span>
          <b style={{ fontSize: "0.85em" }}>2</b>
        </div>
      </div>
      <div style={{ marginTop: "auto" }} className="m-btn">
        Request a quote
      </div>
    </Phone>
  );
}

/* Chauffeur app: one task, the next job. */
export function ChauffeurAppMock() {
  return (
    <Phone>
      <div className="mut" style={{ fontSize: "0.8em" }}>
        Next job
      </div>
      <div className="disp" style={{ fontSize: "3.4em", lineHeight: 1, marginTop: "-0.2em" }}>
        14:30
      </div>
      <div className="m-card">
        <Route />
      </div>
      <div className="m-row" style={{ gap: "0.5em" }}>
        <span className="m-chip mute">2 passengers</span>
        <span className="m-chip mute">Meet &amp; greet</span>
      </div>
      <div style={{ marginTop: "auto" }}>
        <div className="m-btn">Start journey</div>
        <div className="mut" style={{ textAlign: "center", fontSize: "0.75em", marginTop: "0.8em" }}>
          2 more jobs today
        </div>
      </div>
    </Phone>
  );
}

/* Website: headline and a three-field booking card. */
export function WebsiteMock() {
  return (
    <Browser>
      <div className="m-site">
        <div className="m-row" style={{ justifyContent: "space-between" }}>
          <Logo />
          <span className="m-chip on">Book</span>
        </div>
        <div className="grid">
          <div>
            <div className="disp" style={{ fontSize: "2.6em", lineHeight: 1.05 }}>
              Chauffeur travel, arranged properly.
            </div>
            <div className="mut" style={{ marginTop: "0.9em", lineHeight: 1.45 }}>
              Airport, corporate and multi-day journeys.
            </div>
          </div>
          <div className="m-card" style={{ background: "rgba(4,22,26,0.85)", padding: "1.3em" }}>
            <b>Request a journey</b>
            <div style={{ marginTop: "1em" }}>
              <Route />
            </div>
            <div className="m-btn" style={{ marginTop: "1.2em" }}>
              Check availability
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* Admin dashboard: today's bookings and their status. */
export function AdminMock() {
  const rows: [string, string, string, string][] = [
    ["08:15", "Airport → City", "Confirmed", "on"],
    ["11:40", "Office → Station", "Needs a driver", ""],
    ["14:30", "Airport → Hotel", "Confirmed", "on"],
  ];
  return (
    <Browser>
      <div className="m-admin">
        <div className="m-row" style={{ justifyContent: "space-between" }}>
          <div>
            <div className="mut" style={{ fontSize: "0.8em" }}>
              Admin dashboard
            </div>
            <div className="disp" style={{ fontSize: "1.9em" }}>
              Today&apos;s bookings
            </div>
          </div>
          <span className="m-chip on">+ New booking</span>
        </div>
        <div className="m-list">
          {rows.map(([t, r, s, tone]) => (
            <div key={t} className="m-row">
              <span className="t">{t}</span>
              <span className="grow">{r}</span>
              <span className={`m-chip${tone ? ` ${tone}` : ""}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

/* Hero: one phone, readable, and beside it (never on top of it) the two things that
   happen behind the scenes when a customer books. */
export function HeroComposition() {
  const steps = ["Customer requests a journey", "Booking appears in your dashboard", "Chauffeur notified in their app"];
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-5">
      <div className="w-[62%] max-w-[250px] shrink-0 sm:w-[54%]">
        <Scale>
          <CustomerAppMock />
        </Scale>
      </div>
      <ol className="relative grid w-full gap-4 pl-5 sm:w-auto" aria-label="What happens when a customer books">
        <span className="absolute bottom-3 left-[11px] top-3 w-px bg-[#BEF70A]/30" aria-hidden="true" />
        {steps.map((t, i) => (
          <li key={t} className="relative flex items-start gap-3">
            <span
              className={`relative z-10 -ml-5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[#0B1F12] ${i === 0 ? "bg-[#BEF70A]/50" : "bg-[#BEF70A]"}`}
              aria-hidden="true"
            >
              <HugeiconsIcon icon={CheckIcon} size={11} />
            </span>
            <span className="text-[15px] font-semibold leading-snug">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
