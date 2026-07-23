import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="section bg-hero-glow">
      <div className="container flex min-h-[50vh] flex-col items-center justify-center text-center">
        <span className="font-display text-7xl font-semibold text-gradient">404</span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. It may
          have been moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Contact us
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
