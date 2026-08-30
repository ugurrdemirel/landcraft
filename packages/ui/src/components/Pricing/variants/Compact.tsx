import { cn } from "../../../utils/cn";
import { BillingToggle, PlanButton } from "../parts";
import { Check } from "../../../icons";
import type { PricingVariantProps } from "../types";

interface CompactProps extends PricingVariantProps {
  className?: string;
}

export const PricingCompact = ({ className, plans, billing, onBillingChange, onSelect, yearlyBadge, ...props }: CompactProps) => {
  const price = (v: number | null) => (v === null ? "Custom" : `$${v}`);

  return (
    <div className={cn("w-full", className)} {...props}>
      <BillingToggle billing={billing} onChange={onBillingChange} yearlyBadge={yearlyBadge} />
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {plans.map((plan) => {
          const value = billing === "monthly" ? plan.monthly : plan.yearly;
          const isHighlighted = plan.highlighted && !plan.customColor;
          const bg = plan.customColor ? "rgb(var(--color-surface))" : isHighlighted ? "rgb(var(--color-primary-soft))" : undefined;
          const fg = plan.customColor ? plan.customColor : isHighlighted ? "rgb(var(--color-primary))" : undefined;
          return (
            <div
              key={plan.name}
              className={cn(
                "group flex flex-col gap-5 p-5 transition-colors duration-200 hover:bg-surface-strong sm:flex-row sm:items-center sm:justify-between",
                isHighlighted && "bg-primary-soft/60",
              )}
              style={bg ? { backgroundColor: bg } : undefined}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  {isHighlighted ? (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-on-primary uppercase tracking-wider">
                      Popular
                    </span>
                  ) : null}
                </div>
                {plan.description ? (
                  <p className="mt-1 truncate text-sm text-muted-foreground">{plan.description}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-6">
                <ul className="hidden items-center gap-4 lg:flex">
                  {plan.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground" style={{ color: fg }}>
                      <Check className="h-3.5 w-3.5 text-current" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {price(value)}
                  {value !== null ? (
                    <span className="text-sm font-normal text-muted-foreground">/{billing === "monthly" ? "mo" : "yr"}</span>
                  ) : null}
                </div>
                <PlanButton plan={plan} billing={billing} onSelect={onSelect} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
PricingCompact.displayName = "PricingCompact";