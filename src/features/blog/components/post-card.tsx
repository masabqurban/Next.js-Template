import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";

import { postPath } from "../lib/urls";
import type { PostSummary } from "../types";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface-raised p-6 shadow-card transition-colors hover:border-brand-300 dark:hover:border-brand-700">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-balance">
        {/* The link covers the whole card while the heading stays the accessible name. */}
        <Link
          href={postPath(post.slug)}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-3 text-muted">{post.excerpt}</p>
      <p className="mt-auto flex items-center gap-2 text-sm text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime} min read</span>
      </p>
    </article>
  );
}
