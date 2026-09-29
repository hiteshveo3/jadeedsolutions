import type { Metadata } from "next";
import { PhoneIcon, WhatsappBusinessIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import { ButtonLink, CheckList, Eyebrow, FactRows, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Contact — Get a Free Growth Plan",
  description:
    "Tell Jadeed Solutions about your local service business. WhatsApp, call or send the form — we reply within one business day. Based in Narowal, Pakistan, serving the UK, USA and worldwide.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const nextSteps = [
  { title: "Send your details", text: "Use the form, WhatsApp or a call. Tell us your city, your services and the jobs you want more of." },
  { title: "Get a free plan", text: "We review your website, Google visibility and competitors, then reply within one business day." },
  { title: "Decide with no pressure", text: "Pick a fixed package, the 10% Growth Partnership — or nothing at all." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Tell us where<span className="block text-[#eaf25a]">you want to grow.</span></>}
        lead="Share your city, your services and the jobs you want more of. We'll reply within one business day with a clear, no-obligation plan."
        actions={
          <>
            <ButtonLink href={siteConfig.whatsappHref} icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
            <ButtonLink href={`tel:${siteConfig.phoneHref}`} variant="outlineLight" icon={PhoneIcon}>Call {siteConfig.phone}</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="Reach us directly"
            rows={[
              { label: "Phone & WhatsApp", value: <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-[#eaf25a]">{siteConfig.phone}</a> },
              { label: "Email", value: <a href={`mailto:${siteConfig.email}`} className="hover:text-[#eaf25a]">{siteConfig.email}</a> },
              { label: "Hours", value: "Mon–Fri, 9am–6pm" },
              { label: "Reply time", value: "Within 1 business day" },
            ]}
          />
        }
      />

      <Section tone="cream" id="form" labelledBy="form-heading">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-4xl">Three steps. No pressure.</h2>
            <ol className="mt-8 border-t border-black/10">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-5 border-b border-black/10 py-6">
                  <span className="text-3xl font-semibold leading-none tracking-[-.05em] text-[#015f45]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 leading-7 text-black/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <CheckList items={["Free, no-obligation plan", "Built for UK & USA local service businesses", "You talk directly to the founder"]} />
            </div>
          </div>
          <div>
            <h2 id="form-heading" className="mb-6 text-2xl font-semibold tracking-[-.035em] md:sr-only">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      <section className="bg-[#dceee8] text-[#063d30] md:py-24" aria-labelledby="office-heading">
        <div className="container max-w-[1200px]">
          <div className="-mx-5 grid overflow-hidden md:mx-0 md:rounded-[30px] md:bg-white lg:grid-cols-[.9fr_1.1fr]">
            <div className="px-5 py-14 sm:p-10 lg:p-12">
              <Eyebrow tone="mint">Our office</Eyebrow>
              <h2 id="office-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-4xl">Based in Narowal. Working worldwide.</h2>
              <address className="mt-5 not-italic leading-7 text-[#063d30]/75">{siteConfig.address}</address>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={siteConfig.googleBusinessUrl} variant="green">View Google Business Profile</ButtonLink>
              </div>
            </div>
            <iframe src={siteConfig.googleMapsEmbedUrl} title="Jadeed Solutions office in Pejowali Kalan, Narowal" width="600" height="450" className="h-[320px] w-full border-0 md:h-[380px] lg:h-full lg:min-h-[420px]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
        </div>
      </section>
    </>
  );
}
