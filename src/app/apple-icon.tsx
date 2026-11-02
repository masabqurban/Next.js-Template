import { ImageResponse } from "next/og";

/** 180×180 home-screen icon for iOS, generated at build time (no binary in the repo). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2546eb",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path
          d="M10 22 16 9l6 13M12.5 17h7"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
