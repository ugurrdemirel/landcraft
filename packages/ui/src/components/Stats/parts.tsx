import { cn } from "../../utils/cn";
import { ArrowDown, ArrowUp } from "../../icons";

/**
 * Shared Stats primitives.
 *
 * One voice across every layout: Space Grotesk numerals on a fixed baseline,
 * quiet sentence-case labels, hairline rules instead of card chrome, and a
 * typographic delta mark instead of a pill badge.
 */

export const valueBase =
  "font-display font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground";

/** Unit scales with the numeral it sits beside, so it reads at every size. */
export const suffixBase =
  "ml-1.5 font-sans text-[0.42em] font-medium tracking-normal text-muted-foreground";

export const gridCols: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Vertical hairlines between grid columns. Each breakpoint owns the columns it
 * actually draws (and `max-lg` removes the 2-up rule once 3/4-up takes over),
 * so wrapped rows never inherit a stray edge rule.
 */
export const gridDivider: Record<2 | 3 | 4, string> = {
  2: "sm:[&>*:nth-child(2n)]:border-l",
  3: "sm:max-lg:[&>*:nth-child(2n)]:border-l lg:[&>*:nth-child(3n+2)]:border-l lg:[&>*:nth-child(3n)]:border-l",
  4: "sm:max-lg:[&>*:nth-child(2n)]:border-l lg:[&>*:nth-child(4n+2)]:border-l lg:[&>*:nth-child(4n+3)]:border-l lg:[&>*:nth-child(4n)]:border-l",
};

/**
 * delta — a change, set in type: a direction-colored arrow beside the signed
 * magnitude in high-contrast foreground. No background, no pill, no border.
 * Zero reads neutral.
 *
 * Direction lives on the arrow, not the figure: `--color-accent` is emerald-600
 * and only clears 3:1 as a graphic, so tinting 13px text with it would miss the
 * 4.5:1 text floor. Danger (4.8:1) could tint text, but the mark stays one
 * consistent treatment instead of two.
 */
export function DeltaMark({ delta, className }: { delta: number; className?: string }) {
  const direction = delta > 0 ? "up" : delta < 0 ? "down" : "flat";

  return (
    <span
      data-direction={direction}
      className={cn(
        "inline-flex items-center gap-1 text-[0.8125rem] font-semibold leading-none tabular-nums",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-flex",
          direction === "up" && "text-accent",
          direction === "down" && "text-danger",
          direction === "flat" && "text-muted-foreground",
        )}
      >
        {direction === "up" ? (
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />
        ) : direction === "down" ? (
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.25} />
        ) : (
          <span className="h-px w-2.5 bg-current" />
        )}
      </span>
      <span className={direction === "flat" ? "text-muted-foreground" : "text-foreground"}>
        {Math.abs(delta)}%
      </span>
    </span>
  );
}
