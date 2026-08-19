import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { valueBase, suffixBase, DeltaBadge } from "../parts";
import type { Stat } from "../types";

interface TickerProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
}

export const StatsTicker = forwardRef<HTMLDListElement, TickerProps>(
  ({ className, stats, ...props }, ref) => (
    <dl ref={ref} className={cn("flex w-full items-stretch overflow-x-auto rounded-2xl border border-border bg-surface", className)} {...props}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn("flex min-w-[11rem] flex-1 flex-col gap-3 p-6", i > 0 && "border-l border-border")}
        >
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </dt>
            {typeof stat.delta === "number" ? <DeltaBadge delta={stat.delta} /> : null}
          </div>
          <dd className={cn(valueBase, "text-3xl", stat.accent ? "text-primary" : undefined)}>
            {stat.value}
            {stat.suffix ? <span className={suffixBase}>{stat.suffix}</span> : null}
          </dd>
          {stat.sub ? (
            <p className="text-[13px] leading-5 text-muted-foreground">{stat.sub}</p>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatsTicker.displayName = "StatsTicker";