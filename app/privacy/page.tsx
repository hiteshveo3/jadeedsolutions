import type { Metadata } from "next";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects and uses information when you contact us or use jadeedsolutions.com.`,
};

export default function PrivacyPage() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-20 pt-16 sm:pt-20">
      <HeroBackground />
      <div className="container relative z-10 max-w-3xl">
        <Reveal className="flex flex-col gap-5">
          <span className="eyebrow">Legal</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">Last updated: 24 July 2026</p>
        </Reveal>

        <div className="prose-site mt-10 space-y-8 text-slate-700">
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            privacy. This policy explains what we collect when you use{" "}
            {siteConfig.url.replace(/^https?:\/\//, "")} or contact us.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              What we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Contact details you send us (name, email, phone, business name,
                message) via WhatsApp, forms, email or phone.
              </li>
              <li>
                Basic technical data (IP, browser, pages viewed) if analytics or
                hosting logs are enabled.
              </li>
              <li>
                Business information needed to deliver SEO, websites, apps or
                ads services you hire us for.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              How we use it
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>To reply to enquiries and provide proposals.</li>
              <li>To deliver and improve our services.</li>
              <li>To send project updates you have asked for.</li>
              <li>We do not sell your personal data.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Sharing
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              We may use trusted tools (hosting, email, analytics, ad platforms)
              that process data on our behalf. We only share what is needed to
              run the service you requested.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Questions about privacy:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand-500"
              >
                {siteConfig.email}
              </a>
              <br />
              {siteConfig.addressLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
