import type { HTMLAttributes, ReactNode } from "react";

export type TestimonialsOption = "grid" | "carousel" | "marquee";

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

export interface TestimonialsProps extends HTMLAttributes<HTMLDivElement> {
  items: Testimonial[];
  option?: TestimonialsOption;
  title?: string;
}