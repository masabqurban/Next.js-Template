import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { features } from "../data/content";

export function FeatureGrid() {
  return (
    <section aria-labelledby="features-heading" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Everything a serious project needs"
          description="Opinionated defaults drawn from real production projects, documented so you can change them with confidence."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-6 shadow-card"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-link dark:bg-brand-950">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
