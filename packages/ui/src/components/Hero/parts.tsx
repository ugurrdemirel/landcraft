import type { ReactNode } from "react";

export const heroContainer =
  "relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8";

/**
 * Shared display type for every hero layout. Layouts add their own color
 * (`text-foreground` on paper, inherited contrast color on the emphasis band)
 * and size, but never re-declare the family, weight, leading or tracking.
 */
export const heroTitleType =
  "font-display font-semibold leading-[1.04] tracking-[-0.03em] text-balance";

/** Shared supporting-copy type; layouts add their own color. */
export const heroDescriptionBase = "text-pretty leading-relaxed sm:text-lg";

export function HeroEyebrow({ eyebrow }: { eyebrow?: ReactNode }) {
  if (typeof eyebrow === "string") {
    return (
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
    );
  }
  return eyebrow ? <div>{eyebrow}</div> : null;
}

export function HeroActions({
  primaryAction,
  secondaryAction,
  emphasis = false,
}: {
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** Marks the actions as sitting on an emphasis band so descendant buttons inherit its contrast color. */
  emphasis?: boolean;
}) {
  if (!primaryAction && !secondaryAction) return null;
  return (
    <div data-emphasis={emphasis ? "" : undefined} className="flex flex-wrap items-center gap-4">
      {primaryAction}
      {secondaryAction}
    </div>
  );
}
