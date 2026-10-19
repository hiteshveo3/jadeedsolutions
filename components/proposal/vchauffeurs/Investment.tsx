import { PLANS, gbp, usd } from "./data";
import { LABEL } from "./ui";

/* Investment views. Server-rendered: nothing here needs client JavaScript.
   GBP and USD are never added together, because no exchange rate has been agreed. */

/** Every kind of payment, sorted by type, so no one reads them as a single monthly bill. */
export function PaymentTypes() {
  const rows: { type: string; what: string; when: string; currency: string }[] = [
    { type: "Monthly partnership fee", what: "£300, £200 or £100, depending on the model", when: "Monthly, in advance", currency: "GBP" },
    { type: "Booking bonus", what: "£10 or £20 per eligible completed booking (Balanced, Performance)", when: "Monthly, after completion", currency: "GBP" },
    { type: "Third-party subscriptions", what: "Claude ($200/mo, months 1–3, then $20/mo) · Apple Developer ($99/yr)", when: "Monthly or yearly", currency: "USD" },
    { type: "One-time", what: "Google Play developer registration ($25)", when: "Once", currency: "USD" },
    { type: "Usage-based and optional", what: "Domain, hosting, maps, SMS, payments, advertising", when: "Only when required or approved", currency: "As billed" },
  ];
  return (
    <ol className="grid gap-2 md:grid-cols-5">
      {rows.map((r, i) => (
        <li key={r.type} className="flex flex-col rounded-[20px] bg-white/[0.05] p-5">
          <span className="vc-num text-sm font-bold text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-2 font-bold leading-snug">{r.type}</p>
          <p className="mt-2 text-sm leading-6 text-white/[0.72]">{r.what}</p>
          <p className="mt-auto pt-4 text-xs font-semibold text-white/55">
            {r.when} · {r.currency}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** First three months, all three models side by side. */
export function FirstThreeMonths() {
  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-5 sm:p-8 lg:p-10">
      <p className={`${LABEL} text-[#BEF70A]`}>Your first three months</p>
      <h3 className="mt-2 text-[28px] leading-[1.1] sm:text-4xl">What starting costs, by model</h3>

      <ul className="mt-8 grid gap-3 md:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.id} className={`rounded-[22px] p-5 sm:p-6 ${p.recommended ? "bg-white/[0.08] ring-1 ring-inset ring-[#BEF70A]" : "bg-white/[0.05]"}`}>
            <p className="font-bold">{p.name.replace(" Partnership", "")}</p>
            <p className="mt-4 text-xs text-white/60">Partnership fees · 3 months · GBP</p>
            <p className="vc-num mt-1 text-[40px] font-semibold leading-none tracking-[-.04em] text-[#BEF70A]">{gbp(p.base * 3)}</p>
            <p className="vc-num mt-1 text-sm text-white/60">3 × {gbp(p.base)}</p>
            <dl className="mt-5 grid gap-2 border-t border-white/[0.08] pt-4 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Booking bonus</dt>
                <dd className="vc-num text-right font-bold">{p.bonus ? `${gbp(p.bonus)} each` : "None"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Setup fee</dt>
                <dd className="vc-num font-bold">£0</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid gap-3 rounded-[22px] bg-white/[0.05] p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-6">
        <div>
          <p className="text-xs text-white/60">Same for every model · USD</p>
          <p className="vc-num mt-1 text-[32px] font-semibold leading-none tracking-[-.04em]">{usd(600)}</p>
        </div>
        <p className="text-[15px] leading-6 text-white/75">
          Claude Max 20x for months 1–3 (3 × {usd(200)}), then Claude Pro at {usd(20)}/month. Domain, publishing and usage costs are added only as required.
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-white/60">
        Booking bonuses depend on eligible completed bookings, which are not guaranteed, so they are shown per booking rather than as a total. GBP and USD are kept separate: actual tax, exchange-rate and
        payment-provider charges are confirmed at checkout.
      </p>
    </div>
  );
}
