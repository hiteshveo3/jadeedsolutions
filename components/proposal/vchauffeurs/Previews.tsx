"use client";

import { useState } from "react";
import { AdminMock, ChauffeurAppMock, CustomerAppMock, Scale, WebsiteMock } from "./Mockups";

const TABS = [
  {
    id: "web",
    label: "Website",
    title: "A premium front door with booking built in",
    points: ["Chauffeur homepage in the approved brand", "Journey request widget on the first screen", "Fleet selection built around your real vehicles"],
  },
  {
    id: "customer",
    label: "Customer app",
    title: "Booking from a phone, in moments",
    points: ["Journey booking with pickup and drop-off", "Ride details and notifications", "Booking history for quick repeat journeys"],
  },
  {
    id: "chauffeur",
    label: "Chauffeur app",
    title: "Everything a driver needs, nothing more",
    points: ["Assigned bookings", "Journey information", "Status updates the office can see"],
  },
  {
    id: "admin",
    label: "Admin dashboard",
    title: "The whole operation on one screen",
    points: ["Booking management and statuses", "Customer, chauffeur and fleet information", "Booking sources and operational overview"],
  },
] as const;

function Art({ id }: { id: (typeof TABS)[number]["id"] }) {
  if (id === "web")
    return (
      <Scale units={54}>
        <WebsiteMock />
      </Scale>
    );
  if (id === "admin")
    return (
      <Scale units={58}>
        <AdminMock />
      </Scale>
    );
  return (
    <div className="mx-auto w-[62%] max-w-[260px]">
      <Scale units={15}>{id === "customer" ? <CustomerAppMock /> : <ChauffeurAppMock />}</Scale>
    </div>
  );
}

export function Previews() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  return (
    <div>
      <div role="tablist" aria-label="Product previews" className="grid grid-cols-2 gap-2 sm:inline-grid sm:grid-cols-4 sm:gap-1 sm:rounded-full sm:bg-white/[0.06] sm:p-1">
        {TABS.map((tab, idx) => (
          <button
            key={tab.id}
            id={`pv-tab-${idx}`}
            role="tab"
            aria-selected={idx === i}
            aria-controls="pv-panel"
            tabIndex={idx === i ? 0 : -1}
            onClick={() => setI(idx)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const n = (idx + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
                setI(n);
                document.getElementById(`pv-tab-${n}`)?.focus();
              }
            }}
            className={`min-h-[44px] rounded-full px-5 text-sm font-bold transition-colors ${
              idx === i ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.06] text-white/75 hover:bg-white/[0.1] hover:text-white sm:bg-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id="pv-panel" role="tabpanel" aria-labelledby={`pv-tab-${i}`} className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <div key={t.id} className="vc-fade rounded-[22px] bg-white/[0.05] p-3 sm:p-8">
          <Art id={t.id} />
        </div>
        <div key={`c${t.id}`} className="vc-fade">
          <h3 className="text-[26px] leading-[1.05] tracking-[-.04em] sm:text-[34px]">{t.title}</h3>
          <ul className="mt-5 grid gap-3 border-t border-white/[0.08] pt-5">
            {t.points.map((p) => (
              <li key={p} className="flex items-baseline gap-3 text-[16px] leading-6 text-white/85">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-[#BEF70A]" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] leading-5 text-white/55">Concept preview of a planned interface. Final screens follow V Chauffeurs&apos; approved brand and operating process.</p>
        </div>
      </div>
    </div>
  );
}
