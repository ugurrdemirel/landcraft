import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { TestimonialCard } from "../TestimonialCard";
import type { Testimonial } from "../types";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  items: Testimonial[];
}

export const TestimonialsMarquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, items, ...props }, ref) => {
    const doubled = [...items, ...items];
    return (
      <div className={cn("w-full overflow-hidden", className)} ref={ref} {...props}>
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
  },
);
TestimonialsMarquee.displayName = "TestimonialsMarquee";