import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ArrowRight } from "../../icons";
import { Container } from "../Container";
import { BlogCard } from "./BlogCard";
import type { BlogSectionProps } from "./types";

const gridCols: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export const BlogSection = forwardRef<HTMLElement, BlogSectionProps>(
  (
    {
      className,
      posts,
      limit,
      columns = 3,
      option = "card",
      eyebrow,
      eyebrowStyle = "caps",
      title,
      description,
      showAllLabel,
      showAllHref,
      LinkComponent,
      ...props
    },
    ref,
  ) => {
    const visible = limit ? posts.slice(0, limit) : posts;
    const Link = LinkComponent ?? "a";

    return (
      <section ref={ref} className={cn("w-full py-20 sm:py-24", className)} {...props}>
        <Container>
          {(eyebrow || title || description || showAllHref) && (
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                {eyebrow ? (
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.18em]",
                      eyebrowStyle === "caps" && "text-foreground/50",
                      eyebrowStyle === "soft" &&
                        "inline-flex items-center rounded-full bg-primary-soft px-3 py-1.5 text-primary",
                      eyebrowStyle === "plain" && "text-primary",
                    )}
                  >
                    {eyebrow}
                  </p>
                ) : null}
                {title ? (
                  <h2 className="mt-4 font-display text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">
                    {description}
                  </p>
                ) : null}
              </div>
              {showAllHref ? (
                <Link
                  href={showAllHref}
                  className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {showAllLabel ?? "All posts"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>
          )}

          {option === "row" ? (
            <div className="divide-y divide-border border-t border-border">
              {visible.map((post) => (
                <BlogCard key={post.title} post={post} option="row" LinkComponent={LinkComponent} />
              ))}
            </div>
          ) : (
            <div className={cn("grid grid-cols-1 gap-4", gridCols[columns])}>
              {visible.map((post) => (
                <BlogCard key={post.title} post={post} option="card" LinkComponent={LinkComponent} />
              ))}
            </div>
          )}
        </Container>
      </section>
    );
  },
);
BlogSection.displayName = "BlogSection";