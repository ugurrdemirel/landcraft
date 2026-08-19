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
  onSelect,
  ...props
}: PricingProps) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(defaultBilling);

  if (option === "compact") {
    return <PricingCompact className={className} plans={plans} billing={billing} onSelect={onSelect} {...props} />;
  }

  if (option === "bento") {
    return <PricingBento className={className} plans={plans} billing={billing} onSelect={onSelect} {...props} />;
  }

  return (
    <PricingCards
      className={className}
      plans={plans}
      billing={billing}
      onSelect={onSelect}
      onBillingChange={setBilling}
      {...props}
    />
  );
};
Pricing.displayName = "Pricing";