import type { ReactNode } from "react";

export const heroContainer =
  "relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8";

export const heroTitleBase =
  "font-display font-semibold tracking-[-0.03em] text-balance text-foreground";

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
}: {
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}) {
  if (!primaryAction && !secondaryAction) return null;
  return <div className="flex flex-wrap items-center gap-4">{primaryAction}{secondaryAction}</div>;
}