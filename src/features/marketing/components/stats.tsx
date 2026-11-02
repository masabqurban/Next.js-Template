import { Container } from "@/components/ui/container";

import { stats } from "../data/content";

export function Stats() {
  return (
    <section
      aria-label="Key numbers"
      className="border-y border-border bg-surface"
    >
      <Container>
        <dl className="grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse gap-1 text-center"
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="text-4xl font-extrabold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
