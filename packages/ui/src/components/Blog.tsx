import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { ArrowRight, ArrowUpRight } from "../icons";
import { Badge } from "./Badge";
import { Container } from "./Container";

export interface BlogAuthor {
  name: string;
  avatar?: ReactNode;
}

export interface BlogPost {
  title: string;
  excerpt?: string;
  /** Display date, e.g. "12 Aug 2026". */
  date: string;
  readTime?: string;
  category?: string;
  cover?: string;
  /** Arbitrary CSS color for the cover placeholder accent. */
  accent?: string;
  href?: string;
  author?: BlogAuthor;
}

function AuthorMark({ name, avatar }: { name: string; avatar?: ReactNode }) {
  if (avatar) return avatar;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-[11px] font-bold text-primary">
      {initials}
    </span>
  );
}

export interface BlogCardProps extends HTMLAttributes<HTMLAnchorElement> {
  post: BlogPost;
  option?: "card" | "row";
  /** Component used to render the card link. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}

const Cover = ({ post }: { post: BlogPost }) =>
  post.cover ? (
    <img src={post.cover} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
  ) : (
    <div
      className="grid aspect-[16/10] w-full place-items-center bg-surface-strong"
      style={
        post.accent
          ? { background: `linear-gradient(135deg, ${post.accent}22, ${post.accent}11)` }
          : undefined
      }
    >
      <span
        className="font-display text-4xl font-bold tracking-[-0.04em]"
        style={{ color: post.accent ?? "rgb(var(--color-foreground) / 0.12)" }}
      >
        {post.category?.[0]?.toUpperCase()}
      </span>
    </div>
  );

export const BlogCard = forwardRef<HTMLAnchorElement, BlogCardProps>(
  ({ className, post, option = "card", LinkComponent, ...props }, ref) => {
    const Link = LinkComponent ?? "a";

    if (option === "row") {
      return (
        <Link
          ref={ref}
          href={post.href ?? "#"}
          className={cn("group flex cursor-pointer items-baseline gap-5 py-6", className)}
          {...props}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {post.category ? <Badge variant="soft" size="sm">{post.category}</Badge> : null}
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
    }

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
BlogCard.displayName = "BlogCard";

export interface BlogSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  posts: BlogPost[];
  /** Show only the first N posts. */
  limit?: number;
  columns?: 2 | 3;
  option?: "card" | "row";
  eyebrow?: ReactNode;
  eyebrowStyle?: "caps" | "soft" | "plain";
  title?: ReactNode;
  description?: ReactNode;
  showAllLabel?: string;
  showAllHref?: string;
  /** Component used to render the "show all" link and post cards. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}

const gridCols: Record<NonNullable<BlogSectionProps["columns"]>, string> = {
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