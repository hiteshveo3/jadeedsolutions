# Jadeed Solutions — Digital Marketing Website

A modern, fast, SEO-optimized website for a full-service digital marketing agency, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

It showcases four core services — **SEO**, **Web Development**, **App Development**, and **Digital Advertising (Google Ads & paid social)** — with a blog, portfolio/case studies, and a working contact/lead form.

## Features

- Responsive, animated marketing pages (Home, Services, Portfolio, About, Blog, Contact)
- Dynamic per-service detail pages driven by a single data file
- Blog with listing + article pages (easily editable content)
- Working contact form with client + server-side validation and optional email delivery
- SEO built in: per-page metadata, Open Graph, JSON-LD structured data, `sitemap.xml`, `robots.txt`
- Smooth animations with Framer Motion and icons from Lucide

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lucide React](https://lucide.dev/) — icons
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — forms & validation
- [Nodemailer](https://nodemailer.com/) — optional contact email delivery

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment (optional)

Copy the example env file and fill in values as needed:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL` — your public site URL (used for SEO metadata & sitemap).
- SMTP settings are **optional**. If they are not set, contact form submissions are logged to the server console so the form still works locally.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  layout.tsx            # Root layout: fonts, Navbar, Footer, JSON-LD
  page.tsx              # Home page
  services/             # Services overview + [slug] detail pages
  portfolio/            # Case studies
  about/                # About page
  blog/                 # Blog listing + [slug] article pages
  contact/              # Contact page
  api/contact/route.ts  # Contact form submission handler
  sitemap.ts            # Dynamic sitemap
  robots.ts             # robots.txt
components/             # Reusable UI components
lib/
  site.ts               # Business info, nav links, stats
  services.ts           # Service definitions (edit your services here)
  content.ts            # Testimonials, why-us, portfolio projects
  blog.ts               # Blog posts
```

## Customizing Content

Most content lives in the `lib/` folder as plain TypeScript data — no code changes needed:

- **Business info, contact details, nav** → `lib/site.ts`
- **Services** (titles, features, process, FAQs) → `lib/services.ts`
- **Testimonials, portfolio projects, "why us"** → `lib/content.ts`
- **Blog posts** → `lib/blog.ts`

Brand colors and fonts can be adjusted in `tailwind.config.ts`.

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/) with zero config. Push to a Git repo, import into Vercel, set your environment variables, and deploy.
