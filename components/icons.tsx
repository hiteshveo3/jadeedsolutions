import type { CSSProperties, ComponentType } from "react";
import {
  Add,
  ArrowDown2,
  ArrowLeft,
  ArrowRight,
  ArrowUp2,
  Book1,
  Briefcase,
  Calendar,
  Call,
  Category,
  Clock,
  Code,
  Copy,
  Danger,
  DocumentText,
  DocumentText1,
  Element3,
  Facebook,
  Flash,
  Gallery,
  Global,
  Heart,
  Home2,
  InfoCircle,
  Instagram,
  Layer,
  Link2,
  Location,
  MagicStar,
  Minus,
  Mobile,
  Monitor,
  People,
  Profile2User,
  QuoteDown,
  Radar2,
  Refresh2,
  SearchNormal1,
  Sms,
  Star1,
  StatusUp,
  Tag,
  TickCircle,
  TrendUp,
  Video,
  VolumeHigh,
  Whatsapp,
  Youtube,
} from "iconsax-react";

/**
 * Icons: Iconsax (owner's choice, Rounds 3–4), one colour (currentColor).
 * Bulk is the main style; small UI glyphs (arrows, close, plus, search…) use
 * Linear. The old Hugeicons names are kept so every page keeps working.
 */
type Variant = "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
type GlyphProps = { size?: number | string; color?: string; variant?: Variant; className?: string; style?: CSSProperties };
export type IconSvgElement = ComponentType<GlyphProps>;

const svgProps = (size: number | string = 24, className?: string, style?: CSSProperties) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  className,
  style,
  "aria-hidden": true as const,
});

/** Plain cross for menus and dialogs (Iconsax only has boxed/circled versions). */
export function CloseIcon({ size, className, style }: GlyphProps) {
  return (
    <svg {...svgProps(size, className, style)}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Plain tick for small lime check dots. */
export function CheckIcon({ size, className, style }: GlyphProps) {
  return (
    <svg {...svgProps(size, className, style)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size, className, style }: GlyphProps) {
  return (
    <svg {...svgProps(size, className, style)}>
      <path d="M7 17L17 7M8.5 7H17v8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedinIcon({ size, className, style }: GlyphProps) {
  return (
    <svg {...svgProps(size, className, style)}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="currentColor" opacity=".38" />
      <path d="M7.2 10.2h2.1V17H7.2v-6.8Zm1.05-3.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM10.8 10.2h2v.95c.3-.55 1-1.1 2.1-1.1 2.2 0 2.6 1.4 2.6 3.3V17h-2.1v-3.2c0-.8 0-1.8-1.1-1.8s-1.3.85-1.3 1.75V17h-2.2v-6.8Z" fill="currentColor" />
    </svg>
  );
}

export function TwitterIcon({ size, className, style }: GlyphProps) {
  return (
    <svg {...svgProps(size, className, style)}>
      <path d="M17.6 3h3l-6.5 7.4L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.4 3h6.1l4.2 5.6L17.6 3Zm-1 16.2h1.7L7.6 4.7H5.8l10.8 14.5Z" fill="currentColor" />
    </svg>
  );
}

const UI = new Set<IconSvgElement>([ArrowRight, ArrowLeft, ArrowDown2, ArrowUp2, Add, Minus, SearchNormal1, Copy, Link2, Refresh2, CloseIcon, CheckIcon, ArrowUpRightIcon]);

/** Keeps the old Hugeicons call shape: <HugeiconsIcon icon={X} size={20} />. */
export function HugeiconsIcon({
  icon: Glyph,
  size = 24,
  className,
  style,
  variant,
  strokeWidth: _strokeWidth,
  ...rest
}: {
  icon: IconSvgElement;
  size?: number;
  className?: string;
  style?: CSSProperties;
  variant?: Variant;
  strokeWidth?: number;
  "aria-label"?: string;
}) {
  const v = variant ?? (UI.has(Glyph) ? "Linear" : "Bulk");
  const label = rest["aria-label"];
  return (
    <span className={`inline-flex shrink-0 ${className ?? ""}`} style={style} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <Glyph size={size} color="currentColor" variant={v} />
    </span>
  );
}
export const Icon = HugeiconsIcon;

export {
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp2 as ArrowUpIcon,
  ArrowDown2 as ArrowDownIcon,
  Star1 as StarIcon,
  SearchNormal1 as SearchIcon,
  Category as MoreIcon,
  Home2 as HomeIcon,
  Element3 as GridIcon,
  Briefcase as BriefcaseIcon,
  DocumentText as NewsIcon,
  InfoCircle as InfoIcon,
  Sms as MailIcon,
  Call as PhoneIcon,
  Location as LocationIcon,
  Clock as ClockIcon,
  TickCircle as CheckCircleIcon,
  QuoteDown as QuoteIcon,
  Refresh2 as LoaderIcon,
  Danger as AlertIcon,
  DocumentText1 as FileIcon,
  Layer as LayersIcon,
  TrendUp as TrendingUpIcon,
  Radar2 as TargetIcon,
  Heart as HeartIcon,
  Flash as ZapIcon,
  People as UsersIcon,
  MagicStar as SparklesIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Youtube as YoutubeIcon,
  VolumeHigh as MegaphoneIcon,
  Mobile as SmartphoneIcon,
  Monitor as MonitorIcon,
  Code as CodeIcon,
  Whatsapp as WhatsappIcon,
  Copy as CopyIcon,
  Link2 as LinkIcon,
  Calendar as CalendarIcon,
  Book1 as BookIcon,
  Tag as TagIcon,
  Global as GlobeIcon,
  StatusUp as RocketIcon,
  Gallery as ImageIcon,
  Video as VideoIcon,
  Profile2User as HandshakeIcon,
  Add as PlusIcon,
  Minus as MinusIcon,
};
