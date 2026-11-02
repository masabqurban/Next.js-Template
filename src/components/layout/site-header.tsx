import Link from "next/link";

import { mainNav } from "@/config/navigation";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks
            items={mainNav}
            className="flex items-center gap-1"
            linkClassName="px-3 py-2"
          />
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={buttonStyles({
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Get in touch
          </Link>
          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  );
}
