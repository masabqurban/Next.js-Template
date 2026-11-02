import "server-only";

import { z } from "zod";

/** Server-only environment variables. Importing this from a Client Component fails the build. */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  /** Bearer token for `POST /api/revalidate`. Unset = endpoint disabled. */
  REVALIDATE_SECRET: z.string().min(16).optional(),
});

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || undefined,
});
