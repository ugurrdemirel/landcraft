import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols } from "../parts";
import type { Stat } from "../types";

interface HairlineProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export const StatsHairline = forwardRef<HTMLDListElement, HairlineProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl ref={ref} className={cn("grid grid-cols-1 gap-y-10", gridCols[columns], className)} {...props}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn("text-center", columns > 1 && i > 0 && "sm:border-l sm:border-border")}
        >
          <dd className={cn(valueBase, "text-5xl", stat.accent ? "text-primary" : undefined)}>
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  ),
);
StatsHairline.displayName = "StatsHairline";