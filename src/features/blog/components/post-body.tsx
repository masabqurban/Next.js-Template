import { buildToc } from "../lib/posts";
import type { ContentBlock } from "../types";

/** Renders structured post content. Heading ids match `buildToc`, so ToC links resolve. */
export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  const headingIds = buildToc(blocks).map((entry) => entry.id);
  let headingIndex = 0;

  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const id = headingIds[headingIndex++];
            return (
              <h2
                key={index}
                id={id}
                className="mt-6 scroll-mt-24 text-2xl font-bold tracking-tight"
              >
                {block.text}
              </h2>
            );
          }
          case "paragraph":
            return (
              <p key={index} className="text-pretty text-foreground/90">
                {block.text}
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={index}
                className={`flex flex-col gap-2 ps-6 text-foreground/90 ${block.ordered ? "list-decimal" : "list-disc"}`}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <pre
                key={index}
                // Scrollable regions must be reachable by keyboard.
                tabIndex={0}
                aria-label={`${block.language} code example`}
                className="overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-6"
              >
                <code>{block.code}</code>
              </pre>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-s-4 border-accent ps-5 text-xl font-medium text-pretty italic"
              >
                <p>{block.text}</p>
                {block.cite ? (
                  <footer className="mt-2 text-base text-muted not-italic">
                    {block.cite}
                  </footer>
                ) : null}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
