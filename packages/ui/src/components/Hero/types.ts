import type { HTMLAttributes, ReactNode } from "react";

export type HeroVariant = "split" | "centered" | "statement";

export interface HeroMeta {
  label: string;
  icon?: ReactNode;
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: HeroVariant;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  media?: ReactNode;
  /** Small trust/status row shown under the copy or CTAs. */
  meta?: HeroMeta[];
}