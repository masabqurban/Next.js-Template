import type { Post } from "../types";

/**
 * PLACEHOLDER CONTENT. Every post, name and date below is fictional.
 * Replace this file with a CMS or database query in `../api/posts.server.ts`;
 * nothing else in the app reads it directly.
 */
export const posts: Post[] = [
  {
    slug: "getting-started",
    title: "Getting started with the template",
    excerpt:
      "A quick tour of the project structure, the scripts you will use every day, and the first things to change.",
    publishedAt: "2026-01-12",
    updatedAt: "2026-02-03",
    author: { name: "Jane Doe", role: "Engineering Lead" },
    tags: ["guide", "architecture"],
    content: [
      {
        type: "paragraph",
        text: "This template is a starting point for production websites and web apps. It ships with strict TypeScript, a tested data layer, SEO metadata, security headers and a CI pipeline, so you can focus on the product from day one.",
      },
      { type: "heading", text: "Project structure" },
      {
        type: "paragraph",
        text: "Code is organised by feature. Routes in src/app stay thin: they read params, fetch data and compose components exported by a feature. Shared building blocks live in src/components and src/lib.",
      },
      {
        type: "code",
        language: "text",
        code: "src/\n  app/         routes, layouts, metadata files\n  features/    blog, contact, marketing, legal\n  components/  shared UI (no feature imports)\n  config/      site config, navigation, env\n  lib/         framework-agnostic helpers",
      },
      { type: "heading", text: "Everyday scripts" },
      {
        type: "list",
        items: [
          "npm run dev starts the development server.",
          "npm run check runs lint, type check, unit tests and formatting.",
          "npm run test:e2e runs the Playwright suite against a production build.",
        ],
      },
      { type: "heading", text: "First changes" },
      {
        type: "list",
        ordered: true,
        items: [
          "Update src/config/site.ts with your brand details.",
          "Copy .env.example to .env.local and set NEXT_PUBLIC_SITE_URL.",
          "Replace the placeholder content in each feature's data folder.",
        ],
      },
    ],
  },
  {
    slug: "caching-with-cache-components",
    title: "Caching with Cache Components",
    excerpt:
      "How the template uses Partial Prerendering and the use cache directive to serve static shells while keeping data fresh.",
    publishedAt: "2026-02-18",
    author: { name: "John Smith", role: "Staff Engineer" },
    tags: ["performance", "caching"],
    content: [
      {
        type: "paragraph",
        text: "With Cache Components enabled, data fetching is dynamic by default and you opt in to caching where it makes sense. Every route still ships a static shell from the CDN, and only the parts that truly depend on the request stream in.",
      },
      { type: "heading", text: "Caching a data function" },
      {
        type: "code",
        language: "ts",
        code: 'export async function getPosts() {\n  "use cache";\n  cacheLife("hours");\n  cacheTag("posts");\n  return db.post.findMany();\n}',
      },
      {
        type: "paragraph",
        text: "The tag lets a CMS webhook invalidate exactly this data through the POST /api/revalidate endpoint, so editors see their changes on the next visit instead of after the cache expires.",
      },
      {
        type: "quote",
        text: "Cache the data, not the page. Pages are composed from cached pieces and stay correct by construction.",
      },
      { type: "heading", text: "Things to keep out of the cache" },
      {
        type: "list",
        items: [
          "Anything that reads cookies, headers or search params.",
          "Per-user data such as carts, sessions and dashboards.",
          "Values that must be unique per request, like nonces.",
        ],
      },
    ],
  },
  {
    slug: "accessible-components",
    title: "Building accessible components by default",
    excerpt:
      "Semantic HTML, visible focus, reduced motion and automated axe checks: the accessibility baseline this template enforces.",
    publishedAt: "2026-03-14",
    author: { name: "Alex Johnson", role: "Design Engineer" },
    tags: ["accessibility", "guide"],
    content: [
      {
        type: "paragraph",
        text: "Accessibility is cheapest when it is the default. The shared components in this template start from semantic elements and only add ARIA where HTML has no native equivalent.",
      },
      { type: "heading", text: "The baseline" },
      {
        type: "list",
        items: [
          "A skip link is the first focusable element on every page.",
          "Every interactive element has a visible focus ring.",
          "Motion is disabled when the visitor prefers reduced motion.",
          "The mobile menu uses the native Popover API for focus and Escape handling.",
        ],
      },
      { type: "heading", text: "Automated checks" },
      {
        type: "paragraph",
        text: "The Playwright suite runs axe-core against the key pages and fails the build on serious or critical violations. Automated checks catch roughly a third of issues, so keep testing with a keyboard and a screen reader too.",
      },
    ],
  },
  {
    slug: "secure-forms-with-server-actions",
    title: "Secure forms with Server Actions",
    excerpt:
      "Validation, rate limiting, honeypots and progressive enhancement: what goes into a production-ready contact form.",
    publishedAt: "2026-04-22",
    author: { name: "Jane Doe", role: "Engineering Lead" },
    tags: ["security", "forms"],
    content: [
      {
        type: "paragraph",
        text: "The contact form works before JavaScript loads, validates on the server with the same Zod schema the types are generated from, and rejects abuse without revealing why.",
      },
      { type: "heading", text: "Layers of defence" },
      {
        type: "list",
        ordered: true,
        items: [
          "A hidden honeypot field silently drops naive bots.",
          "A per-IP rate limiter stops floods before any work is done.",
          "Zod validates and trims every field on the server.",
          "Errors are returned as field messages, never as stack traces.",
        ],
      },
      {
        type: "code",
        language: "ts",
        code: 'const parsed = contactSchema.safeParse(Object.fromEntries(formData));\nif (!parsed.success) {\n  return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors };\n}',
      },
      {
        type: "paragraph",
        text: "Swap the in-memory rate limiter for a shared store such as Redis when you run more than one server instance.",
      },
    ],
  },
];
