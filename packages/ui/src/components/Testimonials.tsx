import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { getContrastText } from "../utils/contrast";
import { ChevronLeft, ChevronRight, Quote, Star } from "../icons";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: ReactNode;
  /** Arbitrary CSS color for the initials avatar. */
  accent?: string;
  rating?: number;
}

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  testimonial: Testimonial;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

/** Holds per-option rendering + controls together. */
export interface TestimonialsProps extends HTMLAttributes<HTMLDivElement> {
  items: Testimonial[];
  option?: "grid" | "carousel" | "marquee";
  title?: string;
}

export const Testimonials = ({ className, items, option = "grid", ...props }: TestimonialsProps) => {
  if (option === "carousel") {
    return <Carousel items={items} className={className} {...props} />;
  }

  if (option === "marquee") {
    const doubled = [...items, ...items];
    return (
      <div className={cn("w-full overflow-hidden", className)} {...props}>
        <div className="mask-fade-x">
          <div className="flex w-max animate-marquee gap-4 pr-4 motion-reduce:animate-none">
            {doubled.map((item, i) => (
              <div key={i} className="w-[19rem] shrink-0 sm:w-[24rem]">
                <TestimonialCard testimonial={item} className="m-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("columns-1 gap-4 md:columns-2 lg:columns-3", className)} {...props}>
      {items.map((item, i) => (
        <TestimonialCard key={i} testimonial={item} />
      ))}
    </div>
  );
};
Testimonials.displayName = "Testimonials";

function Carousel({
  items,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index % items.length];
  const badgeStyle = item.accent
    ? { backgroundColor: item.accent, color: getContrastText(item.accent, "#111111", "#ffffff") }
    : undefined;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)} {...props}>
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
}