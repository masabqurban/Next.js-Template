import { Inter } from "next/font/google";

/**
 * Self-hosted at build time by next/font: no request to Google at runtime,
 * no layout shift (size-adjusted fallback), and the file is preloaded.
 */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
