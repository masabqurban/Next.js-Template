import { serializeJsonLd, type JsonLdNode } from "@/lib/seo/json-ld";

/** Renders schema.org structured data. Safe against `</script>` injection. */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
