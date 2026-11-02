import { Compass, Heart, Sparkles } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { CtaSection, Stats } from "@/features/marketing";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name}: our mission, our values and the team behind the product.`,
  path: "/about",
});

// PLACEHOLDER CONTENT: fictional values and team members.
const values = [
  {
    icon: Compass,
    title: "Clarity over cleverness",
    description:
      "Code is read far more often than it is written. We optimise for the next person who opens the file.",
  },
  {
    icon: Heart,
    title: "Users first",
    description:
      "Performance, accessibility and privacy are features. Every visitor deserves a fast, usable experience.",
  },
  {
    icon: Sparkles,
    title: "Sweat the details",
    description:
      "Small things compound: correct metadata, sensible caching, clear error messages and honest defaults.",
  },
];

const team = [
  { name: "Jane Doe", role: "Engineering Lead" },
  { name: "John Smith", role: "Staff Engineer" },
  { name: "Alex Johnson", role: "Design Engineer" },
  { name: "Maria Garcia", role: "Product Manager" },
];

export default function AboutPage() {
  return (
    <>
      <Container className="flex flex-col gap-10 pt-10 pb-20 sm:pb-28">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="About us"
          title="We help teams build the web the right way"
          description={`${siteConfig.name} is a fictional company. This page shows how a typical about page is structured, with breadcrumbs, semantic sections and structured data.`}
        />
      </Container>

      <Stats />

      <section aria-labelledby="values-heading" className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="values-heading"
            eyebrow="Values"
            title="What we believe"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-6 shadow-card"
              >
                <Icon aria-hidden className="size-6 text-link" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="team-heading"
        className="bg-surface py-20 sm:py-28"
      >
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="team-heading"
            eyebrow="Team"
            title="The people behind it"
          />
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((member) => (
              <li
                key={member.name}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span
                  aria-hidden
                  className="inline-flex size-20 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-800 dark:bg-brand-900 dark:text-brand-100"
                >
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="font-semibold">{member.name}</span>
                <span className="-mt-2 text-sm text-muted">{member.role}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
