import { readingTime } from "@/lib/utils/format";

import type { ContentBlock, Post, PostSummary, TocEntry } from "../types";

/** Plain text of a post body, for reading time and search indexing. */
export function blocksToText(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "list":
          return block.items.join(" ");
        case "code":
          return block.code;
        default:
          return block.text;
      }
    })
    .join(" ");
}

export function toSummary({ content, ...post }: Post): PostSummary {
  return { ...post, readingTime: readingTime(blocksToText(content)) };
}

/** Newest first. Sorting a copy keeps the source array untouched. */
export function sortByNewest<T extends Pick<Post, "publishedAt">>(
  posts: T[],
): T[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** URL-safe anchor id for a heading: `"Getting started!"` → `"getting-started"`. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Table of contents from the post's headings, with ids made unique. */
export function buildToc(blocks: ContentBlock[]): TocEntry[] {
  const seen = new Map<string, number>();
  return blocks
    .filter((block) => block.type === "heading")
    .map((block) => {
      const base = slugify(block.text) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      return { id: count ? `${base}-${count}` : base, text: block.text };
    });
}

/** Posts sharing the most tags with `post`, newest first on ties. */
export function relatedPosts<
  T extends Pick<Post, "slug" | "tags" | "publishedAt">,
>(post: T, candidates: T[], limit = 2): T[] {
  return sortByNewest(candidates.filter((c) => c.slug !== post.slug))
    .map((candidate) => ({
      candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
