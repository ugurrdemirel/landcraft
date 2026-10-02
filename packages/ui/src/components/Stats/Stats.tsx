import { forwardRef } from "react";
import type { StatsProps } from "./types";
import { StatsStacked } from "./variants/Stacked";
import { StatsDivided } from "./variants/Divided";
import { StatsCells } from "./variants/Cells";
import { StatsTicker } from "./variants/Ticker";

export const Stats = forwardRef<HTMLDListElement, StatsProps>(
  ({ option = "stacked", ...props }, ref) => {
    if (option === "ticker") return <StatsTicker ref={ref} {...props} />;
    if (option === "cells") return <StatsCells ref={ref} {...props} />;
    if (option === "divided") return <StatsDivided ref={ref} {...props} />;
    return <StatsStacked ref={ref} {...props} />;
  },
);
Stats.displayName = "Stats";
