import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  PostBody,
  PostCard,
  PostToc,
  buildToc,
  postImagePath,
  postPath,
  relatedPosts,
} from "@/features/blog";
import { getPost, getPostSlugs, getPosts } from "@/features/blog/server";
import { articleJsonLd } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/format";

/** Every post is prerendered at build time. */
export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: postPath(post.slug),
    type: "article",
    image: {
      url: postImagePath(post.slug),
      width: 1200,
      height: 630,
      alt: post.title,
    },
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
    tags: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPost(slug), getPosts()]);
  // Unknown slugs get a real 404 status, not a 200 page that says "not found".
  if (!post) notFound();

  const path = postPath(post.slug);
  const toc = buildToc(post.content);
  const summary = allPosts.find((p) => p.slug === post.slug);
  const related = summary ? relatedPosts(summary, allPosts) : [];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path,
          image: postImagePath(post.slug),
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          author: post.author.name,
          tags: post.tags,
        })}
      />

      <Container className="flex flex-col gap-10 pt-10 pb-20">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]}
        />

        <header className="flex max-w-3xl flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-xl text-pretty text-muted">{post.excerpt}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
            <span aria-hidden>·</span>
            <span>{post.author.role}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated{" "}
                  <time dateTime={post.updatedAt}>
                    {formatDate(post.updatedAt)}
                  </time>
                </span>
              </>
            ) : null}
            {summary ? (
              <>
                <span aria-hidden>·</span>
                <span>{summary.readingTime} min read</span>
              </>
            ) : null}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="max-w-3xl min-w-0">
            <PostBody blocks={post.content} />
          </article>
          <aside className="hidden lg:block">
            <PostToc entries={toc} />
          </aside>
        </div>
      </Container>

      {related.length ? (
        <section
          aria-labelledby="related-heading"
          className="border-t border-border bg-surface py-16"
        >
          <Container className="flex flex-col gap-8">
            <h2
              id="related-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Keep reading
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
