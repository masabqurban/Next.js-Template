const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  // Dates are stored as calendar days (YYYY-MM-DD). Formatting in UTC keeps
  // the server-rendered text identical for every visitor's time zone.
  timeZone: "UTC",
});

/** `"2026-03-14"` → `"March 14, 2026"`. */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/** Estimated reading time in whole minutes (minimum 1) at ~220 words per minute. */
export function readingTime(text: string, wordsPerMinute = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
