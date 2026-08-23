import type { Metadata } from "next";
import { HugeiconsIcon, MailIcon, PhoneIcon, LocationIcon, ClockIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Free Proposal for Local Service Growth",
  description:
    "Get a free proposal from Jadeed Solutions in Lahore — SEO, websites, apps and Google Ads for UK & USA local service businesses. We reply within one business day.",
};

const highlights = [
  "Free, no-obligation proposal",
  "Response within one business day",
  "Built for UK & USA local service businesses",
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28">
      <HeroBackground />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Get a free proposal for more bookings
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Tell us about your goals and we&rsquo;ll put together a tailored plan
            to help you get there. Based in Lahore — serving the UK, USA and
            worldwide.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <ContactDetail
              icon={<HugeiconsIcon icon={MailIcon} size={20} />}
              label="Email us"
              value={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            <ContactDetail
              icon={<HugeiconsIcon icon={PhoneIcon} size={20} />}
              label="Call us"
              value={siteConfig.phone}
              href={`tel:${siteConfig.phoneHref}`}
            />
            <ContactDetail
              icon={<HugeiconsIcon icon={LocationIcon} size={20} />}
              label="Location"
              value={siteConfig.addressLine}
              href={siteConfig.googleBusinessUrl}
            />
            <ContactDetail
              icon={<HugeiconsIcon icon={ClockIcon} size={20} />}
              label="Hours"
              value="Mon–Fri, 9am – 6pm"
            />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <iframe
              title="Jadeed Solutions — Lahore, Pakistan"
              src={siteConfig.googleMapsEmbedUrl}
              className="h-56 w-full border-0 sm:h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-4 py-3 text-sm">
              <span className="text-slate-600">{siteConfig.address}</span>
              <a
                href={siteConfig.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-500 hover:underline"
              >
                View Google Business Profile
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-ink">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="transition-opacity hover:opacity-80"
      >
        {content}
      </a>
    );
  }
  return content;
}
