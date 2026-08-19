import type { ReactNode } from "react";
import type { BlogPost } from "./types";

export function AuthorMark({ name, avatar }: { name: string; avatar?: ReactNode }) {
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

export const Cover = ({ post }: { post: BlogPost }) =>
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