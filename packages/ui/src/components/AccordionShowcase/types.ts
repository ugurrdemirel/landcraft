import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionShowcaseItem {
  /** Accordion heading, e.g. an integration or product name. */
  title: string;
  /** Expandable copy shown when the item is active. */
  description?: ReactNode;
  /** Artwork swapped in on the right when the item is active. */
  visual: ReactNode;
}

export interface AccordionShowcaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  items: AccordionShowcaseItem[];
  /** Index opened on first render. */
  defaultActive?: number;
}
