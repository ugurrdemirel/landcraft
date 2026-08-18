import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { getContrastText } from "../utils/contrast";

export interface FeatureItem {
  icon?: ReactNode;
  title: string;
  description?: string;
  accent?: string;
}

export interface FeatureCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Arbitrary CSS color for the icon chip; glyph color computed for contrast. */
  accent?: string;
  large?: boolean;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, accent, large = false, ...props }, ref) => {
    const chipStyle = accent
      ? { backgroundColor: accent, color: getContrastText(accent, "#111111", "#ffffff") }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-foreground/15",
          className,
        )}
        {...props}
      >
        {icon ? (
          <div
            className={cn(
              "mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[1.05rem]",
              !accent && "bg-primary-soft text-primary",
            )}
            style={chipStyle}
          >
            {icon}
          </div>
        ) : null}
        <h3 className={cn("font-display font-semibold tracking-tight text-foreground", large ? "text-2xl" : "text-lg")}>
          {title}
        </h3>
        {description ? (
          <p className={cn("mt-2.5 text-pretty leading-relaxed text-muted-foreground", large ? "text-[15px]" : "text-sm")}>
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";

export interface FeatureGridProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  features: FeatureItem[];
  option?: "columns" | "bento" | "editorialRows";
  columns?: 2 | 3 | 4;
}

const gridCols: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Asymmetric bento layout for up to 6 features. */
const bentoSpans: string[] = [
  "sm:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "lg:col-span-2",
];

export const FeatureGrid = forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ className, features, option = "columns", columns = 3, ...props }, ref) => {
    if (option === "editorialRows") {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <div className="divide-y divide-border border-t border-b border-border">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group flex flex-col gap-3 py-6 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className="text-sm font-medium tabular-nums text-muted-foreground/60 sm:w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-10">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:w-2/5">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground sm:mt-0 sm:w-1/2">
                    {feature.description}
                  </p>
                </div>
                {feature.icon ? (
                  <span className="hidden text-foreground/30 sm:inline-flex">{feature.icon}</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (option === "bento") {
      return (
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(9rem,auto)]",
            className,
          )}
          {...props}
        >
          {features.map((feature, i) =>
            feature ? (
              <div key={i} className={cn(i < bentoSpans.length && bentoSpans[i])}>
                <FeatureCard {...feature} large={i === 0} className="h-full" />
              </div>
            ) : null,
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-4",
          gridCols[columns],
          className,
        )}
        {...props}
      >
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} className="h-full" />
        ))}
      </div>
    );
  },
);
FeatureGrid.displayName = "FeatureGrid";