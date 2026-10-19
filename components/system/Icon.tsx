import type { ComponentType, CSSProperties } from "react";
import {
  Activity,
  Add,
  ArrowDown2,
  ArrowLeft,
  ArrowRight,
  ArrowRight2,
  AttachCircle,
  Briefcase,
  Calendar,
  Call,
  Chart2,
  Clock,
  Copy,
  DocumentText,
  DocumentUpload,
  Edit2,
  Eye,
  EyeSlash,
  Flag,
  Global,
  Google,
  HambergerMenu,
  Home2,
  InfoCircle,
  Layer,
  Lock1,
  Logout,
  MagicStar,
  Message,
  Messages2,
  Monitor,
  MoneyRecive,
  More,
  Notification,
  People,
  Profile,
  Radar2,
  Receipt21,
  Refresh2,
  SearchNormal1,
  Send2,
  Setting2,
  ShieldTick,
  Shop,
  Sms,
  Star1,
  TaskSquare,
  TickCircle,
  Trash,
  Danger,
  Whatsapp,
} from "iconsax-react";
import { CheckIcon, CloseIcon } from "@/components/icons";

/* Icons for the dashboard and client portal: Iconsax (owner's choice), one colour
   (currentColor). Bulk for the main icons, Linear for small UI glyphs (Round 3–4). */

type Variant = "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
type Glyph = ComponentType<{ size?: number | string; color?: string; variant?: Variant; className?: string; style?: CSSProperties }>;

const GLYPHS = {
  home: Home2,
  people: People,
  layers: Layer,
  chat: Messages2,
  calendar: Calendar,
  briefcase: Briefcase,
  tasks: TaskSquare,
  receipt: Receipt21,
  sparkles: MagicStar,
  settings: Setting2,
  chart: Chart2,
  activity: Activity,
  message: Message,
  document: DocumentText,
  upload: DocumentUpload,
  profile: Profile,
  logout: Logout,
  menu: HambergerMenu,
  chevronRight: ArrowRight2,
  chevronDown: ArrowDown2,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  search: SearchNormal1,
  bell: Notification,
  send: Send2,
  x: CloseIcon,
  check: CheckIcon,
  checkCircle: TickCircle,
  trash: Trash,
  eye: Eye,
  eyeOff: EyeSlash,
  mail: Sms,
  phone: Call,
  globe: Global,
  shop: Shop,
  target: Radar2,
  info: InfoCircle,
  warning: Danger,
  lock: Lock1,
  star: Star1,
  money: MoneyRecive,
  monitor: Monitor,
  google: Google,
  whatsapp: Whatsapp,
  shield: ShieldTick,
  plus: Add,
  edit: Edit2,
  clock: Clock,
  flag: Flag,
  attach: AttachCircle,
  refresh: Refresh2,
  more: More,
  copy: Copy,
} satisfies Record<string, Glyph>;

export type IconName = keyof typeof GLYPHS;

const LINEAR = new Set<IconName>(["menu", "chevronRight", "chevronDown", "arrowRight", "arrowLeft", "search", "x", "check", "plus", "more", "copy", "refresh", "send"]);

export function Icon({ name, size = 20, className, variant }: { name: IconName; size?: number; className?: string; variant?: Variant }) {
  const Glyph: Glyph = GLYPHS[name];
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 ${className ?? ""}`}>
      <Glyph size={size} color="currentColor" variant={variant ?? (LINEAR.has(name) ? "Linear" : "Bulk")} />
    </span>
  );
}
