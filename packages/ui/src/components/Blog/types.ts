import type { ElementType, HTMLAttributes, ReactNode } from "react";

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

export interface BlogCardProps extends HTMLAttributes<HTMLAnchorElement> {
  post: BlogPost;
  option?: "card" | "row";
  /** Component used to render the card link. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}

export interface BlogSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
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
  LinkComponent?: ElementType;
}