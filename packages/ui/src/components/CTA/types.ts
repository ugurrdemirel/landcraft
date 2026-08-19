import type { HTMLAttributes, ReactNode } from "react";

export type CTAOption = "panel" | "surface" | "inverse";

export interface CTAProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  option?: CTAOption;
  align?: "left" | "center";
}