import { cn } from "../../../utils/cn";
import { getContrastText } from "../../../utils/contrast";
import { PriceValue, BillingToggle, PlanButton } from "../parts";
import { Check } from "../../../icons";
import type { PricingVariantProps } from "../types";

interface BentoProps extends PricingVariantProps {
  className?: string;
}

export const PricingBento = ({ className, plans, billing, onBillingChange, onSelect, yearlyBadge, ...props }: BentoProps) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <BillingToggle billing={billing} onChange={onBillingChange} yearlyBadge={yearlyBadge} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {plans.map((plan) => {
          const isHighlighted = plan.highlighted && !plan.customColor;
          const bg = plan.customColor || (isHighlighted ? "rgb(var(--color-primary))" : undefined);
          const fg = plan.customColor
            ? getContrastText(plan.customColor, "#111111", "#ffffff")
            : isHighlighted
              ? "rgb(var(--color-on-primary))"
              : undefined;
          return (
            <div
              key={plan.name}
              className={cn(
                "flex h-full flex-col rounded-xl p-8",
                bg
                  ? "lg:col-span-2"
                  : "border border-border bg-surface",
              )}
              style={bg ? { backgroundColor: bg, color: fg } : undefined}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className={cn("font-display text-xl font-semibold tracking-tight", bg ? "text-current" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  {plan.description ? (
                    <p className={cn("mt-1.5 text-sm", bg ? undefined : "text-muted-foreground")}>
                      {plan.description}
                    </p>
                  ) : null}
                </div>
                <div className={cn("shrink-0 font-display", bg ? "text-current" : "text-foreground")}>
                  <PriceValue value={billing === "monthly" ? plan.monthly : plan.yearly} billing={billing} dim={!bg} />
                </div>
              </div>
              <ul
                className={cn(
                  "mt-7 grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2",
                  bg ? "lg:max-w-2xl" : undefined,
                )}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className={cn("flex items-start gap-2.5", bg ? "text-current" : "text-muted-foreground")}>
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", bg ? "text-current" : "text-primary")} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PlanButton plan={plan} billing={billing} onSelect={onSelect} dark={!bg} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
PricingBento.displayName = "PricingBento";