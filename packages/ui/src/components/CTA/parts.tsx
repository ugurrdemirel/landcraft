import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/**
 * Shared emphasis typography. Every CTA layout uses these so switching option
 * changes only the arrangement, never the type.
 */
export const ctaTitleBase =
  "font-display text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl";

export const ctaDescriptionBase = "mt-5 max-w-xl text-pretty text-base leading-7 sm:text-lg";

export function CTAActions({
  action,
  secondaryAction,
  align,
  actionClassName = "flex flex-wrap items-center gap-4",
  emphasis = false,
}: {
  action?: ReactNode;
  secondaryAction?: ReactNode;
  align?: "left" | "center";
  actionClassName?: string;
  /** Marks the actions as sitting on an emphasis band so descendant buttons inherit its contrast color. */
  emphasis?: boolean;
}) {
  return (
    <div
      data-emphasis={emphasis ? "" : undefined}
      className={cn(
        actionClassName,
        align === "center" && "justify-center",
      )}
    >
      {action}
      {secondaryAction}
    </div>
  );
}
