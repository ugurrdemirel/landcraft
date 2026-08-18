import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useTokenForeground } from "../utils/useTokenForeground";

export interface HeroMeta {
  label: string;
  icon?: ReactNode;
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: "split" | "centered" | "statement";
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  media?: ReactNode;
  /** Small trust/status row shown under the copy or CTAs. */
  meta?: HeroMeta[];
}

const titleBase =
  "font-display font-semibold tracking-[-0.03em] text-balance text-foreground";

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    { className, variant = "split", eyebrow, title, description, primaryAction, secondaryAction, media, meta, id, ...props },
    ref,
  ) => {
    const isCentered = variant === "centered";
    const isStatement = variant === "statement";
    // Statement paints its own background from --color-secondary, so the
    // readable text color must be derived from THAT token, not the brand.
    const fg = useTokenForeground(isStatement ? "--color-secondary" : "--color-primary");

    const container =
      "relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8";

    const eyebrowNode =
      typeof eyebrow === "string" ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : eyebrow ? (
        <div>{eyebrow}</div>
      ) : null;

    const actionsNode = primaryAction || secondaryAction ? (
      <div className="flex flex-wrap items-center gap-4">{primaryAction}{secondaryAction}</div>
    ) : null;

    /** Split — editorial grid: huge type left, media right, meta rule under. */
    if (variant === "split") {
      return (
        <section
          ref={ref}
          id={id}
          className={cn("relative w-full border-b border-border bg-background", className)}
          {...props}
        >
          <div className={cn(container, "items-start gap-14 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-20")}>
            <div className="max-w-xl">
              {eyebrowNode}
              <h1 className={cn(titleBase, "mt-6 text-5xl leading-[1.03] sm:text-6xl lg:text-7xl")}>
                {title}
              </h1>
              {description ? (
                <p className="mt-7 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                  {description}
                </p>
              ) : null}
              {actionsNode ? <div className="mt-10">{actionsNode}</div> : null}
              {meta ? (
                <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
                  {meta.map((m) => (
                    <li key={m.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {m.icon ? <span className="text-foreground/35">{m.icon}</span> : null}
                      {m.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {media ? <div className="w-full self-center">{media}</div> : null}
          </div>
        </section>
      );
    }

    /** Centered — understated, one statement, generous white space. */
    if (isCentered) {
      return (
        <section
          ref={ref}
          id={id}
          className={cn("relative w-full border-b border-border bg-background", className)}
          {...props}
        >
          <div className={cn(container, "pt-24 pb-20 text-center sm:pt-32 sm:pb-24")}>
            {eyebrowNode}
            <h1 className={cn(titleBase, "mt-7 max-w-4xl text-5xl leading-[1.04] sm:text-6xl lg:text-7xl")}>
              {title}
            </h1>
            {description ? (
              <p className="mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
            {actionsNode ? <div className="mt-10 justify-center">{actionsNode}</div> : null}
            {meta ? (
              <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
                {meta.map((m, i) => (
                  <li
                    key={m.label}
                    className={cn(
                      "flex items-center gap-2 text-sm text-muted-foreground",
                      i > 0 && "sm:border-l sm:border-border sm:pl-9",
                    )}
                  >
                    {m.icon ? <span className="text-foreground/35">{m.icon}</span> : null}
                    {m.label}
                  </li>
                ))}
              </ul>
            ) : null}
            {media ? <div className="mt-16 w-full">{media}</div> : null}
          </div>
        </section>
      );
    }

    /** Statement — full-bleed ink band. No eyebrow, pure message. */
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative w-full overflow-hidden bg-secondary", className)}
        style={{ color: fg }}
        {...props}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className={cn(container, "pt-28 pb-24 text-center sm:pt-36 sm:pb-32")}>
          <h1
            className="max-w-5xl font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-7xl lg:text-8xl"
            style={{ color: fg }}
          >
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed sm:text-lg" style={{ color: fg, opacity: 0.72 }}>
              {description}
            </p>
          ) : null}
          {actionsNode ? <div className="mt-11 justify-center">{actionsNode}</div> : null}
          {meta ? (
            <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {meta.map((m) => (
                <li key={m.label} className="flex items-center gap-2 text-sm font-medium" style={{ color: fg, opacity: 0.72 }}>
                  {m.icon ? <span>{m.icon}</span> : null}
                  {m.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    );
  },
);
Hero.displayName = "Hero";