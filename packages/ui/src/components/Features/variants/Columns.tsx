import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { FeatureCard } from "../FeatureCard";
import { gridCols } from "../parts";
import type { FeatureItem } from "../types";

interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  features: FeatureItem[];
  columns: 2 | 3 | 4;
}

export const FeatureColumns = forwardRef<HTMLDivElement, ColumnsProps>(
  ({ className, features, columns, ...props }, ref) => (
    <div ref={ref} className={cn("grid w-full grid-cols-1 gap-4", gridCols[columns], className)} {...props}>
      {features.map((feature, i) => (
        <FeatureCard key={i} {...feature} className="h-full" />
      ))}
    </div>
  ),
);
FeatureColumns.displayName = "FeatureColumns";