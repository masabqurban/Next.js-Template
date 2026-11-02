import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/features/blog";
import { getPosts } from "@/features/blog/server";
import {
  CtaSection,
  Faq,
  FeatureGrid,
  Hero,
  Stats,
  Testimonials,
} from "@/features/marketing";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ path: "/" });

async function LatestPosts() {
  const posts = (await getPosts()).slice(0, 3);
  if (!posts.length) return null;

  return (
    <section aria-labelledby="latest-posts-heading" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            id="latest-posts-heading"
            eyebrow="Blog"
            title="Latest articles"
            align="left"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-semibold text-link hover:underline"
          >
            View all posts
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeatureGrid />
      <Testimonials />
      <LatestPosts />
      <Faq />
      <CtaSection />
    </>
  );
}
