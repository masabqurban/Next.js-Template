# Contributing

Thanks for helping improve this template.

## Development workflow

1. Fork the repository and create a branch from `main`, e.g. `feat/search-page`.
2. Install dependencies with `npm install`. A Husky pre-commit hook will lint and format the files you stage.
3. Make your change, then run:

   ```bash
   npm run check     # lint, type check, unit tests, formatting
   npm run build
   npm run test:e2e
   ```

4. Open a pull request using the template.

## Conventions

- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- **Architecture:** `app → features → shared`. Import features only through `@/features/<name>` or `@/features/<name>/server`. ESLint enforces both rules.
- **Server Components by default.** Add `"use client"` only to the smallest component that needs state, effects or browser APIs.
- **Validate at the boundary.** Use Zod for form input, request bodies and environment variables.
- **Style with tokens.** Use the semantic colours (`bg-surface`, `text-muted`, `text-link`…) rather than raw hex values, so light and dark mode both keep working.
- **Test what you change.** Pure logic gets a colocated `*.test.ts`. User-facing flows get a Playwright spec in `e2e/`.
