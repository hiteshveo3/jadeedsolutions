"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/system/Icon";
import { AskJadeedAI, NotificationBell, TopBarSearch } from "@/components/system/TopBar";
import { navFor, type NavItem } from "@/lib/system/nav";
import { ROLE_LABEL, type Role } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* The dashboard and client portal shell (Jadeed Marketing's AppShell, Design Lab idea 093 A),
   mobile first:
   - phones: a slim top bar (logo, Jadeed AI, notifications) and a bottom navigation with the
     four main screens plus "More", which slides up as a sheet with everything else;
   - desktop: a labelled sidebar that collapses to icons, and a top bar with search.
   The site's dark system throughout; the active item is one colour (lime). */

export type ShellUser = { name: string; email: string; role: Role; picture?: string };

const COLLAPSE_KEY = "jadeed-app-sidebar";

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "J"
  );
}

export function AppShell({ user, base, children }: { user: ShellUser; base: string; children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [more, setMore] = useState(false);
  const items = navFor(user.role);
  const barItems = items.filter((item) => item.bar);
  const moreItems = items.filter((item) => !item.bar);
  const hasBar = items.length > 1;
  const staff = user.role === "admin" || user.role === "team";
  const portal = user.role === "client" || user.role === "client_staff";

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      /* storage blocked: keep expanded */
    }
  }, []);

  useEffect(() => setMore(false), [pathname]);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      try {
        window.localStorage.setItem(COLLAPSE_KEY, c ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !c;
    });
  };

  /* Paths arrive with the /app prefix on localhost and without it on the app host. */
  const current = pathname.replace(/^\/app/, "") || "";
  const isActive = (href: string) => (href === "" ? current === "" || current === "/" : current === href || current.startsWith(`${href}/`));
  const moreActive = moreItems.some((item) => isActive(item.href));
  const hrefFor = (item: NavItem) => `${base}${item.href}` || "/";

  const signOut = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.replace(`${base}/login`);
    router.refresh();
  };

  const brand = (wide: boolean) => (
    <Link href={base || "/"} className={cn("flex items-center gap-2.5", !wide && "justify-center")}>
      <Image src="/jadeed-favicon.webp" alt="Jadeed Solutions" width={34} height={34} className="h-[34px] w-[34px] shrink-0 rounded-[10px]" />
      {wide ? (
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.02em] text-white">
            Jadeed <span className="font-semibold text-white/55">Solutions</span>
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#BEF70A]/80">{portal ? "Client portal" : user.role === "visitor" ? "Your account" : "Dashboard"}</span>
        </span>
      ) : null}
    </Link>
  );

  const sidebar = (wide: boolean) => (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 shrink-0 items-center px-4", !wide && "justify-center px-0")}>{brand(wide)}</div>
      <nav aria-label="Main" className="flex-1 space-y-1 overflow-y-auto px-3 py-3 custom-scrollbar">
        {items.map((item) => {
          const on = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={hrefFor(item)}
              title={wide ? undefined : item.label}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-full px-3.5 text-sm transition-colors",
                !wide && "justify-center px-0",
                on ? "bg-[#BEF70A] font-bold text-[#0B1F12]" : "font-semibold text-white/70 hover:bg-white/[0.07] hover:text-white"
              )}
            >
              <Icon name={item.icon} size={19} />
              {wide ? <span className="truncate">{item.label}</span> : <span className="sr-only">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-white/[0.08] p-3">
        <div className={cn("flex items-center gap-2.5 rounded-full px-1.5 py-1.5", !wide && "justify-center px-0")}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-xs font-bold text-white">{initials(user.name)}</span>
          {wide ? (
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
              <span className="block truncate text-[11px] text-white/50">{ROLE_LABEL[user.role]}</span>
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={signOut}
          className={cn("mt-1 flex min-h-9 w-full items-center gap-3 rounded-full px-3.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white", !wide && "justify-center px-0")}
          title={wide ? undefined : "Sign out"}
        >
          <Icon name="logout" size={18} />
          {wide ? "Sign out" : <span className="sr-only">Sign out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      {/* Desktop sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-30 hidden border-r border-white/[0.08] bg-[#06301D]/70 backdrop-blur-xl transition-[width] duration-200 lg:block", collapsed ? "w-[4.75rem]" : "w-64")}>
        {sidebar(!collapsed)}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3.5 top-[4.6rem] flex h-7 w-7 items-center justify-center rounded-full bg-[#0B561C] text-white/80 shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#BEF70A] hover:text-[#0B1F12]"
        >
          <Icon name="chevronRight" size={14} className={collapsed ? "" : "rotate-180"} />
        </button>
      </aside>

      <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-[4.75rem]" : "lg:pl-64")}>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/[0.08] bg-[#06301D]/75 px-4 backdrop-blur-xl lg:px-6">
          <div className="lg:hidden">{brand(false)}</div>
          {staff ? <TopBarSearch base={base} /> : null}
          <div className="ml-auto flex items-center gap-1.5">
            {staff ? <AskJadeedAI /> : portal ? <AskJadeedAI audience="client" /> : null}
            {staff || portal ? <NotificationBell base={base} /> : null}
            {!hasBar ? (
              <button type="button" onClick={signOut} aria-label="Sign out" className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/[0.08] hover:text-white lg:hidden">
                <Icon name="logout" size={19} />
              </button>
            ) : null}
          </div>
        </header>
        <main className={cn("mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8 lg:pb-16", hasBar ? "pb-[calc(5rem+env(safe-area-inset-bottom))]" : "pb-16")}>{children}</main>
      </div>

      {/* Phones: the bottom navigation. */}
      {hasBar ? (
        <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-[#06301D]/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
          <ul className="mx-auto grid h-16 max-w-xl" style={{ gridTemplateColumns: `repeat(${barItems.length + (moreItems.length ? 1 : 0)}, minmax(0, 1fr))` }}>
            {barItems.map((item) => {
              const on = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={hrefFor(item)}
                    aria-current={on ? "page" : undefined}
                    className={cn("flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors", on ? "text-[#BEF70A]" : "text-white/60 active:text-white")}
                  >
                    <Icon name={item.icon} size={22} variant={on ? "Bold" : "Bulk"} />
                    <span className="max-w-full truncate px-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            {moreItems.length ? (
              <li>
                <button
                  type="button"
                  onClick={() => setMore(true)}
                  aria-haspopup="dialog"
                  aria-expanded={more}
                  className={cn("flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors", more || moreActive ? "text-[#BEF70A]" : "text-white/60 active:text-white")}
                >
                  <Icon name="menu" size={22} />
                  More
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}

      {more ? <MoreSheet items={moreItems} isActive={isActive} hrefFor={hrefFor} user={user} onClose={() => setMore(false)} onSignOut={signOut} /> : null}
    </div>
  );
}

/** "More" on phones: the rest of the menu, sliding up from the bottom. */
function MoreSheet({
  items,
  isActive,
  hrefFor,
  user,
  onClose,
  onSignOut,
}: {
  items: NavItem[];
  isActive: (href: string) => boolean;
  hrefFor: (item: NavItem) => string;
  user: ShellUser;
  onClose: () => void;
  onSignOut: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="More">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[#051B1E]/65 motion-safe:animate-[fade-in_.2s_ease-out]" />
      <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[26px] bg-[#06301D] pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-20px_60px_rgba(0,0,0,0.4)] motion-safe:animate-[sheet-up_.26s_cubic-bezier(.2,.8,.2,1)]">
        <div className="flex justify-center pt-3">
          <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-3 px-5 pb-3 pt-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-sm font-bold text-white">{initials(user.name)}</span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-white">{user.name}</p>
            <p className="truncate text-xs text-white/50">
              {ROLE_LABEL[user.role]} · {user.email}
            </p>
          </div>
        </div>
        <ul className="px-2">
          {items.map((item) => {
            const on = isActive(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={hrefFor(item)}
                  onClick={onClose}
                  aria-current={on ? "page" : undefined}
                  className={cn("flex min-h-12 items-center gap-3.5 rounded-[14px] px-4 text-[15px] font-semibold", on ? "text-[#BEF70A]" : "text-white/85 active:bg-white/[0.06]")}
                >
                  <Icon name={item.icon} size={21} variant={on ? "Bold" : "Bulk"} />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-1 border-t border-white/[0.08] pt-1">
            <button type="button" onClick={onSignOut} className="flex min-h-12 w-full items-center gap-3.5 rounded-[14px] px-4 text-[15px] font-semibold text-white/70 active:bg-white/[0.06]">
              <Icon name="logout" size={21} />
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>,
    document.body
  );
}
