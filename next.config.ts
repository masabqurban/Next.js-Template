import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy without nonces, so every page can still be served as
 * a static shell from the CDN. Next.js inlines small bootstrap scripts, which is
 * why `script-src` needs 'unsafe-inline'. For a stricter policy, switch to the
 * nonce (forces dynamic rendering) or SRI approach described in
 * `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // React needs eval in development for better stack traces.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Partial Prerendering + `use cache`: each route ships a static shell from the
  // CDN and only the truly dynamic parts stream in at request time.
  cacheComponents: true,
  partialPrefetching: true,
  // Automatic memoization, so components don't need manual useMemo/useCallback.
  reactCompiler: true,
  // `<Link href>` and `router.push` are type-checked against the real routes.
  typedRoutes: true,
  // Self-contained server in .next/standalone, used by the Dockerfile.
  output: "standalone",
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Allow-list every remote image host explicitly. Never use a "**" wildcard:
    // it turns the image optimizer into an open proxy.
    remotePatterns: [],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

export default nextConfig;
