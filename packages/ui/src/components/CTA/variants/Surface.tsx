import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { CTAActions } from "../parts";
import type { CTAProps } from "../types";

/** surface — quiet paper band: hairline rule, big display type, actions right. */
export const CTASurface = forwardRef<HTMLElement, CTAProps>(
  ({ className, title, description, action, secondaryAction, align = "left", id, ...props }, ref) => (
    <section ref={ref} id={id} className={cn("w-full", className)} {...props}>
      <Container className="py-20 sm:py-24">
        <div
          className={cn(
            "flex flex-col gap-10 border-t border-border pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-16",
            align === "center" && "items-center text-center sm:flex-col sm:items-center",
          )}
        >
          <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
            <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] text-balance text-foreground sm:text-6xl">
              {title}
            </h2>
            {description ? (
              <p className={cn("mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg", align === "center" && "mx-auto")}>
                {description}
              </p>
            ) : null}
          </div>
          <CTAActions action={action} secondaryAction={secondaryAction} align={align} />
        </div>
      </Container>
    </section>
  ),
);
CTASurface.displayName = "CTASurface";