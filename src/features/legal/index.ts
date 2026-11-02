// Public API of the legal feature.
import { legalDocuments, type LegalDocument } from "./data/documents";

export type { LegalDocument };
export { legalDocuments };

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((doc) => doc.slug === slug);
}
