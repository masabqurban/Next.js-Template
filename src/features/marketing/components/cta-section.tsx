import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-950 px-6 py-16 text-center text-white sm:px-16">
          <h2
            id="cta-heading"
            className="max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Ready to start your next project?
          </h2>
          <p className="max-w-xl text-lg text-brand-100">
            Clone the template, update the site config and ship. Questions?
            We&apos;re happy to help.
          </p>
          <Link
            href="/contact"
            className={buttonStyles({
              size: "lg",
              className:
                "bg-white text-brand-950 hover:bg-brand-100 dark:hover:bg-brand-100",
            })}
          >
            Contact us
          </Link>
        </div>
      </Container>
    </section>
  );
}
