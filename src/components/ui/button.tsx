import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-sm hover:bg-brand-700 dark:hover:bg-brand-400",
  secondary:
    "border border-border bg-surface-raised text-foreground hover:bg-surface",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

/**
 * Class names for anything that should look like a button, so links keep
 * their semantics: `<Link className={buttonStyles()} href="/">`.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
