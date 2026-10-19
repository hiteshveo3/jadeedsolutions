import {
  HugeiconsIcon,
  BookIcon,
  CodeIcon,
  MegaphoneIcon,
  SmartphoneIcon,
  TrendingUpIcon,
  type IconSvgElement,
} from "@/components/icons";

const categoryIcons: Record<string, IconSvgElement> = {
  SEO: TrendingUpIcon,
  "Local SEO": TrendingUpIcon,
  "Web Development": CodeIcon,
  "App Development": SmartphoneIcon,
  "Digital Advertising": MegaphoneIcon,
  "Development & SEO": CodeIcon,
};

/** Branded stand-in for article imagery: category icon, name and reading time on the brand green. */
export function CategoryTile({ category, readingTime, large = false, fill = false }: { category: string; readingTime: string; large?: boolean; fill?: boolean }) {
  const icon = categoryIcons[category] ?? BookIcon;
  return (
    <div className={`flex flex-col justify-between overflow-hidden bg-transparent p-5 text-white ${fill ? "absolute inset-0" : `relative rounded-2xl ${large ? "min-h-[240px] sm:p-7 lg:min-h-[340px]" : "h-[150px]"}`}`} aria-hidden="true">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#BEF70A]/15" />
      <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-white/[0.06]" />
      <span className={`relative flex items-center justify-center rounded-xl bg-[#BEF70A] text-[#0B1F12] ${large ? "h-14 w-14" : "h-11 w-11"}`}>
        <HugeiconsIcon icon={icon} size={large ? 28 : 22} />
      </span>
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#BEF70A]">{category}</p>
        <p className="mt-1 text-sm text-white/70">{readingTime}</p>
      </div>
    </div>
  );
}
