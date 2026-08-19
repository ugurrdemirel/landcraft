import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { FeatureCard } from "../FeatureCard";
import { bentoSpans } from "../parts";
import type { FeatureItem } from "../types";

interface BentoProps extends HTMLAttributes<HTMLDivElement> {
  features: FeatureItem[];
}

export const FeatureBento = forwardRef<HTMLDivElement, BentoProps>(
  ({ className, features, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(9rem,auto)]",
        "w-full",
        className,
      )}
      {...props}
    >
      {features.map((feature, i) =>
        feature ? (
          <div key={i} className={cn(i < bentoSpans.length && bentoSpans[i])}>
            <FeatureCard {...feature} large={i === 0} className="h-full" />
          </div>
        ) : null,
      )}
    </div>
  ),
);
FeatureBento.displayName = "FeatureBento";