import { clientEnv } from "./env.client";

/**
 * Single source of truth for brand details. Every value below is placeholder
 * content: replace it with your own before launch.
 */
export const siteConfig = {
  name: "Acme",
  title: "Acme: Build faster with a production-ready foundation",
  description:
    "Acme is a fictional company used to demonstrate a production-grade Next.js starter with first-class SEO, performance and accessibility.",
  url: clientEnv.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
  language: "en",
  /** Browser UI colour (mobile address bar, installed-app title bar). */
  themeColor: { light: "#ffffff", dark: "#0b1120" },
  backgroundColor: "#ffffff",
  author: { name: "Acme Team", url: clientEnv.NEXT_PUBLIC_SITE_URL },
  contact: {
    email: "hello@example.com",
    phone: "+1 555 0100",
    address: {
      street: "123 Example Street",
      city: "Springfield",
      region: "CA",
      postalCode: "90000",
      country: "US",
    },
  },
  socials: {
    x: { handle: "@acme", url: "https://x.com/acme" },
    github: { url: "https://github.com/acme" },
    linkedin: { url: "https://www.linkedin.com/company/acme" },
  },
  keywords: ["Next.js", "React", "TypeScript", "Starter", "Template"],
} as const;

export type SiteConfig = typeof siteConfig;
