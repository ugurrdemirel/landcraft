import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { HeroActions, HeroEyebrow, heroContainer, heroTitleBase } from "../parts";
import type { HeroProps } from "../types";

/** Split — editorial grid: huge type left, media right, meta rule under. */
export const HeroSplit = forwardRef<HTMLElement, HeroProps>(
  (
    { className, eyebrow, title, description, primaryAction, secondaryAction, media, meta, id, ...props },
    ref,
  ) => (
    <section
      ref={ref}
      id={id}
      className={cn("relative w-full border-b border-border bg-background", className)}
      {...props}
    >
      <div className={cn(
        heroContainer,
        "items-start gap-14 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-20",
      )}>
        <div className="max-w-xl">
          <HeroEyebrow eyebrow={eyebrow} />
          <h1 className={cn(heroTitleBase, "mt-6 text-5xl leading-[1.03] sm:text-6xl lg:text-7xl")}>
            {title}
          </h1>
          {description ? (
            <p className="mt-7 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
          {primaryAction || secondaryAction ? (
            <div className="mt-10">
              <HeroActions primaryAction={primaryAction} secondaryAction={secondaryAction} />
            </div>
          ) : null}
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
  ),
);
HeroSplit.displayName = "HeroSplit";