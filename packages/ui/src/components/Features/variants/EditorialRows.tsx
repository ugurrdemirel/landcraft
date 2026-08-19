import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import type { FeatureItem } from "../types";

interface EditorialRowsProps extends HTMLAttributes<HTMLDivElement> {
  features: FeatureItem[];
}

export const FeatureEditorialRows = forwardRef<HTMLDivElement, EditorialRowsProps>(
  ({ className, features, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <div className="divide-y divide-border border-t border-b border-border">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group flex flex-col gap-3 py-6 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-10"
          >
            <span className="text-sm font-medium tabular-nums text-muted-foreground/60 sm:w-12">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-10">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:w-2/5">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-7 text-muted-foreground sm:mt-0 sm:w-1/2">
                {feature.description}
              </p>
            </div>
            {feature.icon ? (
              <span className="hidden text-foreground/30 sm:inline-flex">{feature.icon}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  ),
);
FeatureEditorialRows.displayName = "FeatureEditorialRows";