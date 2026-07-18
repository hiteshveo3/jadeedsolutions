import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  MessageCircle,
  X
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain03Icon as HugeAiBrain03Icon,
  Chart01Icon as HugeChart01Icon,
  DashboardBrowsingIcon as HugeDashboardBrowsingIcon,
  MarketingIcon as HugeMarketingIcon,
  MobileProgramming01Icon as HugeMobileProgramming01Icon,
  SeoIcon as HugeSeoIcon,
  SparklesIcon as HugeSparklesIcon,
  WebDesign01Icon as HugeWebDesign01Icon,
  WorkflowCircle03Icon as HugeWorkflowCircle03Icon
} from "@hugeicons/core-free-icons";

const siteUrl = "https://jadeedsolutions.com";
const faviconPath = "/assets/Jadeed%20Solutions%20favicon.png";

/** Replace with the live WhatsApp number in international format, digits only. */
const WHATSAPP_E164 = "10000000000";
const WHATSAPP_MESSAGE =
  "Hi Jadeed Solutions — I want a full growth system for my local service business.";
const whatsappHref = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function WhatsAppButton({ className = "cta-button", children = "Chat on WhatsApp" }) {
  return (
    <a className={className} href={whatsappHref} target="_blank" rel="noreferrer">
      <MessageCircle size={18} strokeWidth={2} />
      <span>{children}</span>
    </a>
  );
}

function HugeIcon({ icon, size = 28, strokeWidth = 1.55 }) {
  return <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={strokeWidth} />;
}

const createHugeIcon = (icon) => function JadeedHugeIcon(props) {
  return <HugeIcon icon={icon} {...props} />;
};

const services = [
  {
    slug: "web-development",
    title: "Web Development",
    eyebrow: "Fast, scalable websites",
    description:
      "Custom websites, landing pages, CMS builds, and performance-focused digital platforms engineered for speed, clarity, and long-term SEO value.",
    keywords: "web development agency, custom website development, performance websites",
    icon: createHugeIcon(HugeWebDesign01Icon)
  },
  {
    slug: "seo",
    title: "SEO Services",
    eyebrow: "Search visibility systems",
    description:
      "Technical SEO, content architecture, keyword strategy, internal linking, structured data, and ongoing optimization for sustainable organic growth.",
    keywords: "SEO services, technical SEO agency, organic growth strategy",
    icon: createHugeIcon(HugeSeoIcon)
  },
  {
    slug: "app-development",
    title: "App Development",
    eyebrow: "Product-ready apps",
    description:
      "Mobile and web app planning, MVP interfaces, product workflows, dashboards, and scalable front-end systems for modern businesses.",
    keywords: "app development agency, MVP development, web app development",
    icon: createHugeIcon(HugeMobileProgramming01Icon)
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    eyebrow: "Campaigns that convert",
    description:
      "Paid media strategy, landing page optimization, conversion tracking, funnel design, and campaign reporting tied to business outcomes.",
    keywords: "digital marketing agency, paid media strategy, conversion campaigns",
    icon: createHugeIcon(HugeMarketingIcon)
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    eyebrow: "Clear user journeys",
    description:
      "Premium interface systems, conversion-focused layouts, research-informed flows, and responsive design built for trust and usability.",
    keywords: "UI UX design agency, product design, conversion design",
    icon: createHugeIcon(HugeSparklesIcon)
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    eyebrow: "Smarter operations",
    description:
      "AI-assisted workflows, lead routing, internal dashboards, content systems, and automation plans that remove repetitive work.",
    keywords: "AI automation agency, business automation, workflow automation",
    icon: createHugeIcon(HugeAiBrain03Icon)
  }
];

const caseStudies = [
  {
    slug: "alpha-movers",
    title: "Alpha Movers",
    industry: "Relocation",
    result: "42% more qualified enquiries",
    summary:
      "A search-ready website structure, local SEO improvements, and conversion-focused service pages helped Alpha Movers turn more visitors into relocation leads.",
    services: ["Web Development", "SEO Services", "Conversion Design"]
  },
  {
    slug: "beta-relocation",
    title: "Beta Relocation",
    industry: "Moving Services",
    result: "31% lower cost per lead",
    summary:
      "A cleaner acquisition funnel, better landing page hierarchy, and improved campaign tracking gave Beta Relocation a clearer route from click to booked consultation.",
    services: ["Digital Marketing", "UI/UX Design", "Analytics"]
  }
];

const blogPosts = [
  {
    slug: "technical-seo-foundation-for-agency-websites",
    title: "Technical SEO Foundation For Agency Websites",
    category: "SEO",
    description:
      "A practical guide to crawlability, metadata, structured data, internal links, and Core Web Vitals for service businesses."
  },
  {
    slug: "web-development-playbook-for-growing-brands",
    title: "Web Development Playbook For Growing Brands",
    category: "Web Development",
    description:
      "How to plan a high-performing website structure that supports design, content, SEO, and conversion from day one."
  },
  {
    slug: "ai-automation-opportunities-for-service-businesses",
    title: "AI Automation Opportunities For Service Businesses",
    category: "AI Automation",
    description:
      "Where automation creates measurable value across lead response, reporting, content workflows, and internal operations."
  },
  {
    slug: "conversion-focused-ui-ux-design-checklist",
    title: "Conversion-Focused UI/UX Design Checklist",
    category: "UI/UX Design",
    description:
      "A design checklist for clearer navigation, stronger calls to action, accessible content, and more confident user decisions."
  },
  {
    slug: "digital-marketing-measurement-plan",
    title: "Digital Marketing Measurement Plan",
    category: "Digital Marketing",
    description:
      "A simple measurement framework for campaigns, landing pages, attribution, and monthly performance reporting."
  }
];

const companyPages = [
  { path: "/about/", title: "About", description: "Learn how Jadeed Solutions builds digital systems for strategy, design, development, SEO, and automation." },
  { path: "/pricing/", title: "Pricing", description: "Explore practical website, SEO, marketing, and automation packages for growing businesses." },
  { path: "/contact/", title: "Contact", description: "Start a project with Jadeed Solutions and tell us what you want your website or growth system to achieve." },
  { path: "/faq/", title: "FAQ", description: "Answers about services, timelines, SEO process, website builds, reporting, and support." }
];

const serviceLinks = services.map((service) => ({
  label: service.title,
  to: `/services/${service.slug}/`
}));

const mainNav = [
  { label: "Services", to: "/services/", children: serviceLinks },
  { label: "Work", to: "/portfolio/", children: caseStudies.map((item) => ({ label: item.title, to: `/portfolio/${item.slug}/` })) },
  { label: "Insights", to: "/blog/", children: blogPosts.slice(0, 4).map((item) => ({ label: item.title, to: `/blog/${item.slug}/` })) },
  { label: "Pricing", to: "/pricing/" },
  { label: "About", to: "/about/" }
];

function absoluteUrl(pathname) {
  return `${siteUrl}${pathname === "/" ? "/" : pathname}`;
}

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function injectJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function getRouteMeta(pathname) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (normalized === "/") {
    return {
      title: "Jadeed Solutions | Web Development, SEO & Digital Growth Agency",
      description:
        "Jadeed Solutions builds high-performing websites, SEO systems, digital marketing campaigns, UI/UX design, and AI automation for scalable growth.",
      keywords: "Jadeed Solutions, web development agency, SEO services, digital marketing agency, UI UX design, AI automation"
    };
  }

  const service = services.find((item) => normalized === `/services/${item.slug}/`);
  if (service) {
    return {
      title: `${service.title} Services | Jadeed Solutions`,
      description: service.description,
      keywords: service.keywords
    };
  }

  const caseStudy = caseStudies.find((item) => normalized === `/portfolio/${item.slug}/`);
  if (caseStudy) {
    return {
      title: `${caseStudy.title} Case Study | ${caseStudy.result} | Jadeed Solutions`,
      description: `${caseStudy.summary} Read the ${caseStudy.title} case study from Jadeed Solutions.`,
      keywords: `${caseStudy.title} case study, ${caseStudy.industry} digital marketing, Jadeed Solutions portfolio`
    };
  }

  const post = blogPosts.find((item) => normalized === `/blog/${item.slug}/`);
  if (post) {
    return {
      title: `${post.title} | Jadeed Solutions Blog`,
      description: post.description,
      keywords: `${post.category}, Jadeed Solutions blog, digital growth guide`
    };
  }

  const company = companyPages.find((item) => normalized === item.path);
  if (company) {
    return {
      title: `${company.title} | Jadeed Solutions`,
      description: company.description,
      keywords: `${company.title}, Jadeed Solutions, digital agency`
    };
  }

  if (normalized === "/services/") {
    return {
      title: "Services | Jadeed Solutions",
      description: "Explore Jadeed Solutions services across web development, SEO, app development, digital marketing, UI/UX design, and AI automation.",
      keywords: "Jadeed Solutions services, web development, SEO, digital marketing"
    };
  }

  if (normalized === "/portfolio/") {
    return {
      title: "Portfolio & Case Studies | Jadeed Solutions",
      description: "View Jadeed Solutions case studies and digital growth work across websites, SEO, marketing, and conversion systems.",
      keywords: "Jadeed Solutions portfolio, case studies, web design results"
    };
  }

  if (normalized === "/blog/") {
    return {
      title: "Blog | Jadeed Solutions",
      description: "Read guides on SEO, web development, digital marketing, UI/UX design, AI automation, and business growth.",
      keywords: "Jadeed Solutions blog, SEO guides, web development insights"
    };
  }

  return {
    title: "Page Not Found | Jadeed Solutions",
    description: "The page you are looking for could not be found.",
    keywords: "Jadeed Solutions"
  };
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    const normalized = location.pathname.endsWith("/") ? location.pathname : `${location.pathname}/`;
    const canonical = absoluteUrl(normalized);

    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("keywords", meta.keywords);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("author", "Jadeed Solutions");
    setMeta("theme-color", "#FAF9F7");
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Jadeed Solutions", true);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", canonical, true);
    setMeta("og:image", `${siteUrl}${faviconPath}`, true);
    setMeta("og:image:alt", "Jadeed Solutions brand mark", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", `${siteUrl}${faviconPath}`);
    setLink("canonical", canonical);

    const crumbs = normalized
      .split("/")
      .filter(Boolean)
      .map((part, index, parts) => ({
        "@type": "ListItem",
        position: index + 2,
        name: part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        item: absoluteUrl(`/${parts.slice(0, index + 1).join("/")}/`)
      }));

    injectJsonLd("jadeed-page-schema", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Jadeed Solutions",
          url: `${siteUrl}/`,
          logo: `${siteUrl}${faviconPath}`,
          description:
            "Jadeed Solutions is a global digital agency for web development, SEO, digital marketing, UI/UX design, and AI automation."
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: "Jadeed Solutions",
          publisher: { "@id": `${siteUrl}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${siteUrl}/`
            },
            ...crumbs
          ]
        }
      ]
    });
  }, [location.pathname]);

  return null;
}

function LogoMark() {
  return (
    <Link className="brand" to="/" aria-label="Jadeed Solutions home">
      <span className="brand-mark" aria-hidden="true">
        <img src={faviconPath} alt="" loading="eager" />
      </span>
      <span className="brand-name">Jadeed Solutions</span>
    </Link>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <header className="site-header" onMouseLeave={() => setMenuOpen(false)}>
      <nav className="nav-shell" aria-label="Main navigation">
        <LogoMark />

        <a className="mobile-header-cta" href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>

        <button
          className="mobile-menu-button icon-button"
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <div className={`nav-content ${mobileOpen ? "is-open" : ""}`}>
          <div className="nav-links">
            {mainNav.map((item) => (
              <NavLink
                className="nav-link"
                to={item.to}
                key={item.label}
                onMouseEnter={() => setMenuOpen(Boolean(item.children))}
                onFocus={() => setMenuOpen(Boolean(item.children))}
              >
                <span>{item.label}</span>
                {item.children ? <ChevronDown size={18} strokeWidth={2.1} /> : null}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <WhatsAppButton className="cta-button whatsapp-cta">Chat on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </nav>

      <div
        className={`mega-menu ${menuOpen ? "is-open" : ""}`}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div className="mega-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link className="mega-link" to={`/services/${service.slug}/`} key={service.slug}>
                <span className="mega-icon">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.description}</small>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <LogoMark />
          <p>
            Jadeed Solutions builds search-ready websites, conversion systems, campaign infrastructure, and automation
            workflows for businesses that want durable digital growth.
          </p>
        </div>
        <FooterGroup title="Services" links={serviceLinks} />
        <FooterGroup
          title="Industries"
          links={[
            { label: "Law Firms", to: "/contact/" },
            { label: "Medical Clinics", to: "/contact/" },
            { label: "Moving Companies", to: "/portfolio/" },
            { label: "Cleaning Services", to: "/portfolio/" },
            { label: "Real Estate", to: "/contact/" }
          ]}
        />
        <FooterGroup
          title="Resources"
          links={[
            { label: "Blog", to: "/blog/" },
            { label: "Portfolio", to: "/portfolio/" },
            { label: "SEO Guide", to: "/blog/technical-seo-foundation-for-agency-websites/" },
            { label: "Web Playbook", to: "/blog/web-development-playbook-for-growing-brands/" },
            { label: "Automation Guide", to: "/blog/ai-automation-opportunities-for-service-businesses/" }
          ]}
        />
        <FooterGroup
          title="Company"
          links={[
            { label: "About", to: "/about/" },
            { label: "Pricing", to: "/pricing/" },
            { label: "FAQ", to: "/faq/" },
            { label: "Contact", to: "/contact/" }
          ]}
        />
      </div>
      <p className="footer-bottom">Copyright 2026 Jadeed Solutions. Built for global digital growth.</p>
    </footer>
  );
}

function FooterGroup({ title, links }) {
  return (
    <div className="footer-group">
      <h2>{title}</h2>
      {links.map((link) => (
        <Link to={link.to} key={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="page">
      <SeoManager />
      <Header />
      {children}
      {location.pathname === "/" ? null : <Footer />}
    </div>
  );
}

function SectionHeader({ title, children }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function PillLink({ to, children }) {
  return (
    <Link className="pill-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}

function VisualBlock({ label, variant = "blue" }) {
  return (
    <figure className={`visual-block visual-${variant}`}>
      <img src={faviconPath} alt={`${label} visual for Jadeed Solutions`} loading="lazy" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function HomePage() {
  const systemLayers = [
    {
      title: "Website",
      copy: "Clear service pages that explain the offer, build trust, and turn visitors into enquiries.",
      icon: HugeWebDesign01Icon
    },
    {
      title: "Search",
      copy: "SEO structure so local customers can find you when they are ready to book.",
      icon: HugeSeoIcon
    },
    {
      title: "Campaigns",
      copy: "Landing paths and tracking that make paid traffic measurable and profitable.",
      icon: HugeMarketingIcon
    },
    {
      title: "Follow-up",
      copy: "WhatsApp-ready routing, reminders, and workflows so leads do not go cold.",
      icon: HugeWorkflowCircle03Icon
    }
  ];

  const industries = [
    "Movers",
    "Clinics",
    "Law firms",
    "Cleaning",
    "Trades",
    "Real estate",
    "Salons",
    "Home services"
  ];

  const steps = [
    ["01", "Audit", "We review your offer, search demand, website gaps, and where enquiries are lost."],
    ["02", "Build", "We design and ship the site, SEO structure, and conversion paths as one system."],
    ["03", "Connect", "We connect tracking, WhatsApp follow-up, and reporting around real bookings."],
    ["04", "Grow", "We improve pages, content, and campaigns using what the data shows each month."]
  ];

  const proofs = [
    {
      name: "Alpha Movers",
      industry: "Moving",
      metric: "42% more qualified enquiries",
      copy: "Search-ready service pages and clearer CTAs improved enquiry quality."
    },
    {
      name: "Beta Relocation",
      industry: "Relocation",
      metric: "31% lower cost per lead",
      copy: "Tighter landing hierarchy and tracking made campaign spend clearer."
    },
    {
      name: "Local Clinic Group",
      industry: "Healthcare",
      metric: "Faster WhatsApp response",
      copy: "Enquiry routing and follow-up reduced missed appointment requests."
    }
  ];

  const plans = [
    {
      name: "Launch",
      price: "From $2,500",
      detail: "For local service brands that need a conversion-ready website foundation.",
      items: ["Service-led website", "On-page SEO setup", "WhatsApp enquiry path", "Launch analytics"]
    },
    {
      name: "Growth",
      price: "From $4,800",
      detail: "For teams ready to turn the website into a full local acquisition system.",
      items: ["Everything in Launch", "Local SEO expansion", "Campaign landing paths", "Monthly improvement loop"],
      featured: true
    },
    {
      name: "Scale",
      price: "From $8,500",
      detail: "For multi-location or high-volume operators that need systemized growth.",
      items: ["Everything in Growth", "Automation workflows", "Reporting dashboard", "Priority support"]
    },
    {
      name: "Custom",
      price: "Global quote",
      detail: "For complex stacks, multi-brand setups, or advanced automation needs.",
      items: ["Scoped discovery", "Custom architecture", "Integrations", "Dedicated roadmap"]
    }
  ];

  const faqs = [
    [
      "Do you only work with local service businesses?",
      "Yes. Movers, clinics, law firms, cleaning companies, trades, and similar service brands are our focus — worldwide."
    ],
    [
      "Is this a website project or a full growth system?",
      "A full growth system. Website, search, campaigns, and WhatsApp follow-up are planned together — not as separate one-off tasks."
    ],
    [
      "Can we start on WhatsApp?",
      "Yes. WhatsApp is the fastest way to share your business type, goals, and current site so we can recommend the right plan."
    ],
    [
      "Are prices global?",
      "Yes. Packages are structured for global clients. Final scope depends on pages, locations, content depth, and integrations."
    ],
    [
      "How fast can we launch?",
      "A focused Launch build can start quickly. Growth and Scale timelines depend on content, locations, and automation needs."
    ]
  ];

  return (
    <main className="lp">
      <section className="lp-hero">
        <div className="lp-hero-copy">
          <p className="lp-brand">Jadeed Solutions</p>
          <h1>The growth system for local service businesses.</h1>
          <p className="lp-hero-support">
            Websites, search, campaigns, and WhatsApp follow-up — built as one system that turns demand into booked jobs.
          </p>
          <div className="lp-hero-actions">
            <WhatsAppButton className="cta-button whatsapp-cta">Chat on WhatsApp</WhatsAppButton>
            <a className="secondary-button" href="#system">
              See the system
            </a>
          </div>
        </div>

        <div className="lp-hero-media" aria-label="Product visual placeholder">
          <div className="lp-media-frame">
            <span className="lp-media-label">IMAGE / VIDEO PLACEHOLDER</span>
            <strong>Local service growth dashboard</strong>
            <small>Replace with real product UI, site screenshots, or short demo video.</small>
          </div>
        </div>
      </section>

      <section className="lp-section lp-industries" aria-label="Industries we serve">
        <p className="lp-kicker">Built for local service brands worldwide</p>
        <div className="lp-industry-row">
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </section>

      <section className="lp-section" id="system">
        <div className="lp-section-head">
          <h2>One system. Not scattered tools.</h2>
          <p>
            Most local service businesses already have pieces — a site, some ads, a WhatsApp number. We connect them so
            every click has a clear path to a booked job.
          </p>
        </div>
        <div className="lp-system-grid">
          {systemLayers.map((layer, index) => (
            <article className="lp-system-item" key={layer.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <HugeIcon icon={layer.icon} size={28} />
              <h3>{layer.title}</h3>
              <p>{layer.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section lp-split-section">
        <div className="lp-section-head left">
          <h2>From first search to booked job.</h2>
          <p>
            We do not sell isolated pages or random campaigns. We install a growth operating system around how local
            customers actually buy.
          </p>
        </div>
        <ul className="lp-check-list">
          {[
            "Service pages that answer buyer questions fast",
            "Local SEO structure for findability",
            "Campaign paths with clear conversion tracking",
            "WhatsApp follow-up that protects every lead",
            "Reporting owners can understand without jargon"
          ].map((item) => (
            <li key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="lp-section">
        <div className="lp-section-head">
          <h2>How it works</h2>
          <p>A simple path from audit to ongoing growth — built for operators, not tech teams.</p>
        </div>
        <div className="lp-steps">
          {steps.map(([num, title, copy]) => (
            <article key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-section-head">
          <h2>Proof that converts</h2>
          <p>Real-result frames ready for final screenshots, metrics graphics, and client quotes.</p>
        </div>
        <div className="lp-proof-grid">
          {proofs.map((item) => (
            <article key={item.name}>
              <div className="lp-proof-media" aria-hidden="true">
                <span>CASE STUDY MEDIA PLACEHOLDER</span>
              </div>
              <small>{item.industry}</small>
              <h3>{item.name}</h3>
              <strong>{item.metric}</strong>
              <p>{item.copy}</p>
              <Link to="/portfolio/">
                View work <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section" id="pricing">
        <div className="lp-section-head">
          <h2>Global pricing for every stage</h2>
          <p>Clear packages for launch, growth, and scale. WhatsApp us and we will map the right fit.</p>
        </div>
        <div className="lp-pricing-grid">
          {plans.map((plan) => (
            <article className={`lp-plan${plan.featured ? " is-featured" : ""}`} key={plan.name}>
              <p className="lp-plan-name">{plan.name}</p>
              <h3>{plan.price}</h3>
              <p>{plan.detail}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    {item}
                  </li>
                ))}
              </ul>
              <WhatsAppButton className="cta-button whatsapp-cta lp-plan-cta">
                Get this plan
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-section-head">
          <h2>Questions before you start</h2>
        </div>
        <div className="lp-faq">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="lp-final-cta">
        <p className="lp-brand">Jadeed Solutions</p>
        <h2>Ready to install your growth system?</h2>
        <p>Tell us your business type and goal on WhatsApp. We will reply with the clearest next step.</p>
        <div className="lp-hero-actions">
          <WhatsAppButton className="cta-button whatsapp-cta">Start on WhatsApp</WhatsAppButton>
          <Link className="secondary-button" to="/portfolio/">
            See case studies
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FaqPreview() {
  const faqs = [
    ["Do you build full websites or landing pages?", "Both. For SEO-focused growth, we recommend a full site structure with service, portfolio, blog, and company pages from the start."],
    ["Can you handle SEO during development?", "Yes. Metadata, heading hierarchy, schema, internal links, sitemap planning, and performance checks are built into the process."],
    ["Do you support ongoing content?", "Yes. We can expand blog categories, case studies, pillar guides, and service pages based on keyword and competitor research."],
    ["What happens after launch?", "We track performance, improve content, monitor technical health, and plan monthly growth work around search and conversion data."]
  ];

  return (
    <section className="content-section">
      <SectionHeader eyebrow="FAQ" title="Common Questions Before Starting" />
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ServicesHub() {
  return (
    <StandardPage
      eyebrow="Services"
      title="Digital Services Built Around One Growth System"
      intro="Jadeed Solutions combines strategy, design, development, SEO, marketing, and automation so every page, campaign, and workflow supports measurable business growth."
    >
      <div className="service-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.slug}>
              <Icon size={28} />
              <p className="card-eyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <PillLink to={`/services/${service.slug}/`}>Open Service</PillLink>
            </article>
          );
        })}
      </div>
    </StandardPage>
  );
}

function ServicePage({ service }) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <StandardPage eyebrow={service.eyebrow} title={`${service.title} For Scalable Digital Growth`} intro={service.description}>
      <ArticleBody
        title={`How ${service.title} Works At Jadeed Solutions`}
        paragraphs={[
          `${service.title} is planned as part of a broader growth architecture. Before we design screens or build components, we clarify the business model, user intent, search demand, competitor gaps, page hierarchy, and conversion path. That planning keeps the work focused on outcomes instead of isolated deliverables.`,
          `The implementation phase combines technical execution with content clarity. We create page sections that answer buyer questions, reduce friction, support internal links, and give search engines a clean understanding of the service. Every page needs a clear H1, useful H2s, readable paragraphs, descriptive media, and a call to action that matches the visitor's stage of awareness.`,
          `For long-term performance, we connect the page to analytics, reporting, and ongoing improvement. That means measuring engagement, reviewing search queries, strengthening internal links, improving speed, and expanding supporting content when new opportunities appear. The result is a service asset that can improve over time instead of becoming static after launch.`
        ]}
      />
      <LinkRail links={[{ label: "View Pricing", to: "/pricing/" }, { label: "See Portfolio", to: "/portfolio/" }, { label: "Contact Us", to: "/contact/" }, ...related.map((item) => ({ label: item.title, to: `/services/${item.slug}/` }))]} />
    </StandardPage>
  );
}

function PortfolioHub() {
  return (
    <StandardPage
      eyebrow="Portfolio"
      title="Case Studies With Strategy, Implementation, And Results"
      intro="Our portfolio structure is built to show the challenge, approach, implementation phases, measurable outcomes, service mix, and next-step recommendations."
    >
      <div className="case-grid">
        {caseStudies.map((study) => (
          <article className="case-card" key={study.slug}>
            <p className="card-eyebrow">{study.industry}</p>
            <h3>{study.title}</h3>
            <strong>{study.result}</strong>
            <p>{study.summary}</p>
            <PillLink to={`/portfolio/${study.slug}/`}>Read Case Study</PillLink>
          </article>
        ))}
      </div>
    </StandardPage>
  );
}

function CaseStudyPage({ study }) {
  return (
    <StandardPage eyebrow={`${study.industry} case study`} title={`${study.title}: ${study.result}`} intro={study.summary}>
      <ArticleBody
        title="Executive Summary"
        paragraphs={[
          `${study.title} needed a clearer path from visitor intent to qualified enquiry. The project focused on improving service clarity, strengthening search signals, and removing friction from the lead journey.`,
          `Jadeed Solutions approached the work through discovery, page hierarchy, content prioritization, technical cleanup, and conversion tracking. The strategy connected ${study.services.join(", ")} into a single measurable system.`,
          `The result was a more useful digital presence with better content structure, stronger service signals, cleaner calls to action, and a reporting setup that made future improvements easier to plan.`
        ]}
      />
      <div className="metric-grid">
        {["Traffic Quality", "Lead Clarity", "Conversion Path"].map((metric) => (
          <article className="metric-card" key={metric}>
            <span>{metric}</span>
            <strong>{study.result}</strong>
          </article>
        ))}
      </div>
      <LinkRail links={[{ label: "Web Development", to: "/services/web-development/" }, { label: "SEO Services", to: "/services/seo/" }, { label: "Pricing", to: "/pricing/" }, { label: "Contact", to: "/contact/" }]} />
    </StandardPage>
  );
}

function BlogHub() {
  return (
    <StandardPage
      eyebrow="Blog"
      title="SEO, Web Development, Marketing, Design, And Automation Guides"
      intro="The Jadeed Solutions blog is structured for long-term topical authority, with practical guides, tutorials, category hubs, case-study deep dives, and thought leadership."
    >
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <p className="card-eyebrow">{post.category}</p>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <PillLink to={`/blog/${post.slug}/`}>Read Post</PillLink>
          </article>
        ))}
      </div>
    </StandardPage>
  );
}

function BlogPostPage({ post }) {
  return (
    <StandardPage eyebrow={post.category} title={post.title} intro={post.description}>
      <ArticleBody
        title="Implementation Guide"
        paragraphs={[
          `This guide gives teams a practical way to improve ${post.category.toLowerCase()} without separating strategy from execution. The best results come when content, design, technical decisions, and measurement are planned together.`,
          `Start by defining the business goal, the audience intent, the primary page or campaign, and the supporting pages that should link into it. This prevents random content production and gives every page a reason to exist.`,
          `Next, document metadata, headings, internal links, image requirements, schema opportunities, performance risks, and conversion events. A checklist-driven process makes publishing faster while protecting quality.`,
          `Finally, review results monthly. Look at search queries, engagement, conversion rate, page speed, and content gaps. Then update existing assets before creating new ones, because refreshed pages often compound faster than disconnected new posts.`
        ]}
      />
      <LinkRail links={[{ label: "SEO Services", to: "/services/seo/" }, { label: "Web Development", to: "/services/web-development/" }, { label: "Contact Jadeed", to: "/contact/" }, { label: "Blog Home", to: "/blog/" }]} />
    </StandardPage>
  );
}

function CompanyPage({ page }) {
  const map = {
    About:
      "Jadeed Solutions is a global digital agency built around clarity, technical discipline, and measurable growth. We help businesses turn their website into a practical acquisition system by combining strategy, design, development, SEO, marketing, and automation.",
    Pricing:
      "Pricing depends on scope, content depth, page count, technical requirements, integrations, and ongoing support. Our packages are designed to make investment decisions easier while leaving room for custom strategy.",
    Contact:
      "Tell us what you want to improve: search visibility, website performance, lead quality, campaign tracking, customer experience, or internal operations. We will use that context to recommend the clearest next step.",
    FAQ:
      "This page answers common questions about Jadeed Solutions services, process, timelines, SEO foundations, website builds, reporting, and long-term support."
  };

  return (
    <StandardPage eyebrow="Company" title={`${page.title} Jadeed Solutions`} intro={map[page.title]}>
      {page.title === "Pricing" ? (
        <section className="lp-section" style={{ marginTop: 0 }}>
          <div className="lp-pricing-grid">
            {[
              ["Launch", "From $2,500", "Conversion-ready website foundation for local service brands."],
              ["Growth", "From $4,800", "Website, local SEO, campaign paths, and monthly improvement."],
              ["Scale", "From $8,500", "Multi-location systems, automation, and priority support."],
              ["Custom", "Global quote", "Scoped architecture for complex or multi-brand operations."]
            ].map(([name, price, detail]) => (
              <article className="lp-plan" key={name}>
                <p className="lp-plan-name">{name}</p>
                <h3>{price}</h3>
                <p>{detail}</p>
                <WhatsAppButton className="cta-button whatsapp-cta lp-plan-cta">Discuss on WhatsApp</WhatsAppButton>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      {page.title === "FAQ" ? <FaqPreview /> : null}
      {page.title === "Contact" ? <ContactForm /> : null}
      {page.title === "About" ? (
        <ArticleBody
          title="A Digital Agency Built For Structured Growth"
          paragraphs={[
            "We believe the strongest websites are planned like systems, not brochures. That means search architecture, content depth, user experience, performance, and conversion paths are considered together.",
            "Our work is especially useful for businesses that have outgrown basic templates and need a clearer foundation for service pages, case studies, blog growth, reporting, and automation.",
            "Jadeed Solutions is designed to support global clients with practical execution, transparent thinking, and a website structure that can expand over time."
          ]}
        />
      ) : null}
      <LinkRail links={[{ label: "Services", to: "/services/" }, { label: "Portfolio", to: "/portfolio/" }, { label: "Blog", to: "/blog/" }, { label: "Contact", to: "/contact/" }]} />
    </StandardPage>
  );
}

function ContactForm() {
  return (
    <form className="contact-form" aria-label="Project enquiry form">
      <label>
        Name
        <input name="name" type="text" placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" />
      </label>
      <label>
        Project Goal
        <textarea name="message" rows="5" placeholder="Tell us what you want to build or improve" />
      </label>
      <button className="cta-button" type="button">Send Enquiry</button>
    </form>
  );
}

function StandardPage({ eyebrow, title, intro, children }) {
  return (
    <main>
      <section className="subpage-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      {children}
    </main>
  );
}

function ArticleBody({ title, paragraphs }) {
  return (
    <section className="article-body">
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

function LinkRail({ links }) {
  return (
    <nav className="link-rail" aria-label="Related internal links">
      {links.map((link) => (
        <PillLink to={link.to} key={link.to}>{link.label}</PillLink>
      ))}
    </nav>
  );
}

function NotFoundPage() {
  return (
    <StandardPage
      eyebrow="404"
      title="Page Not Found"
      intro="This route is not available yet. Use the navigation to return to a real section of the Jadeed Solutions website."
    >
      <LinkRail links={[{ label: "Home", to: "/" }, { label: "Services", to: "/services/" }, { label: "Contact", to: "/contact/" }]} />
    </StandardPage>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/" element={<ServicesHub />} />
        {services.map((service) => (
          <Route path={`/services/${service.slug}/`} element={<ServicePage service={service} />} key={service.slug} />
        ))}
        <Route path="/portfolio/" element={<PortfolioHub />} />
        {caseStudies.map((study) => (
          <Route path={`/portfolio/${study.slug}/`} element={<CaseStudyPage study={study} />} key={study.slug} />
        ))}
        <Route path="/blog/" element={<BlogHub />} />
        {blogPosts.map((post) => (
          <Route path={`/blog/${post.slug}/`} element={<BlogPostPage post={post} />} key={post.slug} />
        ))}
        {companyPages.map((page) => (
          <Route path={page.path} element={<CompanyPage page={page} />} key={page.path} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export const allRoutes = [
  "/",
  "/services/",
  ...services.map((service) => `/services/${service.slug}/`),
  "/portfolio/",
  ...caseStudies.map((study) => `/portfolio/${study.slug}/`),
  "/blog/",
  ...blogPosts.map((post) => `/blog/${post.slug}/`),
  ...companyPages.map((page) => page.path)
];

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}



