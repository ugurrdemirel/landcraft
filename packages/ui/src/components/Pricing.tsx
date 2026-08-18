import { useState, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { getContrastText } from "../utils/contrast";
import { useTokenForeground } from "../utils/useTokenForeground";
import { ArrowRight, Check } from "../icons";

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
  option?: "cards" | "bento" | "compact";
  defaultBilling?: "monthly" | "yearly";
  onSelect?: (plan: Plan, billing: "monthly" | "yearly") => void;
}

function PriceValue({
  value,
  billing,
  dim,
}: {
  value: number | null;
  billing: "monthly" | "yearly";
  /** False when rendered on a colored background where opacity would kill contrast. */
  dim?: boolean;
}) {
  if (value === null) {
    return <span>Custom</span>;
  }
  return (
    <>
      <span className="text-[2.6rem] font-semibold tracking-tight sm:text-[3rem]">${value}</span>
      <span className={cn("text-sm font-normal", dim && "opacity-60")}>
        /{billing === "monthly" ? "mo" : "yr"}
      </span>
    </>
  );
}

function BillingToggle({
  billing,
  onChange,
  dark,
}: {
  billing: "monthly" | "yearly";
  onChange: (b: "monthly" | "yearly") => void;
  dark?: boolean;
}) {
  // The accent token is a background color, but its shipped "on-accent"
  // pairing isn't guaranteed to be contrast-safe (e.g. white on amber).
  // Derive the badge text color from the actual accent value instead.
  const accentText = useTokenForeground("--color-accent");
  return (
    <div className="mb-10 flex items-center justify-center gap-4">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          billing === "monthly" ? (dark ? "text-white" : "text-foreground") : "text-muted-foreground",
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={billing === "yearly"}
        aria-label="Billing period"
        onClick={() => onChange(billing === "monthly" ? "yearly" : "monthly")}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          billing === "yearly" ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
            billing === "yearly" ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
      <span
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors",
          billing === "yearly" ? (dark ? "text-white" : "text-foreground") : "text-muted-foreground",
        )}
      >
        Yearly
        <span
          className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold"
          style={{ color: accentText }}
        >
          −2 ay
        </span>
      </span>
    </div>
  );
}

export const Pricing = ({
  className,
  plans,
  option = "cards",
  defaultBilling = "monthly",
  onSelect,
  ...props
}: PricingProps) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">(defaultBilling);

  const price = (plan: Plan) => (billing === "monthly" ? plan.monthly : plan.yearly);
  const priceLabel = (v: number | null) => (v === null ? "Custom" : `$${v}`);

  const planButton = (plan: Plan, dark?: boolean) => {
    const isHighlighted = plan.highlighted && !plan.customColor;
    const fg = plan.customColor ? getContrastText(plan.customColor, "#111111", "#ffffff") : undefined;
    return (
      <button
        type="button"
        onClick={() => onSelect?.(plan, billing)}
        className={cn(
          "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isHighlighted || plan.customColor
            ? "hover:brightness-95"
            : dark
              ? "bg-white text-black hover:bg-white/90"
              : "border border-border text-foreground hover:bg-surface",
        )}
        style={
          plan.customColor
            ? { backgroundColor: plan.customColor, color: fg }
            : isHighlighted
              ? {
                  backgroundColor: "rgb(var(--color-primary))",
                  color: "rgb(var(--color-on-primary))",
                }
              : undefined
        }
      >
        {plan.cta || "Start"}
        <ArrowRight className="h-4 w-4 opacity-60" />
      </button>
    );
  };

  if (option === "compact") {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {plans.map((plan) => {
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
                    {priceLabel(price(plan))}
                    {price(plan) !== null ? (
                      <span className="text-sm font-normal text-muted-foreground">/{billing === "monthly" ? "mo" : "yr"}</span>
                    ) : null}
                  </div>
                  {planButton(plan)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (option === "bento") {
    return (
      <div className={cn("w-full", className)} {...props}>
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
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className={cn("font-display text-xl font-semibold tracking-tight", bg ? "text-current" : "text-foreground")}>
                      {plan.name}
                    </h3>
                    {plan.description ? (
                      <p className={cn("mt-1.5 text-sm", bg ? undefined : "text-muted-foreground")}>
                        {plan.description}
                      </p>
                    ) : null}
                  </div>
                  <div className={cn("font-display", bg ? "text-current" : "text-foreground")}>
                    <PriceValue value={price(plan)} billing={billing} dim={!bg} />
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
                <div className="mt-8">{planButton(plan, !bg)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <BillingToggle billing={billing} onChange={setBilling} />
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
                <PriceValue value={price(plan)} billing={billing} dim={!bg} />
              </div>
              <ul className={cn("mt-7 flex-1 space-y-2.5 text-sm", bg ? "text-current" : "text-muted-foreground")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", bg ? "text-current" : "text-primary")} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">{planButton(plan, !bg)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Pricing.displayName = "Pricing";