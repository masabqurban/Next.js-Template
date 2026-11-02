import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("size-8 text-accent", className)}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M10 22 16 9l6 13M12.5 17h7"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-bold tracking-tight",
        className,
      )}
    >
      <LogoMark />
      <span className="text-lg">{siteConfig.name}</span>
      <span className="sr-only">home page</span>
    </Link>
  );
}
