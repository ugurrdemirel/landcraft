import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { getContrastText } from "../../utils/contrast";
import type { FeatureCardProps } from "./types";

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, accent, large = false, ...props }, ref) => {
    const chipStyle = accent
      ? { backgroundColor: accent, color: getContrastText(accent, "#111111", "#ffffff") }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-foreground/15",
          className,
        )}
        {...props}
      >
        {icon ? (
          <div
            className={cn(
              "mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[1.05rem]",
              !accent && "bg-primary-soft text-primary",
            )}
            style={chipStyle}
          >
            {icon}
          </div>
        ) : null}
        <h3 className={cn("font-display font-semibold tracking-tight text-foreground", large ? "text-2xl" : "text-lg")}>
          {title}
        </h3>
        {description ? (
          <p className={cn("mt-2.5 text-pretty leading-relaxed text-muted-foreground", large ? "text-[15px]" : "text-sm")}>
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";