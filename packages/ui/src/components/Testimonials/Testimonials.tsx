import { forwardRef } from "react";
import type { TestimonialsProps } from "./types";
import { TestimonialsGrid } from "./variants/Grid";
import { TestimonialsMarquee } from "./variants/Marquee";
import { TestimonialsCarousel } from "./variants/Carousel";

export const Testimonials = forwardRef<HTMLDivElement, TestimonialsProps>(
  ({ option = "grid", ...props }, ref) => {
    if (option === "carousel") return <TestimonialsCarousel ref={ref} {...props} />;
    if (option === "marquee") return <TestimonialsMarquee ref={ref} {...props} />;
    return <TestimonialsGrid ref={ref} {...props} />;
  },
);
Testimonials.displayName = "Testimonials";