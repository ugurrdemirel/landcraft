import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { CTAActions } from "../parts";
import type { CTAProps } from "../types";

/** panel — brand gradient panel, rounded corners. */
export const CTAPanel = forwardRef<HTMLElement, CTAProps>(
  ({ className, title, description, action, secondaryAction, align = "left", id, ...props }, ref) => {
    return (
      <section ref={ref} id={id} className={cn("w-full py-6 pb-20", className)} {...props}>
        <Container>
          <div
            className="relative overflow-hidden rounded-[1.75rem] px-7 py-14 sm:px-14 sm:py-20"
            style={{
              background:
                "radial-gradient(120% 160% at 0% 0%, rgb(var(--color-primary)), rgb(var(--color-primary-hover)) 55%, rgb(var(--color-primary) / 0.85))",
              color: "contrast-color(rgb(var(--color-primary)))",
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: "rgb(var(--color-accent))", opacity: 0.35, filter: "blur(60px)" }}
            />
            <div
              className={cn(
                "relative flex flex-col gap-9",
                align === "center" ? "items-center text-center" : "items-start",
              )}
            >
              <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
                <h2 className="font-display text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                  {title}
                </h2>
                {description ? (
                  <p
                    className={cn(
                      "mt-4 text-pretty text-base leading-7 sm:text-lg",
                      align === "center" && "mx-auto max-w-xl",
                    )}
                  >
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
CTAPanel.displayName = "CTAPanel";