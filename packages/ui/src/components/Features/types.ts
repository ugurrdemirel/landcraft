import type { HTMLAttributes, ReactNode } from "react";

export type FeatureGridOption = "columns" | "bento" | "editorialRows";

export interface FeatureItem {
  icon?: ReactNode;
  title: string;
  description?: string;
  accent?: string;
}

export interface FeatureCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Arbitrary CSS color for the icon chip; glyph color computed for contrast. */
  accent?: string;
  large?: boolean;
}

export interface FeatureGridProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  features: FeatureItem[];
  option?: FeatureGridOption;
  columns?: 2 | 3 | 4;
}