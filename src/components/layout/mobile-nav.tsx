"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";

import type { NavItem } from "@/config/navigation";

import { NavLinks } from "./nav-links";

const MENU_ID = "mobile-menu";

/**
 * Built on the native Popover API: focus handling, Escape-to-close and
 * click-outside dismissal come from the browser, not from custom JavaScript.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="md:hidden">
      <button
        type="button"
        popoverTarget={MENU_ID}
        aria-controls={MENU_ID}
        className="inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <div
        ref={menuRef}
        id={MENU_ID}
        popover="auto"
        className="inset-x-0 top-0 m-0 w-full border-b border-border bg-background p-4 shadow-card backdrop:bg-black/30"
      >
        <div className="flex justify-end">
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground"
          >
            <X aria-hidden className="size-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile">
          <NavLinks
            items={items}
            className="flex flex-col gap-1"
            linkClassName="block px-3 py-3 text-base"
            onNavigate={() => menuRef.current?.hidePopover()}
          />
        </nav>
      </div>
    </div>
  );
}
