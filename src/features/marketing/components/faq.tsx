import { ChevronDown } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { faqs } from "../data/content";

/** Native `<details>` disclosure: accessible and interactive with zero JavaScript. */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface py-20 sm:py-28"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Container size="narrow" className="flex flex-col gap-12">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Frequently asked questions"
        />
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface-raised">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
