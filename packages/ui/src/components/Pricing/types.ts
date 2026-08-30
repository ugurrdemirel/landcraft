import type { HTMLAttributes } from "react";

export type PricingOption = "cards" | "bento" | "compact";

export interface Plan {
  name: string;
  description?: string;
  monthly: number | null;
  yearly: number | null;
  features: string[];
  cta?: string;
  href?: string;
  highlighted?: boolean;
  customColor?: string;
}

export interface PricingProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  plans: Plan[];
  option?: PricingOption;
  defaultBilling?: "monthly" | "yearly";
  yearlyBadge?: string;
  onSelect?: (plan: Plan, billing: "monthly" | "yearly") => void;
}

export interface PricingVariantProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  plans: Plan[];
  billing: "monthly" | "yearly";
  onBillingChange: (billing: "monthly" | "yearly") => void;
  yearlyBadge?: string;
  onSelect?: (plan: Plan, billing: "monthly" | "yearly") => void;
}