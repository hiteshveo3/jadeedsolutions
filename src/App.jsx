import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Code2,
  Globe2,
  LayoutGrid,
  Menu,
  MessageCircle,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Plus,
  X,
  Zap
} from "lucide-react";
import { StickyFeatureSection } from "./components/StickyFeatureSection";
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
  { label: "Studio", to: "/services/", children: serviceLinks },
  { label: "Solutions", to: "/portfolio/", children: caseStudies.map((item) => ({ label: item.title, to: `/portfolio/${item.slug}/` })) },
  { label: "Library", to: "/blog/", children: blogPosts.slice(0, 4).map((item) => ({ label: item.title, to: `/blog/${item.slug}/` })) },
  { label: "Plans", to: "/pricing/" },
  { label: "Company", to: "/about/" }
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

        <Link className="mobile-header-cta" to="/contact/">
          Start Project
        </Link>

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
            <button className="icon-button language-button" type="button" aria-label="Global agency">
              <Globe2 size={26} strokeWidth={1.8} />
            </button>
            <Link className="cta-button" to="/contact/">
              Start Project
            </Link>
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

function PromptComposer() {
  return (
    <div className="composer" aria-label="Project prompt composer">
      <p>Tell us about your website, SEO, marketing, or automation goals</p>
      <div className="composer-controls">
        <button className="composer-icon" type="button" aria-label="Add project details">
          <Plus size={30} strokeWidth={1.8} />
        </button>
        <label className="toggle-label">
          <input type="checkbox" aria-label="Plan before building" />
          <span className="toggle-track" aria-hidden="true" />
          <span>Plan</span>
        </label>
        <button className="composer-icon mic-button" type="button" aria-label="Use voice input">
          <Mic size={24} strokeWidth={1.9} />
        </button>
        <button className="send-button" type="button" aria-label="Send project prompt">
          <ArrowUp size={28} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  const businessTools = [
    ["Lead Capture", "Forms, chat prompts, landing pages, and tracking paths designed to turn interest into real enquiries.", HugeWorkflowCircle03Icon],
    ["CRM & Follow-Up", "Simple customer pipelines, automated reminders, and handoff points so no opportunity disappears after first contact.", HugeDashboardBrowsingIcon],
    ["Automation Flows", "Repeat tasks like routing, reporting, content support, booking updates, and internal notifications can run with less manual effort.", HugeAiBrain03Icon],
    ["Reporting View", "Dashboards and analytics connect website, SEO, campaign, and enquiry data into decisions owners can understand.", HugeChart01Icon]
  ];

  const foundations = [
    ["Fast Pages", "Responsive layouts, clean assets, and performance-aware builds."],
    ["Search Structure", "Metadata, headings, schema, sitemap, and internal links planned early."],
    ["Mobile Clarity", "Touch-friendly navigation, readable sections, and clear CTAs."],
    ["Secure Launch", "Hosting direction, tracking setup, backups, and maintenance planning."]
  ];

  const industries = [
    "Law Firms",
    "Accounting",
    "Medical Clinics",
    "Construction",
    "Real Estate",
    "Moving",
    "Cleaning",
    "Education",
    "Restaurants",
    "Beauty"
  ];

  const proofPoints = [
    ["Strategy First", "Every project starts with offer, audience, search intent, and conversion path before design begins."],
    ["Built To Expand", "Service pages, case studies, blog clusters, automation, and reporting can grow from the same foundation."],
    ["Owner Friendly", "We explain systems in business language, so non-technical teams understand what is being built and why."]
  ];

  return (
    <main>
      <section className="hero legacy-hero">
        <div className="hero-copy">
          <h1>Build A Digital Growth Engine</h1>
          <p className="hero-subtitle">
            Jadeed Solutions creates fast websites, search-ready content structures, and conversion-focused digital experiences for ambitious brands.
          </p>
        </div>

        <PromptComposer />

        <div className="suggestions" aria-label="Prompt suggestions">
          {["SEO strategy", "Website redesign", "Automation plan"].map((chip) => (
            <button type="button" key={chip}>
              {chip}
            </button>
          ))}
        </div>
      </section>

      <StickyFeatureSection />

      <section className="home-section home-why reveal-section">
        <SectionHeader title="Why Partner With Jadeed Solutions">
          We connect design, development, SEO, marketing, and automation into one practical growth system. Your website,
          content, campaigns, analytics, and customer journey should work together instead of sitting in separate silos.
        </SectionHeader>
        <div className="home-card-grid three">
          {[
            ["Complete Ecosystem", "Your website, SEO structure, content plan, campaign tracking, and automation workflows are designed as one connected system.", HugeWorkflowCircle03Icon],
            ["Long-Term Growth Focus", "We build foundations that can expand through service pages, case studies, blog clusters, reporting, and optimization cycles.", HugeDashboardBrowsingIcon],
            ["Proven Results", "Every layout, page, and interaction is shaped around measurable outcomes: better visibility, clearer trust, and stronger enquiries.", HugeChart01Icon]
          ].map(([title, copy, icon]) => (
            <article className="home-card" key={title}>
              <HugeIcon icon={icon} size={30} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-system-section reveal-section">
        <div className="split-intro">
          <h2>Build The Business System Behind The Website</h2>
          <p>
            A modern site should do more than look polished. It should capture demand, explain your offer, route leads,
            support follow-up, and show what is working. We design the website and the operating layer around it.
          </p>
        </div>
        <div className="business-system-layout">
          <div className="system-panel" aria-label="Business system visual frame">
            <div className="system-window-top"><span></span><span></span><span></span></div>
            <div className="system-flow">
              {businessTools.map(([title, copy, icon]) => (
                <div className="system-node" key={title}>
                  <HugeIcon icon={icon} size={24} />
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="system-copy-list">
            {businessTools.map(([title, copy, icon]) => (
              <article key={title}>
                <HugeIcon icon={icon} size={26} />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section reveal-section">
        <SectionHeader title="Services We Deliver">
          These services can be used individually, but they work best when planned as one growth stack.
        </SectionHeader>
        <div className="home-card-grid three">
          {[
            ["SEO & Local Search Optimization", "Technical SEO, page structure, internal links, Google visibility, content planning, and local search improvements.", HugeSeoIcon],
            ["Website Development & Design", "Fast, responsive, conversion-focused websites with clean navigation, polished UI, and scalable page systems.", HugeWebDesign01Icon],
            ["Mobile App Development", "MVP planning, app interfaces, dashboards, workflows, and product experiences built for practical use.", HugeMobileProgramming01Icon],
            ["Google Business Profile Management", "Profile optimization, service positioning, review signals, posting strategy, and local trust-building.", HugeDashboardBrowsingIcon],
            ["AI Automation & Workflows", "Lead routing, reporting flows, content support, internal systems, and repetitive task automation.", HugeAiBrain03Icon],
            ["Digital Marketing & Growth Strategy", "Campaign planning, landing pages, conversion tracking, funnel improvement, and performance reporting.", HugeMarketingIcon]
          ].map(([title, copy, icon]) => (
            <article className="home-card service-home-card" key={title}>
              <HugeIcon icon={icon} size={30} />
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link to="/services/">Learn more <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section reveal-section">
        <SectionHeader title="Our Proven Process">
          A clear process keeps every decision tied to outcomes, from the first audit to launch and ongoing improvement.
        </SectionHeader>
        <div className="process-timeline">
          {[
            ["Discovery & Audit", "Week 1", "We review your current website, search visibility, analytics, competitors, offers, and conversion blockers."],
            ["Strategy & Architecture", "Week 1-2", "We map URL structure, service pages, keyword targets, content priorities, and internal linking paths."],
            ["Design & Messaging", "Week 2-3", "We design user journeys, page sections, CTAs, and trust signals around how customers make decisions."],
            ["Development & SEO Setup", "Week 3-5", "We build responsive pages, metadata, schema, sitemap, performance basics, and tracking foundations."],
            ["Launch & Improve", "Ongoing", "We monitor analytics, refine content, improve technical health, and expand based on search opportunities."]
          ].map(([title, time, copy], index) => (
            <article className="process-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><small>{time}</small><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section foundation-section reveal-section">
        <div className="split-intro">
          <h2>Launch On A Strong Foundation</h2>
          <p>
            Strong websites need speed, accessibility, security, and reliability because users need confidence after launch.
            For Jadeed, this becomes a launch foundation that makes the site easier to find, use, track, and improve.
          </p>
        </div>
        <div className="foundation-grid">
          {foundations.map(([title, copy]) => (
            <article key={title}>
              <CheckCircle2 size={22} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section industry-section reveal-section">
        <div className="split-intro">
          <h2>Built For Service-Based Businesses</h2>
          <p>
            The same growth system can be adapted for firms, clinics, trades, local service teams, and appointment-led
            businesses. The offer changes, but the job stays the same: explain clearly, capture demand, and follow up faster.
          </p>
        </div>
        <div className="industry-grid">
          {industries.map((industry) => (
            <Link to="/contact/" key={industry}>{industry}</Link>
          ))}
        </div>
      </section>

      <section className="home-section reveal-section">
        <SectionHeader title="Results That Speak For Themselves">
          Case-study frames are ready for final screenshots, graphs, or client assets in the next visual pass.
        </SectionHeader>
        <div className="home-card-grid three">
          {[
            ["Alpha Movers", "Moving", "20-25 confirmed bookings", "Search-ready service pages and local SEO improvements helped increase enquiry quality.", "bookings"],
            ["Beta Relocation", "Relocation", "31% lower cost per lead", "Cleaner landing pages and better tracking made campaign decisions easier.", "leads"],
            ["IHR Dream Cleaning", "Cleaning", "Higher local visibility", "Google Business Profile structure and service messaging improved trust signals.", "visibility"]
          ].map(([name, industry, metric, copy, variant]) => (
            <article className="result-card" key={name}>
              <div className={"case-visual case-visual-" + variant} aria-label={name + " case study visual frame"}>
                <div className="case-window-bar"><span></span><span></span><span></span></div>
                <div className="case-metric-card">
                  <small>{industry}</small>
                  <strong>{metric}</strong>
                  <div><span></span><span></span><span></span></div>
                </div>
              </div>
              <small>{industry}</small><h3>{name}</h3><strong>{metric}</strong><p>{copy}</p>
              <Link to="/portfolio/">View case study <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section proof-strip-section reveal-section">
        <div className="proof-strip">
          {proofPoints.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section support-section reveal-section">
        <SectionHeader title="Support After The Site Goes Live">
          A launch is not the finish line. We keep the system useful with reporting, improvements, content support, and technical care.
        </SectionHeader>
        <div className="support-grid">
          {[
            ["Monthly Improvements", "Review analytics, search queries, conversion paths, and technical health."],
            ["Content Expansion", "Add service pages, blog clusters, case studies, and supporting assets as demand grows."],
            ["Automation Care", "Refine workflows, lead routing, notifications, and reports as operations evolve."]
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section resource-section reveal-section">
        <div className="split-intro">
          <h2>Growth Resources For Better Decisions</h2>
          <p>
            Explore practical guides on SEO foundations, website planning, and automation opportunities before you start a project.
            These resources connect directly to the services we deliver.
          </p>
        </div>
        <div className="resource-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <article className="resource-card" key={post.slug}>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link to={"/blog/" + post.slug + "/"}>Read guide <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
        <div className="resource-links" aria-label="Related service links">
          <Link to="/services/seo/">SEO Services</Link>
          <Link to="/services/web-development/">Web Development</Link>
          <Link to="/services/ai-automation/">AI Automation</Link>
          <Link to="/blog/">All Resources</Link>
        </div>
      </section>

      <section className="home-section reveal-section">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="home-faq-list">
          {[
            ["Do you build full websites or only landing pages?", "We can build both, but for long-term SEO we recommend a complete site structure with services, portfolio, blog, contact, and FAQ pages."],
            ["Can you help with SEO from the beginning?", "Yes. We plan metadata, headings, internal links, schema, sitemap structure, page speed, and content architecture during the build."],
            ["Do you provide images, animation, or video?", "We can create frames and placements. If you provide brand photos, client screenshots, videos, or motion references, we can integrate them properly."],
            ["How long does a project take?", "A focused website can start in a few weeks. Larger SEO, content, and automation systems depend on page count, integrations, and content depth."],
            ["Can you manage Google Business Profile?", "Yes. We can optimize profile structure, services, descriptions, posts, and local trust signals."],
            ["What happens after launch?", "We can monitor analytics, improve content, fix technical issues, expand service pages, and create ongoing growth assets."]
          ].map(([question, answer]) => (<details key={question}><summary>{question}</summary><p>{answer}</p></details>))}
        </div>
      </section>

      <section className="home-final-cta reveal-section">
        <h2>Ready To Grow Your Business?</h2>
        <p>Book a free consultation and we will map the clearest next step for your website, SEO, automation, or digital growth system.</p>
        <div><Link className="cta-button" to="/contact/">Book Free Consultation</Link><Link className="secondary-button" to="/portfolio/">View Case Studies</Link></div>
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
      {page.title === "Pricing" ? <PricingPreview /> : null}
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



