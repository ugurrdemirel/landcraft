import type { HTMLAttributes, ReactNode } from "react";

/** Layout options — arrangement only. Emphasis tone is the `background` prop. */
export type CTAOption = "panel" | "surface";

export interface CTAProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  option?: CTAOption;
  align?: "left" | "center";
  /**
   * Overrides the emphasis (`panel`) surface with any CSS color; the text color
   * is derived for contrast via CSS `contrast-color()`. Ignored by `surface`,
   * which sits on the page background.
   */
  background?: string;
}
