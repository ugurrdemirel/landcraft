import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { HeroActions, HeroEyebrow, heroContainer, heroTitleBase } from "../parts";
import type { HeroProps } from "../types";

/** Centered — understated, one statement, generous white space. */
export const HeroCentered = forwardRef<HTMLElement, HeroProps>(
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
      <div className={cn(heroContainer, "pt-24 pb-20 text-center sm:pt-32 sm:pb-24")}>
        <HeroEyebrow eyebrow={eyebrow} />
        <h1 className={cn(heroTitleBase, "mt-7 max-w-4xl text-5xl leading-[1.04] sm:text-6xl lg:text-7xl")}>
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
        {primaryAction || secondaryAction ? (
          <div className="mt-10 justify-center">
            <HeroActions primaryAction={primaryAction} secondaryAction={secondaryAction} />
          </div>
        ) : null}
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
  ),
);
HeroCentered.displayName = "HeroCentered";