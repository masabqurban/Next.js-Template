import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { PostCard } from "@/features/blog";
import { getPosts } from "@/features/blog/server";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Blog",
  description: `Guides and articles from the ${siteConfig.name} team on building fast, accessible and secure web applications.`,
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container className="flex flex-col gap-12 pt-10 pb-20 sm:pb-28">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <SectionHeading
        as="h1"
        align="left"
        eyebrow="Blog"
        title="Articles and guides"
        description="Practical notes on architecture, performance, accessibility and security."
      />
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted">No posts yet. Check back soon.</p>
      )}
    </Container>
  );
}
