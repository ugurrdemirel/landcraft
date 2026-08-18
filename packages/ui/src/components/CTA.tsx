import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useTokenForeground } from "../utils/useTokenForeground";
import { Container } from "./Container";

export interface CTAProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  option?: "panel" | "surface" | "inverse";
  align?: "left" | "center";
}

export const CTA = forwardRef<HTMLElement, CTAProps>(
  (
    { className, title, description, action, secondaryAction, option = "panel", align = "left", id, ...props },
    ref,
  ) => {
    const isPanel = option === "panel";
    const isInverse = option === "inverse";
    // panel → brand gradient; inverse → ink. Readable text must be derived from
    // the actual painting token so contrast survives any palette.
    const fg = useTokenForeground(isInverse ? "--color-secondary" : "--color-primary");

    /** surface — quiet paper band: hairline rule, big display type, actions right. */
    if (option === "surface") {
      return (
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
              <div
                className={cn(
                  "flex flex-wrap items-center gap-4",
                  align === "center" && "justify-center",
                )}
              >
                {action}
                {secondaryAction}
              </div>
            </div>
          </Container>
        </section>
      );
    }

    return (
      <section ref={ref} id={id} className={cn("w-full py-6 pb-20", className)} {...props}>
        <Container>
          {isPanel ? (
            <div
              className="relative overflow-hidden rounded-[1.75rem] px-7 py-14 sm:px-14 sm:py-20"
              style={{
                background:
                  "radial-gradient(120% 160% at 0% 0%, rgb(var(--color-primary)), rgb(var(--color-primary-hover)) 55%, rgb(var(--color-primary) / 0.85))",
                color: fg,
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
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-4",
                    align === "center" && "justify-center",
                  )}
                >
                  {action}
                  {secondaryAction}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative overflow-hidden rounded-[1.75rem] px-7 py-16 sm:px-16 sm:py-20"
              style={{
                backgroundColor: "rgb(var(--color-secondary))",
                color: fg,
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
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-4",
                    align === "center" && "justify-center",
                  )}
                >
                  {action}
                  {secondaryAction}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    );
  },
);
CTA.displayName = "CTA";