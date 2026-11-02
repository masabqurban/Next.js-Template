"use client";

import "./globals.css";

/** Last-resort boundary for errors thrown in the root layout itself. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
