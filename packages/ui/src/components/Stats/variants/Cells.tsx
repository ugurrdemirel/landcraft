import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols } from "../parts";
import type { Stat } from "../types";

interface CellsProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export const StatsCells = forwardRef<HTMLDListElement, CellsProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl ref={ref} className={cn("grid grid-cols-1 gap-4", gridCols[columns], className)} {...props}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-h-[8.5rem] flex-col justify-between rounded-xl border border-border bg-surface p-6"
        >
          <dd className={cn(valueBase, "text-3xl", stat.accent ? "text-primary" : undefined)}>
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          <div className="mt-5 flex items-center justify-between gap-3">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            {stat.icon ? (
              <span className="text-foreground/30">{stat.icon}</span>
            ) : null}
          </div>
        </div>
      ))}
    </dl>
  ),
);
StatsCells.displayName = "StatsCells";