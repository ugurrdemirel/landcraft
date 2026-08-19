import { forwardRef, type ElementType } from "react";
import { cn } from "../../../utils/cn";
import { ArrowRight } from "../../../icons";
import { Badge } from "../../Badge";
import { AuthorMark, Cover } from "../parts";
import type { BlogPost } from "../types";

interface BlogCardCardProps {
  post: BlogPost;
  LinkComponent?: ElementType;
  className?: string;
}

export const BlogCardCard = forwardRef<HTMLAnchorElement, BlogCardCardProps>(
  ({ className, post, LinkComponent, ...props }, ref) => {
    const Link = LinkComponent ?? "a";
    const author = post.author;
    return (
      <Link
        ref={ref}
        href={post.href ?? "#"}
        className={cn(
          "group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-foreground/20",
          className,
        )}
        {...props}
      >
        <div className="overflow-hidden">
          <Cover post={post} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            {post.category ? <Badge variant="soft" size="sm">{post.category}</Badge> : <span />}
            {post.readTime ? (
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
            ) : null}
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
            {author ? (
              <span className="flex min-w-0 items-center gap-2.5">
                <AuthorMark name={author.name} avatar={author.avatar} />
                <span className="truncate text-xs font-medium text-foreground">{author.name}</span>
              </span>
            ) : (
              <span className="text-xs tabular-nums text-muted-foreground">{post.date}</span>
            )}
            <ArrowRight className="h-4 w-4 text-foreground/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
        </div>
      </Link>
    );
  },
);
BlogCardCard.displayName = "BlogCardCard";