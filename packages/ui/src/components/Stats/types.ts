import type { HTMLAttributes, ReactNode } from "react";

/** Layout options — arrangement only. */
export type StatsOption = "stacked" | "divided" | "cells" | "ticker";

export interface Stat {
  value: string;
  label: string;
  /** Small unit rendered inline with the value, e.g. "ms" or "₺". */
  suffix?: string;
  /** Trend change in percent — renders a directional delta mark. */
  delta?: number;
  /** Optional supporting copy. */
  sub?: string;
  icon?: ReactNode;
  /** Highlights the value with the primary token. */
  accent?: boolean;
}

export interface StatsProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  option?: StatsOption;
  columns?: 2 | 3 | 4;
}