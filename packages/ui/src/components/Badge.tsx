import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { getContrastText } from "../utils/contrast";

export type BadgeVariant = "solid" | "soft" | "outline" | "dot";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  /** Paints the chip with an arbitrary CSS color; text color is computed for contrast. */
  customColor?: string;
}

const base =
  "inline-flex items-center rounded-full font-medium tracking-tight transition-colors duration-200";

const sizes: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-[13px] gap-1.5",
};

const variants: Record<BadgeVariant, string> = {
  solid: "bg-primary text-on-primary",
  soft: "bg-primary-soft text-primary",
  outline: "text-muted-foreground ring-1 ring-inset ring-border",
  dot: "text-foreground ring-1 ring-inset ring-border bg-surface",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "soft", size = "md", icon, customColor, style, children, ...props },
    ref,
  ) => {
    const customStyle = customColor
      ? { ...style, backgroundColor: customColor, color: getContrastText(customColor, "#111111", "#ffffff") }
      : style;

    return (
      <span
        ref={ref}
        style={customStyle}
        className={cn(
          base,
          sizes[size],
          customColor ? undefined : variants[variant],
          className,
        )}
        {...props}
      >
        {variant === "dot" ? (
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              customColor ? "currentColor" : "bg-primary",
            )}
            style={customColor ? { backgroundColor: customColor } : undefined}
          />
        ) : null}
        {icon ? <span className="shrink-0 opacity-70">{icon}</span> : null}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";