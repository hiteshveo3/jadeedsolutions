import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/system/LoginForm";
import { Icon } from "@/components/system/Icon";
import { siteConfig } from "@/lib/site";
import { appBase, getSessionUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Sign in" };

/* Sign-in (Design Lab idea 100 A: one centred card on the brand glow; the owner asked for
   Google and more spacing). The small print only claims what the system does: Firebase
   handles passwords (we never see them), sessions are httpOnly, access is role-based. */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const base = await appBase();
  if (await getSessionUser()) redirect(base || "/");
  const { next } = await searchParams;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-glow" />
      <Link href={siteConfig.url} className="relative flex items-center gap-2.5">
        <Image src="/jadeed-favicon.webp" alt="" width={38} height={38} className="h-[38px] w-[38px] rounded-[11px]" />
        <span className="text-[18px] font-bold tracking-[-0.03em] text-white">
          Jadeed <span className="font-semibold text-white/55">Solutions</span>
        </span>
      </Link>
      <div className="relative mt-10 w-full max-w-[440px] rounded-[28px] border border-white/[0.08] bg-white/[0.05] px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-10 sm:py-12">
        <LoginForm base={base} next={next} />
      </div>
      <ul className="relative mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
        <li className="flex items-center gap-1.5">
          <Icon name="shield" size={15} className="text-[#BEF70A]/80" />
          Secure sign-in with Google or email
        </li>
        <li className="flex items-center gap-1.5">
          <Icon name="lock" size={15} className="text-[#BEF70A]/80" />
          Everyone sees only their own business
        </li>
      </ul>
    </div>
  );
}
