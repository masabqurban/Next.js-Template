import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background: pure CSS, so it costs no network request. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-200),transparent)] opacity-60 dark:bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-900),transparent)]"
      />
      <Container className="flex flex-col items-center gap-8 py-24 text-center sm:py-32">
        <p className="rounded-full border border-border bg-surface-raised px-4 py-1.5 text-sm text-muted">
          Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
        </p>
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Ship production-ready web apps{" "}
          <span className="text-link">from day one</span>
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted sm:text-xl">
          A carefully structured starter with SEO, performance, security,
          accessibility and testing already done, so you can focus on your
          product.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog/getting-started"
            className={buttonStyles({ size: "lg" })}
          >
            Get started
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="/about"
            className={buttonStyles({ variant: "secondary", size: "lg" })}
          >
            Learn more
          </Link>
        </div>
      </Container>
    </section>
  );
}
