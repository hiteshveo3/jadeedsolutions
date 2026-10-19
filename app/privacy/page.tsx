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
    <section className="relative isolate overflow-hidden bg-transparent pb-20 pt-32 sm:pt-36">
      <HeroBackground />
      <div className="container relative z-10 max-w-3xl">
        <Reveal className="flex flex-col gap-5">
          <span className="eyebrow">Legal</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/62">Last updated: 5 October 2026</p>
        </Reveal>

        <div className="prose-site mt-10 space-y-8 text-white/80">
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            privacy. This policy explains what we collect when you use{" "}
            {siteConfig.url.replace(/^https?:\/\//, "")} or contact us.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
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
            <h2 className="font-display text-xl font-semibold text-white">
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
            <h2 className="font-display text-xl font-semibold text-white">
              Jadeed AI chats, the audit form and calls
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Questions you ask Jadeed AI, and its answers, are saved so the
                team can follow up and improve the answers. Chats are kept for
                24 months after the last message, then deleted automatically. A
                random ID in a cookie links the questions of one visit; we
                don&rsquo;t ask for your name unless you choose to send a
                question to Sameer.
              </li>
              <li>
                Answers are written by Google&rsquo;s Gemini model from this
                website&rsquo;s own pages. Your question is sent to Google for
                that purpose only.
              </li>
              <li>
                When you send the free-audit form, we store your answers, a short
                summary written by Jadeed AI, and a private audit page that only
                people with its link can open.
              </li>
              <li>
                If you book a call, we keep its time and how you&rsquo;d like to
                be called, and add it to our Google Calendar with your email so
                Google can send you the invite.
              </li>
              <li>
                Clients&rsquo; portal data (customers recorded, messages, files,
                proposals and invoices) is visible only to that client&rsquo;s
                people and the Jadeed team.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Sharing
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              We may use trusted tools (hosting, email, analytics, ad platforms,
              Google Firebase for storage and sign-in, Google Gemini for Jadeed
              AI) that process data on our behalf. We only share what is needed
              to run the service you requested.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Questions about privacy:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-[#BEF70A]"
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
