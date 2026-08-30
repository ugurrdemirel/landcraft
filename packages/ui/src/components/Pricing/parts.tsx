import { cn } from "../../utils/cn";
import { ArrowRight } from "../../icons";
import type { Plan } from "./types";

export function PriceValue({
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

export function BillingToggle({
  billing,
  onChange,
  dark,
  yearlyBadge,
}: {
  billing: "monthly" | "yearly";
  onChange: (b: "monthly" | "yearly") => void;
  dark?: boolean;
  yearlyBadge?: string;
}) {
  // The accent token is a background color, but its shipped "on-accent"
  // pairing isn't guaranteed to be contrast-safe (e.g. white on amber).
  // Let CSS pick the readable text color from the actual accent value via
  // contrast-color(); it re-evaluates automatically when the token changes.
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
        {yearlyBadge ? (
          <span
            className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold"
            style={{ color: "contrast-color(rgb(var(--color-accent)))" }}
          >
            {yearlyBadge}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export function PlanButton({
  plan,
  billing,
  onSelect,
  dark,
}: {
  plan: Plan;
  billing: "monthly" | "yearly";
  onSelect?: (plan: Plan, billing: "monthly" | "yearly") => void;
  dark?: boolean;
}) {
  const isHighlighted = plan.highlighted && !plan.customColor;
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
          ? {
              backgroundColor: plan.customColor,
              color: `contrast-color(${plan.customColor})`,
            }
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
}