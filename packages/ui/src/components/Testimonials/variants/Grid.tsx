import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { TestimonialCard } from "../TestimonialCard";
import type { Testimonial } from "../types";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  items: Testimonial[];
}

export const TestimonialsGrid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, items, ...props }, ref) => (
    <div className={cn("columns-1 gap-4 md:columns-2 lg:columns-3", className)} ref={ref} {...props}>
      {items.map((item, i) => (
        <TestimonialCard key={i} testimonial={item} />
      ))}
    </div>
  ),
);
TestimonialsGrid.displayName = "TestimonialsGrid";