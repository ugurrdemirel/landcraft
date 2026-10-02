import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols, DeltaMark } from "../parts";
import type { Stat } from "../types";

interface CellsProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

/**
 * cells — one framed spec matrix. Cells are divided by real hairlines (the grid
 * gaps show the shared border color), so the group reads as a single panel
 * instead of a row of detached cards.
 */
export const StatsCells = forwardRef<HTMLDListElement, CellsProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border",
        gridCols[columns],
        className,
      )}
      {...props}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-h-[8rem] flex-col justify-between gap-8 bg-surface p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <dt className="text-sm leading-5 text-muted-foreground">{stat.label}</dt>
            {stat.icon ? <span className="shrink-0 text-foreground/45">{stat.icon}</span> : null}
          </div>
          <div>
            <dd
              className={cn(
                valueBase,
                "text-4xl",
                stat.accent ? "text-primary" : undefined,
              )}
            >
              {stat.value}
              {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
            </dd>
            {typeof stat.delta === "number" || stat.sub ? (
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {typeof stat.delta === "number" ? <DeltaMark delta={stat.delta} /> : null}
                {stat.sub ? (
                  <p className="text-[13px] leading-5 text-muted-foreground">{stat.sub}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </dl>
  ),
);
StatsCells.displayName = "StatsCells";
