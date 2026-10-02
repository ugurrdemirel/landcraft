import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { emphasisSurfaceStyle } from "../../../utils/surface";
import { CTAActions, ctaDescriptionBase, ctaTitleBase } from "../parts";
import type { CTAProps } from "../types";

/**
 * panel — brand emphasis panel: a gradient derived from `--color-primary`,
 * with a shared grain texture. Passing `background` replaces the gradient with
 * a custom color while keeping the contrast behavior.
 */
export const CTAPanel = forwardRef<HTMLElement, CTAProps>(
  (
    { className, title, description, action, secondaryAction, align = "left", background, id, ...props },
    ref,
  ) => {
    return (
      <section ref={ref} id={id} className={cn("w-full py-6 pb-20", className)} {...props}>
        <Container>
          <div
            className="relative overflow-hidden rounded-[1.75rem] px-7 py-14 sm:px-14 sm:py-20"
            style={emphasisSurfaceStyle(background)}
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
                <h2 className={ctaTitleBase}>{title}</h2>
                {description ? (
                  <p
                    className={cn(
                      ctaDescriptionBase,
                      align === "center" && "mx-auto",
                    )}
                  >
                    {description}
                  </p>
                ) : null}
              </div>
              <CTAActions action={action} secondaryAction={secondaryAction} align={align} emphasis />
            </div>
          </div>
        </Container>
      </section>
    );
  },
);
CTAPanel.displayName = "CTAPanel";
