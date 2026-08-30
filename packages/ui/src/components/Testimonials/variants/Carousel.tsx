"use client";
import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { ChevronLeft, ChevronRight, Quote } from "../../../icons";
import { initials } from "../parts";
import type { Testimonial } from "../types";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: Testimonial[];
}

export const TestimonialsCarousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, items, ...props }, ref) => {
    const [index, setIndex] = useState(0);
    const item = items[index % items.length];
    const badgeStyle = item.accent
      ? { backgroundColor: item.accent, color: `contrast-color(${item.accent})` }
      : undefined;

    const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

    return (
      <div className={cn("mx-auto w-full max-w-3xl", className)} ref={ref} {...props}>
        <figure className="relative rounded-2xl border border-border bg-surface p-10 text-center sm:p-14">
          <Quote
            className={cn("mx-auto mb-6 h-8 w-8", item.accent ? undefined : "text-primary/25")}
            style={item.accent ? { color: item.accent } : undefined}
            aria-hidden
          />
          <blockquote className="font-display text-balance text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
            {item.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            {item.avatar ? (
              item.avatar
            ) : (
              <span
                style={badgeStyle}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold",
                  !item.accent && "bg-foreground text-background",
                )}
              >
                {initials(item.author)}
              </span>
            )}
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">{item.author}</div>
              <div className="text-xs text-muted-foreground">
                {[item.role, item.company].filter(Boolean).join(" · ")}
              </div>
            </div>
          </figcaption>
        </figure>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors duration-150 hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-200",
                  i === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors duration-150 hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  },
);
TestimonialsCarousel.displayName = "TestimonialsCarousel";