import { cn } from "../../utils/cn";
import { ArrowRight } from "../../icons";
import type { FeatureShowcaseProps } from "./types";

export const FeatureShowcase = ({
  className,
  items,
  visual,
  mediaSide = "left",
  eyebrow,
  title,
  description,
  ...props
}: FeatureShowcaseProps) => {
  const mediaLeft = mediaSide === "left";

  return (
    <div className={cn("w-full", className)} {...props}>
      {eyebrow || title || description ? (
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className="mt-4 font-display text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-12 grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {visual ? (
          <div className={cn("relative", mediaLeft ? "lg:order-1" : "lg:order-2")}>{visual}</div>
        ) : null}

        <div
          className={cn(
            "flex flex-col divide-y divide-border",
            mediaLeft ? "lg:order-2" : "lg:order-1",
          )}
        >
          {items.map((item, index) => (
            <div key={index} className="flex gap-5 py-7 first:pt-0 last:pb-0 sm:gap-6">
              {item.icon ? (
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-lg text-foreground shadow-soft">
                  {item.icon}
                </div>
              ) : null}
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground sm:text-[15px]">
                    {item.description}
                  </p>
                ) : null}
                {item.link ? (
                  <div className="mt-3">{item.link}</div>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.linkLabel ?? "Learn more"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
FeatureShowcase.displayName = "FeatureShowcase";
