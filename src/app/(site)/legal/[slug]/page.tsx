import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getLegalDocument, legalDocuments } from "@/features/legal";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/format";

export function generateStaticParams() {
  return legalDocuments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const doc = getLegalDocument((await params).slug);
  if (!doc) notFound();

  return createMetadata({
    title: doc.title,
    description: doc.description,
    path: `/legal/${doc.slug}`,
  });
}

export default async function LegalPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const doc = getLegalDocument((await params).slug);
  if (!doc) notFound();

  return (
    <Container
      size="narrow"
      className="flex flex-col gap-10 pt-10 pb-20 sm:pb-28"
    >
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ]}
      />
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-muted">
          Last updated{" "}
          <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
        </p>
      </header>
      <div className="flex flex-col gap-8">
        {doc.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
