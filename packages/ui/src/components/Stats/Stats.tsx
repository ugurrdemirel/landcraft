import { forwardRef } from "react";
import type { StatsProps } from "./types";
import { StatsEditorial } from "./variants/Editorial";
import { StatsHairline } from "./variants/Hairline";
import { StatsCells } from "./variants/Cells";
import { StatsTicker } from "./variants/Ticker";

export const Stats = forwardRef<HTMLDListElement, StatsProps>(
  ({ option = "editorial", ...props }, ref) => {
    if (option === "ticker") return <StatsTicker ref={ref} {...props} />;
    if (option === "cells") return <StatsCells ref={ref} {...props} />;
    if (option === "hairline") return <StatsHairline ref={ref} {...props} />;
    return <StatsEditorial ref={ref} {...props} />;
  },
);
Stats.displayName = "Stats";