"use client";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { useTokenForeground } from "../../../utils/useTokenForeground";
import { HeroActions, heroContainer } from "../parts";
import type { HeroProps } from "../types";

/** Statement — full-bleed ink band. No eyebrow, pure message. */
export const HeroStatement = forwardRef<HTMLElement, HeroProps>(
  (
    { className, title, description, primaryAction, secondaryAction, media, meta, id, ...props },
    ref,
  ) => {
    // Statement paints its own background from --color-secondary, so the
    // readable text color must be derived from THAT token, not the brand.
    const fg = useTokenForeground("--color-secondary");

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
        <div className={cn(heroContainer, "pt-28 pb-24 text-center sm:pt-36 sm:pb-32")}>
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
          {primaryAction || secondaryAction ? (
            <div className="mt-11 justify-center">
              <HeroActions primaryAction={primaryAction} secondaryAction={secondaryAction} />
            </div>
          ) : null}
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
HeroStatement.displayName = "HeroStatement";