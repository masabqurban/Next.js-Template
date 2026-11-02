import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPosts } from "@/features/blog/server";
import { legalDocuments } from "@/features/legal";

/**
 * `lastModified` is only set where a real date exists. Stamping every URL with
 * the build time tells crawlers the whole site changed on each deploy, and
 * Google learns to ignore a uniform lastmod.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;
  const newestPost = posts[0]?.updatedAt ?? posts[0]?.publishedAt;

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: url("/blog"),
      lastModified: newestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.6 },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalDocuments.map((doc) => ({
      url: url(`/legal/${doc.slug}`),
      lastModified: doc.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
