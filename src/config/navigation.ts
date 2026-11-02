import type { Route } from "next";

export type NavItem = { label: string; href: Route };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    // Links into dynamic routes ([slug]) need a cast: typed routes only infer
    // their params from a literal passed straight to <Link>.
    title: "Legal",
    items: [
      { label: "Privacy policy", href: "/legal/privacy" as Route },
      { label: "Terms of service", href: "/legal/terms" as Route },
    ],
  },
];
