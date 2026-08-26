import type { HTMLAttributes, ReactNode } from "react";

export interface FeatureShowcaseItem {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** When set (and no `link` slot), a "Learn more"-style link is rendered. */
  href?: string;
  linkLabel?: ReactNode;
  /**
   * Slot for a fully custom link (router `<Link>`, anchor…) rendered as-is.
   * Takes precedence over `href`.
   */
  link?: ReactNode;
}

export type FeatureShowcaseMediaSide = "left" | "right";

export interface FeatureShowcaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  items: FeatureShowcaseItem[];
  /** Large control-panel / product screenshot. */
  visual?: ReactNode;
  /** Which side the visual sits on. Items sit opposite. Default: `"left"`. */
  mediaSide?: FeatureShowcaseMediaSide;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}
