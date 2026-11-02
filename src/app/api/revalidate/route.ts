import { revalidateTag } from "next/cache";
import { z } from "zod";

import { serverEnv } from "@/config/env.server";
import { postsCacheTag } from "@/features/blog/server";
import { safeCompare } from "@/lib/security/request";

/** Only known tags can be revalidated, so the endpoint can't be used to probe the cache. */
const bodySchema = z.object({
  tag: z.union([
    z.literal(postsCacheTag),
    z.string().regex(new RegExp(`^${postsCacheTag}:[a-z0-9-]{1,100}$`)),
  ]),
});

/**
 * `POST /api/revalidate` with `Authorization: Bearer <REVALIDATE_SECRET>` and
 * `{ "tag": "posts" }`. Call it from a CMS webhook after content changes, so
 * visitors see the update on their next request instead of when the cache expires.
 */
export async function POST(request: Request) {
  const secret = serverEnv.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Revalidation is disabled." },
      { status: 404 },
    );
  }

  const token =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!safeCompare(token, secret)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Unknown or missing tag." }, { status: 400 });
  }

  // "max": serve stale content while the fresh version renders in the background.
  revalidateTag(parsed.data.tag, "max");
  return Response.json({ revalidated: true, tag: parsed.data.tag });
}
