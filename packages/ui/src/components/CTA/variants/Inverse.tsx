import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { CTAActions } from "../parts";
import type { CTAProps } from "../types";

/** inverse — ink panel with a wide left-aligned split. */
export const CTAInverse = forwardRef<HTMLElement, CTAProps>(
  ({ className, title, description, action, secondaryAction, align = "left", id, ...props }, ref) => {
    return (
      <section ref={ref} id={id} className={cn("w-full py-6 pb-20", className)} {...props}>
        <Container>
          <div
            className="relative overflow-hidden rounded-[1.75rem] px-7 py-16 sm:px-16 sm:py-20"
            style={{
              backgroundColor: "rgb(var(--color-secondary))",
              color: "contrast-color(rgb(var(--color-secondary)))",
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.09] mix-blend-overlay" />
            <div
              className={cn(
                "relative flex flex-col items-start gap-10",
                align === "center" && "items-center text-center",
                "lg:flex-row lg:items-end lg:justify-between",
              )}
            >
              <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
                <h2 className="font-display text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                  {title}
                </h2>
                {description ? (
                  <p className={cn("mt-5 max-w-xl text-pretty text-base leading-7 sm:text-lg", align === "center" && "mx-auto")}>
                    {description}
                  </p>
                ) : null}
              </div>
              <CTAActions action={action} secondaryAction={secondaryAction} align={align} />
            </div>
          </div>
        </Container>
      </section>
    );
  },
);
CTAInverse.displayName = "CTAInverse";