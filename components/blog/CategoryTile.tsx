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
export function CategoryTile({ category, readingTime, large = false }: { category: string; readingTime: string; large?: boolean }) {
  const icon = categoryIcons[category] ?? BookIcon;
  return (
    <div className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#015f45] p-5 text-white ${large ? "min-h-[240px] sm:p-7 lg:min-h-[340px]" : "h-[150px]"}`} aria-hidden="true">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#cbd810]/15" />
      <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-white/[0.06]" />
      <span className={`relative flex items-center justify-center rounded-xl bg-[#cbd810] text-[#063d30] ${large ? "h-14 w-14" : "h-11 w-11"}`}>
        <HugeiconsIcon icon={icon} size={large ? 28 : 22} />
      </span>
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#eaf25a]">{category}</p>
        <p className="mt-1 text-sm text-white/70">{readingTime}</p>
      </div>
    </div>
  );
}
