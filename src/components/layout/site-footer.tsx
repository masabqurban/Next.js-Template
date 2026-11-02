import Link from "next/link";
import { cacheLife } from "next/cache";

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

import { LogoMark } from "./logo";

/**
 * `new Date()` is non-deterministic, so with Cache Components it must sit in a
 * cached scope. The year is computed once a day and baked into the static shell.
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getUTCFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3 lg:col-span-2">
          <div className="flex items-center gap-2.5 font-bold">
            <LogoMark className="size-7" />
            {siteConfig.name}
          </div>
          <p className="max-w-sm text-sm text-muted">
            {siteConfig.description}
          </p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {siteConfig.name}. All rights reserved.
        </p>
        <a href="/rss.xml" className="hover:text-foreground">
          RSS feed
        </a>
      </Container>
    </footer>
  );
}
