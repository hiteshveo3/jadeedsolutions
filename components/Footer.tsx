import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { AccordionItem } from "./Accordion";
import {
  HugeiconsIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  const companyLinks = (
    <ul className="space-y-3 text-sm">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-slate-600 transition-colors hover:text-brand-500"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const serviceLinks = (
    <ul className="space-y-3 text-sm">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            className="text-slate-600 transition-colors hover:text-brand-500"
          >
            {service.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  const contactInfo = (
    <ul className="space-y-3 text-sm text-slate-600">
      <li className="flex items-center gap-3">
        <HugeiconsIcon icon={MailIcon} size={16} className="text-brand-500" />
        <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-500">
          {siteConfig.email}
        </a>
      </li>
      <li className="flex items-center gap-3">
        <HugeiconsIcon icon={PhoneIcon} size={16} className="text-brand-500" />
        <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-brand-500">
          {siteConfig.phone}
        </a>
      </li>
      <li className="flex items-start gap-3">
        <HugeiconsIcon
          icon={LocationIcon}
          size={16}
          className="mt-0.5 text-brand-500"
        />
        <span>{siteConfig.addressLine}</span>
      </li>
    </ul>
  );

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-cover"
              />
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <HugeiconsIcon icon={FacebookIcon} size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <HugeiconsIcon icon={InstagramIcon} size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <HugeiconsIcon icon={LinkedinIcon} size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <HugeiconsIcon icon={YoutubeIcon} size={16} />
              </SocialLink>
            </div>
          </div>

          {/* Desktop columns */}
          <div className="hidden lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Company
              </h4>
              <div className="mt-4">{companyLinks}</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Services
              </h4>
              <div className="mt-4">{serviceLinks}</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Get in touch
              </h4>
              <div className="mt-4">{contactInfo}</div>
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="lg:hidden">
            <AccordionItem variant="plain" title="Company">
              {companyLinks}
            </AccordionItem>
            <AccordionItem variant="plain" title="Services">
              {serviceLinks}
            </AccordionItem>
            <AccordionItem variant="plain" title="Get in touch">
              {contactInfo}
            </AccordionItem>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-slate-500 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-500"
    >
      {children}
    </a>
  );
}
