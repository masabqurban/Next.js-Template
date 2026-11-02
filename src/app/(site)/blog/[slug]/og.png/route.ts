import { getPost, getPostSlugs } from "@/features/blog/server";
import { renderOgImage } from "@/lib/seo/og-image";

/**
 * Per-post social card at a stable URL: `/blog/<slug>/og.png`.
 *
 * A Route Handler rather than an `opengraph-image.tsx` file, because file-based
 * images on dynamic segments get a hashed URL, and the article's JSON-LD needs
 * a predictable one. Prerendered for every post at build time.
 */
export async function generateStaticParams() {
  return getPostSlugs();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/blog/[slug]/og.png">,
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  return renderOgImage({ title: post.title, eyebrow: post.tags[0] ?? "Blog" });
}
