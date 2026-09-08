import type { HTMLAttributes, ReactNode } from "react";

export type HeroVariant = "split" | "centered" | "statement" | "parallax";

export interface HeroMeta {
  label: string;
  icon?: ReactNode;
}

/** A floating logo tile for the `parallax` hero variant. */
export interface HeroLogo {
  /** Accessible name for the tile (used for the label/aria). */
  label: string;
  /** Logo/icon node rendered inside the tile. */
  icon: ReactNode;
  /** Horizontal position as a percentage (0–100) of the hero width. */
  x: number;
  /** Vertical position as a percentage (0–100) of the hero height. */
  y: number;
  /** Parallax travel in px per unit of mouse offset. Higher moves more. */
  depth?: number;
  /** Optional icon accent color. */
  accent?: string;
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
  /** Floating logo tiles with a mouse parallax effect (`parallax` variant). */
  logos?: HeroLogo[];
}