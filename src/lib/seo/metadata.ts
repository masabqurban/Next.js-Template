import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  /** Path of the page, e.g. `/blog/hello-world`. Becomes the canonical URL. */
  path: string;
  /** Absolute or root-relative image URL. Defaults to the site-wide OG image. */
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  /** Keep the page out of search results (thank-you pages, previews…). */
  noIndex?: boolean;
};

const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.title,
};

/**
 * Builds page metadata with a canonical URL, Open Graph and Twitter cards.
 *
 * Next.js merges `openGraph` and `twitter` shallowly: a page that sets either
 * object replaces its parent's wholesale, silently dropping fields such as the
 * share image. Building every page's metadata through this helper keeps the
 * site-wide defaults on each route.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path,
  image = defaultImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: ogTitle,
      description,
      images: [image],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.socials.x.handle,
      creator: siteConfig.socials.x.handle,
      title: ogTitle,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Absolute URL for a site path, e.g. for JSON-LD and feeds. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}
