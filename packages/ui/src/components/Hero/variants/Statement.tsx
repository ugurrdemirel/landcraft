import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { emphasisSurfaceStyle } from "../../../utils/surface";
import {
  HeroActions,
  heroContainer,
  heroDescriptionBase,
  heroTitleType,
} from "../parts";
import type { HeroProps } from "../types";

/**
 * Statement — full-bleed brand emphasis band. No eyebrow, pure message.
 *
 * The band is painted from `--color-primary` and its text color is computed
 * with CSS `contrast-color()`. Pass `background` to replace the brand gradient
 * with any CSS color while keeping the contrast behavior.
 */
export const HeroStatement = forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      title,
      description,
      primaryAction,
      secondaryAction,
      media,
      meta,
      background,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative w-full overflow-hidden", className)}
        style={emphasisSurfaceStyle(background)}
        {...props}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className={cn(heroContainer, "pt-28 pb-24 text-center sm:pt-36 sm:pb-32")}>
          <h1 className={cn(heroTitleType, "max-w-5xl text-[2.9rem] sm:text-7xl lg:text-8xl")}>
            {title}
          </h1>
          {description ? (
            <p className={cn(heroDescriptionBase, "mx-auto mt-8 max-w-xl opacity-70")}>
              {description}
            </p>
          ) : null}
          {primaryAction || secondaryAction ? (
            <div className="mt-11 justify-center">
              <HeroActions primaryAction={primaryAction} secondaryAction={secondaryAction} emphasis />
            </div>
          ) : null}
          {meta ? (
            <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {meta.map((m) => (
                <li key={m.label} className="flex items-center gap-2 text-sm font-medium opacity-70">
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
HeroStatement.displayName = "HeroStatement";
