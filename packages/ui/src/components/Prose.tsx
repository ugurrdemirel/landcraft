import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type ProseSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ProseProps extends HTMLAttributes<HTMLElement> {
  /** Content scale. `lg` (prose-lg) is the comfortable blog default. */
  size?: ProseSize;
  /** Renders raw HTML (CMS / MDX output). Mutually exclusive with children. */
  html?: string;
  /** When true, removes the reading-width cap. */
  wide?: boolean;
}

const sizes: Record<ProseSize, string> = {
  sm: "prose-sm",
  md: "prose",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-2xl",
};

/**
 * Blog / article / documentation body text.
 *
 * Wraps Tailwind Typography (`@tailwindcss/typography`) and re-skins its
 * colors, type scale and code blocks through the same design tokens as every
 * other component, so dark palettes and font swaps work out of the box.
 */
export const Prose = forwardRef<HTMLElement, ProseProps>(
  ({ className, size = "lg", html, wide = false, children, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(
        "prose prose-neutral",
        sizes[size],
        !wide && "max-w-3xl",
        className,
      )}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : null)}
      {...props}
    >
      {html ? null : children}
    </article>
  ),
);
Prose.displayName = "Prose";

/** Intro / stand-first paragraph styled with the `prose` lead class. */
export const ProseLead = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("lead", className)} {...props} />
  ),
);
ProseLead.displayName = "ProseLead";