import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { testimonials } from "../data/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          title="Teams ship faster with it"
        />
        <ul className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-surface-raised p-6 shadow-card">
                <blockquote className="text-pretty">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-900 dark:text-brand-100"
                  >
                    {initials(item.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
