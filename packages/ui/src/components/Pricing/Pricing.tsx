"use client";
import { useState } from "react";
import type { PricingProps } from "./types";
import { PricingCards } from "./variants/Cards";
import { PricingBento } from "./variants/Bento";
import { PricingCompact } from "./variants/Compact";

export const Pricing = ({
  className,
  plans,
  option = "cards",
  defaultBilling = "monthly",
  yearlyBadge,
  onSelect,
  ...props
}: PricingProps) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(defaultBilling);

  if (option === "compact") {
    return (
      <PricingCompact
        className={className}
        plans={plans}
        billing={billing}
        onBillingChange={setBilling}
        yearlyBadge={yearlyBadge}
        onSelect={onSelect}
        {...props}
      />
    );
  }

  if (option === "bento") {
    return (
      <PricingBento
        className={className}
        plans={plans}
        billing={billing}
        onBillingChange={setBilling}
        yearlyBadge={yearlyBadge}
        onSelect={onSelect}
        {...props}
      />
    );
  }

  return (
    <PricingCards
      className={className}
      plans={plans}
      billing={billing}
      onSelect={onSelect}
      onBillingChange={setBilling}
      yearlyBadge={yearlyBadge}
      {...props}
    />
  );
};
Pricing.displayName = "Pricing";