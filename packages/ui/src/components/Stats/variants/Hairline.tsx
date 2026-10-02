import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, gridCols, gridDivider, DeltaMark } from "../parts";
import type { Stat } from "../types";

interface HairlineProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

/** hairline — centered numerals in a symmetric run, divided by true vertical hairlines. */
export const StatsHairline = forwardRef<HTMLDListElement, HairlineProps>(
  ({ className, stats, columns = 4, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn("grid grid-cols-1 gap-y-10", gridCols[columns], gridDivider[columns], className)}
      {...props}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-2.5 border-border text-center sm:px-6"
        >
          <dd
            className={cn(
              valueBase,
              "text-4xl sm:text-5xl",
              stat.accent ? "text-primary" : undefined,
            )}
          >
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          <dt className="text-sm leading-5 text-muted-foreground">{stat.label}</dt>
          {typeof stat.delta === "number" ? (
            <DeltaMark delta={stat.delta} className="mt-0.5" />
          ) : null}
          {stat.sub ? (
            <p className="mt-1 max-w-[22ch] text-[13px] leading-5 text-muted-foreground">
              {stat.sub}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatsHairline.displayName = "StatsHairline";
