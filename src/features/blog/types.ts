/**
 * Post bodies are structured blocks rather than an HTML string, so they can be
 * rendered without `dangerouslySetInnerHTML` and validated at the boundary.
 * When moving to a CMS, map its rich-text format onto these blocks (or replace
 * `PostBody` with an MDX renderer).
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string; cite?: string };

export type Author = {
  name: string;
  role: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO 8601 calendar date, e.g. `2026-03-14`. */
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  tags: string[];
  content: ContentBlock[];
};

export type PostSummary = Omit<Post, "content"> & { readingTime: number };

export type TocEntry = { id: string; text: string };
