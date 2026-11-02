"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button, buttonStyles } from "@/components/ui/button";

/** Route-level error boundary. Errors are also reported via `instrumentation.ts`. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center"
    >
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted">
        This is usually temporary. Please try again.
        {error.digest ? (
          <>
            {" "}
            If it keeps happening, contact support with reference{" "}
            <code className="font-mono text-foreground">{error.digest}</code>.
          </>
        ) : null}
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonStyles({ variant: "secondary" })}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
