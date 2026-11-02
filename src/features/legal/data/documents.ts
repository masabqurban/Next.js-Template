/**
 * PLACEHOLDER legal text, for layout purposes only. It is not legal advice:
 * have your own policies written or reviewed by a qualified professional.
 */
export type LegalDocument = {
  slug: "privacy" | "terms";
  title: string;
  description: string;
  updatedAt: string;
  sections: { heading: string; body: string }[];
};

export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    description:
      "How Acme collects, uses and protects your personal information.",
    updatedAt: "2026-01-01",
    sections: [
      {
        heading: "Information we collect",
        body: "Placeholder text. Describe the personal data you collect, such as the name and email address submitted through the contact form, and any analytics data.",
      },
      {
        heading: "How we use information",
        body: "Placeholder text. Explain the purposes for processing, for example replying to enquiries and improving the website.",
      },
      {
        heading: "Cookies",
        body: "Placeholder text. This template sets no cookies by default. List any cookies your analytics or other services add.",
      },
      {
        heading: "Your rights",
        body: "Placeholder text. Describe how visitors can access, correct or delete their data, and how to contact you.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    description: "The rules and conditions for using the Acme website.",
    updatedAt: "2026-01-01",
    sections: [
      {
        heading: "Acceptance of terms",
        body: "Placeholder text. State that using the website means accepting these terms.",
      },
      {
        heading: "Use of the website",
        body: "Placeholder text. Describe acceptable use and any restrictions.",
      },
      {
        heading: "Limitation of liability",
        body: "Placeholder text. Your legal adviser should provide this section.",
      },
      {
        heading: "Changes to these terms",
        body: "Placeholder text. Explain how and when the terms may be updated.",
      },
    ],
  },
];
