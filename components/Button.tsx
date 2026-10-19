import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "white"
  | "outlineWhite"
  | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BEF70A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06301D] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-[#BEF70A] text-[#0B1F12] hover:bg-[#ABDE09]",
  secondary:
    "bg-white/[0.08] text-white hover:bg-white/[0.14]",
  ghost: "text-white hover:bg-white/[0.08]",
  white: "bg-white text-[#0B1F12] hover:bg-white/90",
  outlineWhite: "bg-white/[0.08] text-white hover:bg-white/[0.14]",
  glass: "bg-white/15 text-white backdrop-blur-md hover:bg-white/25",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

function classes({ variant = "primary", size = "md", className = "" }: CommonProps) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type LinkButtonProps = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function LinkButton({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classNames = classes({ variant, size, className });
  const external =
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={classes({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
