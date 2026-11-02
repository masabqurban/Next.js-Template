import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Shared 1200×630 social card. Used by the site-wide `opengraph-image` and by
 * per-route images (e.g. one per blog post), so every share looks consistent.
 */
export function renderOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #171d54 0%, #1d35d8 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 32 32">
            <path
              d="M10 22 16 9l6 13M12.5 17h7"
              fill="none"
              stroke="#2546eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow ? (
          <span
            style={{
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: "#bfd3fe",
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <span
          style={{
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {title}
        </span>
      </div>

      <span style={{ fontSize: 26, color: "#bfd3fe" }}>{host}</span>
    </div>,
    ogImageSize,
  );
}
