"use client";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ForwardedRef,
  type MouseEvent,
  type MutableRefObject,
} from "react";
import { cn } from "../../../utils/cn";
import { HeroActions, HeroEyebrow, heroContainer, heroTitleBase } from "../parts";
import type { HeroLogo, HeroProps } from "../types";

const DEFAULT_DEPTH = 18;
const FLOAT_DURATION = 5; // seconds per breathing cycle
const FLOAT_STAGGER = 0.7; // seconds of desync between consecutive tiles

function setSectionRef(
  node: HTMLElement | null,
  localRef: MutableRefObject<HTMLElement | null>,
  forwarded: ForwardedRef<HTMLElement>,
) {
  localRef.current = node;
  if (typeof forwarded === "function") forwarded(node);
  else if (forwarded) (forwarded as MutableRefObject<HTMLElement | null>).current = node;
}

function tileEntryOffset(logo: HeroLogo) {
  // Push the tile further out from the centre along the line it already sits on,
  // so it appears to fly in from off-screen.
  return { x: (logo.x - 50) * 4, y: (logo.y - 50) * 4 };
}

/** Parallax — centred copy with floating logo tiles that react to the mouse. */
export const HeroParallax = forwardRef<HTMLElement, HeroProps>(
  (
    { className, eyebrow, title, description, primaryAction, secondaryAction, meta, media, logos = [], id, ...props },
    ref,
  ) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [entered, setEntered] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
      if (typeof window.matchMedia !== "function") return;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => setReduceMotion(mq.matches);
      setReduceMotion(mq.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }, []);

    useEffect(() => {
      if (reduceMotion) return;
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }, [reduceMotion]);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setOffset({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

    const showResting = entered || reduceMotion;

    return (
      <section
        ref={(node) => setSectionRef(node, sectionRef, ref)}
        id={id}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative w-full overflow-hidden border-b border-border bg-background", className)}
        {...props}
      >
        {logos.map((logo, i) => {
          const depth = logo.depth ?? DEFAULT_DEPTH;
          const entry = tileEntryOffset(logo);
          const entryTransform = `translate(calc(-50% + ${entry.x}px), calc(-50% + ${entry.y}px)) scale(0.6)`;
          const restingTransform = "translate(-50%, -50%)";
          const parallaxTransform = reduceMotion
            ? "translate(0px, 0px)"
            : `translate(${offset.x * depth}px, ${offset.y * depth}px)`;

          return (
            <div
              key={logo.label}
              aria-hidden
              data-logo={logo.label}
              className="pointer-events-none absolute z-10 hidden transition-[transform,opacity] duration-700 ease-out md:block"
              style={{
                left: `${logo.x}%`,
                top: `${logo.y}%`,
                transform: showResting ? restingTransform : entryTransform,
                opacity: showResting ? 1 : 0,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: parallaxTransform }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-raised"
                  style={
                    reduceMotion
                      ? undefined
                      : {
                          animation: `hero-float ${FLOAT_DURATION}s ease-in-out infinite`,
                          animationDelay: `-${i * FLOAT_STAGGER}s`,
                        }
                  }
                >
                  {logo.icon}
                </div>
              </div>
            </div>
          );
        })}

        <div className={cn(heroContainer, "relative z-20 pt-24 pb-20 text-center sm:pt-32 sm:pb-24")}>
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
    );
  },
);
HeroParallax.displayName = "HeroParallax";
