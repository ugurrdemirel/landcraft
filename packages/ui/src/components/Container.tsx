import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Render as a specific element (section, header, …). */
  as?: ElementType;
  /**
   * Maximum content width:
   * `sm` → prose · `md` → reading · `lg` → plans/splits ·
   * `xl` → default marketing page · `full` → edge-to-edge.
   */
  size?: ContainerSize;
  /** Responsive gutters (px-5 / sm:px-8). Disable for flush content. */
  gutters?: boolean;
}

const sizes: Record<Exclude<ContainerSize, "full">, string> = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
};

/**
 * Shared layout wrapper — the single source of the container + gutter rules
 * used across Section, Footer, CTA, templates…
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className, as, size = "xl", gutters = true, ...props }, ref) => {
    const Tag = (as ?? "div") as ElementType;
    return (
      <Tag
        ref={ref as never}
        className={cn(
          "mx-auto w-full",
          size !== "full" && sizes[size],
          gutters && "px-5 sm:px-8",
          className,
        )}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

const gaps: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
};

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  horizontal?: boolean;
}

/** Vertical (or horizontal) rhythm helper using flex gaps. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 4, horizontal = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        horizontal ? "flex-row flex-wrap items-center" : "flex-col",
        gaps[gap],
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";