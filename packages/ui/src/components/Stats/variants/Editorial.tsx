import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols, DeltaBadge } from "../parts";
import type { Stat } from "../types";

interface EditorialProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

/** editorial — label above, oversized number, hairline rule under. */
export const StatsEditorial = forwardRef<HTMLDListElement, EditorialProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl ref={ref} className={cn("grid grid-cols-1 gap-x-10 gap-y-12", gridCols[columns], className)} {...props}>
      {stats.map((stat) => (
        <div key={stat.label} className="border-t border-border pt-6">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </dt>
            {typeof stat.delta === "number" ? <DeltaBadge delta={stat.delta} /> : null}
          </div>
          <dd
            className={cn(
              valueBase,
              "mt-4 text-5xl sm:text-6xl",
              stat.accent ? "text-primary" : undefined,
            )}
          >
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          {stat.sub ? (
            <p className="mt-3 max-w-xs text-[13px] leading-5 text-muted-foreground">{stat.sub}</p>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatsEditorial.displayName = "StatsEditorial";