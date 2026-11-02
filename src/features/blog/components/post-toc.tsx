import type { TocEntry } from "../types";

export function PostToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className="sticky top-24">
      <h2 id="toc-heading" className="text-sm font-semibold">
        On this page
      </h2>
      <ol className="mt-3 flex flex-col gap-2 border-s border-border text-sm">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="-ms-px block border-s border-transparent ps-4 text-muted hover:border-foreground hover:text-foreground"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
