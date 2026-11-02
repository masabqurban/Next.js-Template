import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Gauge,
  Layers,
  Search,
  ShieldCheck,
  TestTube2,
} from "lucide-react";

/** PLACEHOLDER CONTENT. Names, quotes and numbers below are fictional. */

export type Feature = { icon: LucideIcon; title: string; description: string };

export const features: Feature[] = [
  {
    icon: Gauge,
    title: "Fast by default",
    description:
      "Partial Prerendering serves a static shell from the edge while dynamic parts stream in. React Compiler removes needless re-renders.",
  },
  {
    icon: Search,
    title: "SEO built in",
    description:
      "Canonical URLs, Open Graph images, JSON-LD, sitemap, RSS and robots rules are generated from a single site config.",
  },
  {
    icon: ShieldCheck,
    title: "Secure foundations",
    description:
      "Strict security headers, a Content Security Policy, validated environment variables and hardened Server Actions.",
  },
  {
    icon: Layers,
    title: "Scales with your team",
    description:
      "Feature-based architecture with import boundaries enforced by ESLint, so the codebase stays navigable as it grows.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Semantic HTML, visible focus, reduced-motion support and automated axe checks on every pull request.",
  },
  {
    icon: TestTube2,
    title: "Tested and automated",
    description:
      "Vitest unit tests, Playwright end-to-end tests, and a CI pipeline that lints, type checks and builds every change.",
  },
];

export const stats = [
  { value: "100", label: "Lighthouse SEO score target" },
  { value: "<1s", label: "Largest Contentful Paint goal" },
  { value: "0", label: "Client JS needed for content pages" },
  { value: "A+", label: "Security headers grade target" },
];

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "We went from an empty repository to a production launch in two weeks. The structure made onboarding new developers painless.",
    name: "Sam Rivera",
    role: "CTO, Example Corp",
  },
  {
    quote:
      "Our organic traffic grew steadily after the migration. The metadata and structured data were correct from day one.",
    name: "Priya Patel",
    role: "Head of Growth, Sample Inc",
  },
  {
    quote:
      "The import boundaries felt strict at first. Six months later, they are the reason the codebase is still easy to change.",
    name: "Chris Lee",
    role: "Senior Engineer, Demo Labs",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Can I use this template for commercial projects?",
    answer:
      "Yes. It is MIT licensed, so you can use it for personal and commercial work.",
  },
  {
    question: "How do I connect a CMS or database?",
    answer:
      "Replace the bodies of the functions in each feature's api folder. Pages and components only depend on their return types, so nothing else has to change.",
  },
  {
    question: "Where should I deploy it?",
    answer:
      "Anywhere that runs Node.js. It works on Vercel out of the box, and the included Dockerfile builds a small standalone image for any container platform.",
  },
  {
    question: "Does it support dark mode?",
    answer:
      "Yes. Colours are design tokens that follow the visitor's system preference, with no flash of the wrong theme.",
  },
];
