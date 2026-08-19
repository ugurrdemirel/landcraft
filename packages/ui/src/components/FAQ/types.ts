import type { HTMLAttributes, ReactNode } from "react";

export type FAQOption = "accordion" | "split" | "cards";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FAQProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  items: FaqItem[];
  option?: FAQOption;
  allowMultiple?: boolean;
  defaultOpen?: number[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}