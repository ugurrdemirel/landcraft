import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols, DeltaMark } from "../parts";
import type { Stat } from "../types";

interface StackedProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

/** stacked — a ruled ledger: label on the rule, oversized numeral, typed meta. */
export const StatsStacked = forwardRef<HTMLDListElement, StackedProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn("grid grid-cols-1 gap-x-10 gap-y-10", gridCols[columns], className)}
      {...props}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="border-t border-border pt-5">
          <dt className="text-sm leading-5 text-muted-foreground">{stat.label}</dt>
          <dd
            className={cn(
              valueBase,
              "mt-3 text-5xl sm:text-6xl",
              stat.accent ? "text-primary" : undefined,
            )}
          >
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          {typeof stat.delta === "number" || stat.sub ? (
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {typeof stat.delta === "number" ? <DeltaMark delta={stat.delta} /> : null}
              {stat.sub ? (
                <p className="text-[13px] leading-5 text-muted-foreground">{stat.sub}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatsStacked.displayName = "StatsStacked";
