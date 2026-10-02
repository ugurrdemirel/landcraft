import type { CSSProperties } from "react";

/**
 * Default brand fill for "emphasis" (bold) sections. Defined once so every
 * emphasis surface — CTA panels, Hero statements, and any future band — paints
 * the exact same gradient and reads as one design language.
 */
export const emphasisGradient =
  "radial-gradient(120% 160% at 0% 0%, rgb(var(--color-primary)), rgb(var(--color-primary-hover)) 55%, rgb(var(--color-primary) / 0.85))";

/**
 * Inline style for an emphasis surface.
 *
 * - Without a `background`, the surface is painted with the brand gradient and
 *   the text color is derived from `--color-primary` via CSS `contrast-color()`.
 * - With a `background` (any CSS color), it binds `--lc-bg` so the background
 *   and its text color share one source; `contrast-color(var(--lc-bg))` picks
 *   white/black and re-evaluates automatically when the value changes.
 *
 * This is the CSS-only contrast path mandated by AGENTS.md — no JS luminance
 * helpers.
 */
export function emphasisSurfaceStyle(background?: string): CSSProperties {
  if (background) {
    return {
      "--lc-bg": background,
      backgroundColor: "var(--lc-bg)",
      color: "contrast-color(var(--lc-bg))",
    } as CSSProperties;
  }

  return {
    background: emphasisGradient,
    color: "contrast-color(rgb(var(--color-primary)))",
  };
}
