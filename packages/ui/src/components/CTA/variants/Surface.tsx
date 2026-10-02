import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { CTAActions, ctaDescriptionBase, ctaTitleBase } from "../parts";
import type { CTAProps } from "../types";

/** surface — quiet paper band: hairline rule, display type, actions on the right. */
export const CTASurface = forwardRef<HTMLElement, CTAProps>(
  (
    { className, title, description, action, secondaryAction, align = "left", background, id, ...props },
    ref,
  ) => (
    <section ref={ref} id={id} className={cn("w-full", className)} {...props}>
      <Container className="py-20 sm:py-24">
        <div
          className={cn(
            "flex flex-col gap-10 border-t border-border pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-16",
            align === "center" && "items-center text-center sm:flex-col sm:items-center",
          )}
        >
          <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
            <h2 className={cn(ctaTitleBase, "text-foreground")}>{title}</h2>
            {description ? (
              <p
                className={cn(
                  ctaDescriptionBase,
                  "text-muted-foreground",
                  align === "center" && "mx-auto",
                )}
              >
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
