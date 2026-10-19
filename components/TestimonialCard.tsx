import { HugeiconsIcon, QuoteIcon } from "./icons";
import { type Testimonial } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isPlaceholder =
    !testimonial.avatar || testimonial.avatar.includes("placeholder");
  const initials = testimonial.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <figure className="card flex h-full flex-col p-7">
      <HugeiconsIcon icon={QuoteIcon} size={32} className="text-brand-200" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/80">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-4">
        {isPlaceholder ? (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-sm font-semibold text-[#0B1F12] ring-2 ring-brand-100">
            {initials || "JS"}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-brand-100"
          />
        )}
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-white/62">{testimonial.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
