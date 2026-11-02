import type { Metadata } from "next";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center"
    >
      <p className="text-sm font-semibold text-link">404</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="max-w-md text-muted">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className={buttonStyles()}>
          Back to home
        </Link>
        <Link href="/blog" className={buttonStyles({ variant: "secondary" })}>
          Read the blog
        </Link>
      </div>
    </main>
  );
}
