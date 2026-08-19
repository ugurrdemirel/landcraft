import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCard } from "./BlogCard";
import { BlogSection } from "./BlogSection";

const posts = [
  {
    title: "Token-based theming",
    excerpt: "A short excerpt.",
    date: "12 Aug 2026",
    readTime: "5 min",
    category: "Strategy",
    href: "/post",
    author: { name: "Aylin Demir" },
  },
  {
    title: "Second post",
    date: "1 Aug 2026",
  },
];

describe("BlogCard", () => {
  it("renders a card with title, category badge and meta (card option)", () => {
    render(<BlogCard post={posts[0]} />);
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("5 min")).toBeInTheDocument();
  });

  it("renders the row option", () => {
    render(<BlogCard post={posts[0]} option="row" />);
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
  });

  it("links to the post href", () => {
    render(<BlogCard post={posts[0]} />);
    expect(
      screen.getByRole("link", { name: /Token-based theming/ }),
    ).toHaveAttribute("href", "/post");
  });
});

describe("BlogSection", () => {
  it("renders the heading and posts as a card grid", () => {
    render(
      <BlogSection
        posts={posts}
        eyebrow="Blog"
        title="Latest"
        description="A description."
      />,
    );
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Latest")).toBeInTheDocument();
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
    expect(screen.getByText("Second post")).toBeInTheDocument();
  });

  it("limits the number of posts with the limit prop", () => {
    render(<BlogSection posts={posts} limit={1} />);
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
    expect(screen.queryByText("Second post")).not.toBeInTheDocument();
  });
});
