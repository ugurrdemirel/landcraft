import { forwardRef, type ElementType } from "react";
import { cn } from "../../../utils/cn";
import { ArrowUpRight } from "../../../icons";
import type { BlogPost } from "../types";

interface BlogCardRowProps {
  post: BlogPost;
  LinkComponent?: ElementType;
  className?: string;
}

export const BlogCardRow = forwardRef<HTMLAnchorElement, BlogCardRowProps>(
  ({ className, post, LinkComponent, ...props }, ref) => {
    const Link = LinkComponent ?? "a";
    return (
      <Link
        ref={ref}
        href={post.href ?? "#"}
        className={cn("group flex cursor-pointer items-baseline gap-5 py-6", className)}
        {...props}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            {post.category ? <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{post.category}</span> : null}
            <span className="text-xs tabular-nums text-muted-foreground">
              {post.date}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-1 sm:text-2xl">
            {post.title}
          </h3>
        </div>
        <span className="text-foreground/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>
    );
  },
);
BlogCardRow.displayName = "BlogCardRow";