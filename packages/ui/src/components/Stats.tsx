import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { ArrowUp, ArrowDown } from "../icons";

export interface Stat {
  value: string;
  label: string;
  /** Small unit rendered inline with the value, e.g. "ms" or "₺". */
  suffix?: string;
  /** Trend change in percent — renders an up/down badge. */
  delta?: number;
  /** Optional supporting copy. */
  sub?: string;
  icon?: ReactNode;
  /** Highlights the value with the primary token. */
  accent?: boolean;
}

export interface StatsProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  option?: "editorial" | "hairline" | "cells" | "ticker";
  columns?: 2 | 3 | 4;
}

const valueBase =
  "font-display font-semibold tabular-nums tracking-[-0.02em] text-foreground";

const suffixBase = "ml-1 font-sans text-sm font-normal tracking-normal text-muted-foreground";

const gridCols: Record<NonNullable<StatsProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function DeltaBadge({ delta }: { delta: number }) {
  const isUp = delta >= 0;
  const Icon = isUp ? ArrowUp : ArrowDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
        isUp ? "bg-accent/10 text-accent" : "bg-danger-soft text-danger",
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}%
    </span>
  );
}

export const Stats = forwardRef<HTMLDListElement, StatsProps>(
  ({ className, stats, option = "editorial", columns = 4, ...props }, ref) => {
    if (option === "ticker") {
      return (
        <dl
          ref={ref}
          className={cn(
            "flex w-full items-stretch overflow-x-auto rounded-2xl border border-border bg-surface",
            className,
          )}
          {...props}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex min-w-[11rem] flex-1 flex-col gap-3 p-6",
                i > 0 && "border-l border-border",
              )}
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
      );
    }

    if (option === "cells") {
      return (
        <dl
          ref={ref}
          className={cn("grid grid-cols-1 gap-4", gridCols[columns], className)}
          {...props}
        >
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
      );
    }

    if (option === "hairline") {
      return (
        <dl
          ref={ref}
          className={cn("grid grid-cols-1 gap-y-10", gridCols[columns], className)}
          {...props}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center",
                columns > 1 && i > 0 && "sm:border-l sm:border-border",
              )}
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
      );
    }

    // editorial — label above, oversized number, hairline rule under.
    return (
      <dl
        ref={ref}
        className={cn("grid grid-cols-1 gap-x-10 gap-y-12", gridCols[columns], className)}
        {...props}
      >
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
    );
  },
);
Stats.displayName = "Stats";