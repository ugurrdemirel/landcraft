import type { HTMLAttributes, ReactNode } from "react";

export type StatsOption = "editorial" | "hairline" | "cells" | "ticker";

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
  option?: StatsOption;
  columns?: 2 | 3 | 4;
}