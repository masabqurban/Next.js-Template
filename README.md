# Next.js Template

A production-grade starter for **Next.js 16** with the App Router, **TypeScript**, and **Tailwind CSS v4**. SEO, performance, security, accessibility, testing and CI are set up from the first commit.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

> All content in this repository (the "Acme" brand, people, posts, quotes and figures) is placeholder data.

## Contents

- [Highlights](#highlights)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [SEO](#seo)
- [Performance](#performance)
- [Security](#security)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Deployment](#deployment)
- [Customising the template](#customising-the-template)

## Highlights

| Area              | What's included                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rendering**     | Cache Components (Partial Prerendering + `use cache`), Partial Prefetching, React Compiler, typed routes                                                                |
| **SEO**           | Metadata helper, canonical URLs, generated Open Graph images, JSON-LD (Organization, WebSite, BlogPosting, BreadcrumbList, FAQPage), sitemap, robots, RSS, web manifest |
| **Security**      | CSP and hardened headers, Zod-validated env vars, `server-only` boundaries, rate-limited Server Actions, honeypot, timing-safe webhook auth                             |
| **Architecture**  | Feature-based modules with import boundaries enforced by ESLint                                                                                                         |
| **Accessibility** | Skip link, semantic landmarks, visible focus, reduced motion, native Popover menu, axe checks in light and dark mode                                                    |
| **Quality**       | Strict TypeScript (`noUncheckedIndexedAccess`), ESLint, Prettier, Vitest, Playwright, Husky and lint-staged                                                             |
| **Delivery**      | GitHub Actions CI, Dependabot, multi-stage Docker image running as non-root, health check endpoint                                                                      |

## Getting started

Requirements: **Node.js 22+** (24 recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                                         | Description                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                                   | Start the development server                                 |
| `npm run build`                                 | Create a production build                                    |
| `npm run start`                                 | Serve the production build                                   |
| `npm run lint` / `lint:fix`                     | Lint with ESLint                                             |
| `npm run typecheck`                             | Generate route types and run `tsc`                           |
| `npm run format` / `format:check`               | Format with Prettier                                         |
| `npm run test` / `test:watch` / `test:coverage` | Unit tests with Vitest                                       |
| `npm run test:e2e`                              | End-to-end tests with Playwright (run `npm run build` first) |
| `npm run check`                                 | Lint, type check, unit tests and formatting in one go        |

## Project structure

```text
src/
├── app/                      Routing layer: thin pages, layouts and metadata files
│   ├── (site)/               Public pages sharing the header and footer
│   │   ├── blog/[slug]/      Post page + og.png route (per-post social card)
│   │   ├── legal/[slug]/     Privacy policy, terms
│   │   └── …                 Home, about, blog, contact
│   ├── api/
│   │   ├── health/           Liveness probe
│   │   └── revalidate/       On-demand cache invalidation (CMS webhooks)
│   ├── rss.xml/              RSS 2.0 feed
│   ├── layout.tsx            Root layout, global metadata, JSON-LD
│   ├── opengraph-image.tsx   Site-wide social card
│   ├── sitemap.ts · robots.ts · manifest.ts
│   └── error.tsx · global-error.tsx · not-found.tsx
├── features/                 Product features, each a self-contained module
│   ├── blog/                 api/ (cached data) · components/ · data/ · lib/ · index.ts · server.ts
│   ├── contact/              api/ (Server Action) · components/ · schemas/
│   ├── legal/
│   └── marketing/            Home and about page sections
├── components/               Shared UI: ui/, layout/, seo/ (no feature imports)
├── config/                   site.ts, navigation.ts, env.client.ts, env.server.ts
├── lib/                      Framework-agnostic helpers: seo/, security/, utils/
└── instrumentation.ts        Server error reporting hook
e2e/                          Playwright tests: smoke, SEO, contact form, accessibility
```

## Architecture

**Dependencies flow one way: `app → features → shared`.** ESLint fails the build if shared code imports a feature, or a feature imports a route.

- **Routes are thin.** A page reads its params, fetches data and composes components exported by features.
- **Features have a public API.** Import from `@/features/<name>` (client-safe) or `@/features/<name>/server` (server-only data access). Deep imports such as `@/features/blog/components/post-card` are blocked by lint, so a feature's internals can change freely.
- **The data layer is swappable.** `features/blog/api/posts.server.ts` reads from a local placeholder array today. Replace the function bodies with a CMS or database call; pages depend only on the return types.
- **Content is structured, not HTML.** Posts are typed blocks rendered by React, so no `dangerouslySetInnerHTML` is needed for content.
- **Environment variables are validated** with Zod when the server starts. `env.server.ts` imports `server-only`, so a secret can never be bundled into client code.

## SEO

- **`createMetadata()`** (`src/lib/seo/metadata.ts`) builds the title, description, canonical URL, Open Graph and Twitter cards for each page. Next.js merges `openGraph` shallowly, so a page that sets its own would otherwise lose the share image. The helper prevents that.
- **No inherited canonical.** The root layout deliberately sets no canonical URL, so a page that forgets to set one can't claim to be the home page.
- **Social cards** are generated with `next/og` at build time: one site-wide card, plus one per post at a stable `/blog/<slug>/og.png` URL that the JSON-LD can reference.
- **Structured data** is escaped against `</script>` injection (`serializeJsonLd`).
- **The sitemap uses real dates.** `lastModified` comes from content, never from the build time.
- **Unknown URLs.** Unlisted slugs render on request. On the first visit the static shell has already been sent, so Next.js marks the page `noindex`. The not-found result is then cached and later requests get a real `404`. The e2e suite covers both cases.

## Performance

- **Partial Prerendering.** Every route is served as a static shell from the CDN. Data functions are cached with `use cache` + `cacheLife`, and tagged with `cacheTag` so a webhook can refresh them on demand.
- **Close to zero client JavaScript.** Only the contact form and the navigation are Client Components. The FAQ uses `<details>`, the mobile menu uses the Popover API, and dark mode is pure CSS.
- **React Compiler** handles memoisation, so there is no hand-written `useMemo` or `useCallback`.
- **Fonts** are self-hosted by `next/font`, with a size-adjusted fallback to avoid layout shift.
- **Images** are served as AVIF and WebP. Remote hosts must be allow-listed one by one, never with a `**` wildcard.

## Security

| Measure                                                                                                      | Where                                         |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Content Security Policy, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, no `X-Powered-By` | `next.config.ts`                              |
| Validated env vars, server-only secrets                                                                      | `src/config/env.*.ts`                         |
| Contact form: honeypot, per-IP rate limit, server-side Zod validation, generic error messages                | `src/features/contact/api/contact.actions.ts` |
| Webhook auth with constant-time secret comparison and an allow-list of cache tags                            | `src/app/api/revalidate/route.ts`             |
| Production dependency audit on every push, weekly Dependabot updates                                         | `.github/`                                    |

The CSP allows `'unsafe-inline'` scripts so pages can stay static. For a stricter policy, use nonces (which forces dynamic rendering) or the experimental SRI mode. See the Next.js [Content Security Policy guide](https://nextjs.org/docs/app/guides/content-security-policy).

The rate limiter is in-memory. That works for a single server; on serverless or multiple instances, implement the `RateLimiter` interface with a shared store such as Redis.

## Accessibility

- A skip link, landmark regions and one `h1` per page (asserted in e2e tests).
- A visible focus ring on every interactive element, and respect for `prefers-reduced-motion`.
- Form errors linked to their inputs with `aria-describedby` and `aria-invalid`.
- [axe-core](https://github.com/dequelabs/axe-core) runs against key pages in **light and dark mode** and fails on serious or critical WCAG 2.2 AA violations.

## Testing

```bash
npm run test       # Vitest: SEO helpers, security utilities, schemas, content logic
npm run build
npm run test:e2e   # Playwright: desktop and mobile, against the production build
```

Unit tests sit next to the code they cover (`*.test.ts`). End-to-end tests in `e2e/` cover rendering, real 404s, navigation, the skip link, metadata, structured data, feeds, security headers, the contact form and accessibility.

## Deployment

**Vercel:** import the repository and set `NEXT_PUBLIC_SITE_URL`. No other configuration is needed.

**Docker** (any container platform):

```bash
docker build -t nextjs-template --build-arg NEXT_PUBLIC_SITE_URL=https://example.com .
docker run -p 3000:3000 -e REVALIDATE_SECRET=change-me nextjs-template
```

The image uses the standalone output, runs as the unprivileged `node` user, and checks `/api/health`. `NEXT_PUBLIC_*` variables are inlined at build time, so pass them as build arguments.

### Environment variables

| Variable                               | Required           | Description                                                                 |
| -------------------------------------- | ------------------ | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Yes, in production | Canonical site URL, used for metadata, the sitemap, feeds and social cards  |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No                 | Google Search Console verification token                                    |
| `REVALIDATE_SECRET`                    | No                 | Bearer token for `POST /api/revalidate`. If unset, the endpoint is disabled |

### On-demand revalidation

```bash
curl -X POST https://example.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tag":"posts"}'
```

## Customising the template

1. **Brand:** edit `src/config/site.ts`, the colour tokens in `src/app/globals.css`, and `src/app/icon.svg`.
2. **Navigation:** edit `src/config/navigation.ts`.
3. **Content:** replace the placeholder files in `src/features/*/data/`, or point `features/blog/api/posts.server.ts` at your CMS.
4. **Contact form:** implement `deliverContactMessage` in `src/features/contact/api/deliver.server.ts` with your email provider.
5. **Error tracking:** forward errors from `onRequestError` in `src/instrumentation.ts` to Sentry or a similar service.
6. **New feature:** create `src/features/<name>/` with an `index.ts` (and a `server.ts` if it has server-only data access), then compose it from a route in `src/app/`.

## License

[MIT](./LICENSE)
