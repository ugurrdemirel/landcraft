import { forwardRef } from "react";
import type { BlogCardProps } from "./types";
import { BlogCardCard } from "./variants/Card";
import { BlogCardRow } from "./variants/Row";

export const BlogCard = forwardRef<HTMLAnchorElement, BlogCardProps>(
  ({ option = "card", ...props }, ref) => {
    if (option === "row") return <BlogCardRow ref={ref} {...props} />;
    return <BlogCardCard ref={ref} {...props} />;
  },
);
BlogCard.displayName = "BlogCard";