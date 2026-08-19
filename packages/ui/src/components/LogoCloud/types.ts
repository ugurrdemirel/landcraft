import type { HTMLAttributes } from "react";

export type LogoCloudOption = "quiet" | "marquee" | "strip";

export interface LogoItem {
  name: string;
  src?: string;
  href?: string;
}

export interface LogoCloudProps extends HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  title?: string;
  /** Visual option: quiet list · infinite marquee · hairline strip */
  option?: LogoCloudOption;
}