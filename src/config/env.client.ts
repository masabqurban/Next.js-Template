import { z } from "zod";

/**
 * Environment variables that are safe to ship to the browser.
 *
 * Each `NEXT_PUBLIC_*` value must be read with a literal `process.env.X`
 * expression so Next.js can inline it at build time. A missing or malformed
 * value fails the build instead of surfacing as a broken page in production.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .default("http://localhost:3000")
    .transform((url) => url.replace(/\/+$/, "")),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
});
