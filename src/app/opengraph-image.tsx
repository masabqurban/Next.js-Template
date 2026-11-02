import { siteConfig } from "@/config/site";
import { ogImageSize, renderOgImage } from "@/lib/seo/og-image";

// Site-wide social card, rendered at build time. `createMetadata` points every
// page at /opengraph-image unless the page provides its own image.
export const alt = siteConfig.title;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({ title: siteConfig.title });
}
