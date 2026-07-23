import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "./icons";
import { type Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl bg-brand-500 p-7 text-white transition-opacity duration-200 hover:opacity-95"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md">
        <HugeiconsIcon icon={service.icon} size={24} />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/85">
        {service.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        Learn more
        <HugeiconsIcon
          icon={ArrowRightIcon}
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
