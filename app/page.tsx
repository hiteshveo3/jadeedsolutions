import { HugeiconsIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/icons";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { AccordionItem } from "@/components/Accordion";
import { LinkButton } from "@/components/Button";
import { services } from "@/lib/services";
import { testimonials, whyUs, homeFaqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Everything you need to grow online"
            description="Four core services that work together as one integrated growth engine for your business."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Why Jadeed"
            title="A growth partner that actually moves the needle"
            description="We combine strategy, creativity, and engineering to deliver results you can measure — and revenue you can bank."
            className="lg:sticky lg:top-28"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-transparent hover:bg-brand-50">
                  <HugeiconsIcon icon={CheckCircleIcon} size={28} className="text-brand-500" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Client love"
            title="Results our clients rave about"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/portfolio" variant="secondary">
              See our case studies
              <HugeiconsIcon icon={ArrowRightIcon} size={16} />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="Straight answers about how we work with local service businesses."
          />
          <div className="mt-10 space-y-3">
            {homeFaqs.map((f, i) => (
              <AccordionItem
                key={f.question}
                title={f.question}
                variant="card-white"
                defaultOpen={i === 0}
              >
                {f.answer}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
