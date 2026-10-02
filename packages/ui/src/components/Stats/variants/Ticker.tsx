import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, DeltaMark } from "../parts";
import type { Stat } from "../types";

interface TickerProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
}

/**
 * ticker — one horizontal readout band. Edge-to-edge top and bottom rules with
 * hairline dividers between entries; stacks into a ruled list on small screens.
 */
export const StatsTicker = forwardRef<HTMLDListElement, TickerProps>(
  ({ className, stats, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn(
        "flex flex-col divide-y divide-border border-y border-border sm:flex-row sm:divide-x sm:divide-y-0",
        className,
      )}
      {...props}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-w-0 flex-1 flex-col gap-2.5 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
        >
          <dt className="text-sm leading-5 text-muted-foreground">{stat.label}</dt>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <dd
              className={cn(
                valueBase,
                "text-3xl",
                stat.accent ? "text-primary" : undefined,
              )}
            >
              {stat.value}
              {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
            </dd>
            {typeof stat.delta === "number" ? <DeltaMark delta={stat.delta} /> : null}
          </div>
          {stat.sub ? (
            <p className="max-w-[32ch] text-[13px] leading-5 text-muted-foreground">{stat.sub}</p>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatsTicker.displayName = "StatsTicker";
