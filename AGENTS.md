# Agent instructions

- This project uses Next.js 16 with Cache Components. APIs differ from older versions: read the relevant guide in `node_modules/next/dist/docs/` before writing framework code.
- Read `README.md` (architecture, SEO, security) and `CONTRIBUTING.md` (conventions) first.
- Keep the `app → features → shared` boundaries. Import features only via `@/features/<name>` or `@/features/<name>/server`.
- Keep `new Date()`, `Math.random()` and request APIs (`cookies()`, `headers()`) out of prerendered output, or wrap them in `use cache` or `<Suspense>`.
- Build page metadata with `createMetadata()` from `src/lib/seo/metadata.ts`.
- Run `npm run check` and `npm run build` before considering work done.
