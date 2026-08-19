import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { getContrastText } from "../../utils/contrast";
import { Quote, Star } from "../../icons";
import { initials } from "./parts";
import type { TestimonialCardProps } from "./types";

export const TestimonialCard = forwardRef<HTMLElement, TestimonialCardProps>(
  function TestimonialCard({ className, testimonial, ...props }, ref) {
    const { quote, author, role, company, avatar, accent, rating } = testimonial;
    const badgeStyle = accent
      ? { backgroundColor: accent, color: getContrastText(accent, "#111111", "#ffffff") }
      : undefined;

    return (
      <figure
        ref={ref}
        className={cn(
          "mb-4 flex flex-col break-inside-avoid rounded-2xl border border-border bg-surface p-7",
          className,
        )}
        {...props}
      >
        <div className="mb-5 flex items-center justify-between">
          <Quote className={cn("h-6 w-6", accent ? undefined : "text-primary/30")} style={accent ? { color: accent } : undefined} />
          {rating ? (
            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${rating} / 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" />
              ))}
            </span>
          ) : null}
        </div>
        <blockquote className="flex-1 text-[15px] leading-7 text-foreground/85">{quote}</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          {avatar ? (
            avatar
          ) : (
            <span
              style={badgeStyle}
              className={cn(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                !accent && "bg-primary-soft text-primary",
              )}
            >
              {initials(author)}
            </span>
          )}
          <div>
            <div className="text-sm font-semibold text-foreground">{author}</div>
            {(role || company) && (
              <div className="text-xs text-muted-foreground">
                {[role, company].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
        </figcaption>
      </figure>
    );
  },
);