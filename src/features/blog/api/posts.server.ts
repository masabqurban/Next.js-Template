import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { posts } from "../data/posts";
import { sortByNewest, toSummary } from "../lib/posts";
import type { Post, PostSummary } from "../types";

/** Cache tag for every post read. Invalidate it from POST /api/revalidate. */
export const postsCacheTag = "posts";

/*
 * The data layer. Each function is cached with `use cache`, so the result is
 * part of the static shell and shared by every visitor. Swap the bodies for a
 * CMS or database call; the signatures and the cache tag stay the same.
 */

export async function getPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(postsCacheTag);
  return sortByNewest(posts).map(toSummary);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(postsCacheTag, `${postsCacheTag}:${slug}`);
  return posts.find((post) => post.slug === slug);
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(postsCacheTag);
  return posts.map(({ slug }) => ({ slug }));
}
