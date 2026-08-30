import { cn } from "../../../utils/cn";
import { getContrastText } from "../../../utils/contrast";
import { PriceValue, BillingToggle, PlanButton } from "../parts";
import { Check } from "../../../icons";
import type { PricingVariantProps } from "../types";

interface CardsProps extends PricingVariantProps {
  className?: string;
}

export const PricingCards = ({ className, plans, billing, onBillingChange, onSelect, yearlyBadge, ...props }: CardsProps) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <BillingToggle billing={billing} onChange={onBillingChange} yearlyBadge={yearlyBadge} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                "relative flex flex-col rounded-xl p-7",
                bg ? "shadow-raised" : "border border-border bg-surface",
                !bg && isHighlighted && "border-primary",
              )}
              style={bg ? { backgroundColor: bg, color: fg } : undefined}
            >
              {isHighlighted ? (
                <span
                  className={cn(
                    "absolute -top-3 left-7 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                    !bg && "bg-primary text-on-primary",
                  )}
                  style={
                    bg
                      ? { backgroundColor: "rgb(var(--color-on-primary))", color: "rgb(var(--color-primary))" }
                      : undefined
                  }
                >
                  Most popular
                </span>
              ) : null}
              <h3 className={cn("font-display text-lg font-semibold tracking-tight", bg ? "text-current" : "text-foreground")}>
                {plan.name}
              </h3>
              {plan.description ? (
                <p className={cn("mt-1.5 text-sm", bg ? undefined : "text-muted-foreground")}>
                  {plan.description}
                </p>
              ) : null}
              <div className={cn("mt-6 flex items-baseline font-display", bg ? "text-current" : "text-foreground")}>
                <PriceValue value={billing === "monthly" ? plan.monthly : plan.yearly} billing={billing} dim={!bg} />
              </div>
              <ul className={cn("mt-7 flex-1 space-y-2.5 text-sm", bg ? "text-current" : "text-muted-foreground")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
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
PricingCards.displayName = "PricingCards";