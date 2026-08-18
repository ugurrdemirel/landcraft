import type { Meta, StoryObj } from "@storybook/react";
import { BlogSection, BlogCard, type BlogPost } from "@marketing-ui/core";

const posts: BlogPost[] = [
  {
    title: "Token-based theming, a contrast-free future",
    excerpt:
      "Moving every design decision into CSS variables means editing a single file when you go from one startup to the next.",
    date: "12 Aug 2026",
    readTime: "5 min",
    category: "Strategy",
    author: { name: "Aylin Demir" },
    accent: "#4f46e5",
  },
  {
    title: "Building an emoji-free icon system",
    excerpt:
      "A single 24×24 stroke vocabulary for brand consistency; why an emoji is not a UI icon.",
    date: "28 Jul 2026",
    readTime: "4 min",
    category: "Design",
    author: { name: "Mehmet Can" },
  },
  {
    title: "Turning Storybook into a design-language check",
    excerpt:
      "How we catch unnoticed breakages with the palette switcher, a11y panel, and option-based stories.",
    date: "14 Jul 2026",
    readTime: "7 min",
    category: "Workflow",
    author: { name: "Selin Arat" },
    accent: "#0d9488",
  },
  {
    title: "Doubling contrast distance in dark mode",
    excerpt:
      "Dark surfaces blend together; transitions need twice the separation. A practical guide.",
    date: "30 Jun 2026",
    readTime: "6 min",
    category: "Accessibility",
    author: { name: "Ayşe Yıldız" },
  },
  {
    title: "The landing page struggle ends: section templates",
    excerpt:
      "Hero, pricing, testimonials… Different brands on the same blueprint. Composition examples.",
    date: "18 Jun 2026",
    readTime: "8 min",
    category: "Product",
    author: { name: "Aylin Demir" },
    accent: "#b45309",
  },
];

const meta = {
  title: "Components/Blog",
  component: BlogSection,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["card", "row"] },
    columns: { control: "radio", options: [2, 3] },
    limit: { control: { type: "number", min: 1, max: 5 } },
  },
  args: {
    posts,
    option: "card",
    columns: 3,
    eyebrow: "Blog",
    title: "Latest posts",
    description: "Regular writing on product, design, and startups.",
    showAllLabel: "All posts",
    showAllHref: "#",
  },
} satisfies Meta<typeof BlogSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SectionCartGrid: Story = {
  name: "Section · Card grid (latest 3)",
  args: { limit: 3, option: "card" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "With `limit`, only the latest N posts are shown as cards; the heading and an 'All posts' link come ready.",
      },
    },
  },
};

export const SectionList: Story = {
  name: "Section · Editorial list",
  args: { option: "row", limit: 4, columns: undefined as never },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { story: "Hairline-separated row view; in the 'Selected work' language of the Agency template." },
    },
  },
};

export const BothColumns: Story = {
  name: "Section · 2 cards",
  args: { limit: 2, option: "card", columns: 2 },
  parameters: { layout: "fullscreen" },
};

/** Single card (subheading use) */
export const CardOnly: Story = {
  name: "BlogCard · Card",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <BlogCard key={post.title} post={post} />
      ))}
    </div>
  ),
};

export const RowOnly: Story = {
  name: "BlogCard · Row",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-3xl divide-y divide-border border-t border-border">
      {posts.slice(0, 3).map((post) => (
        <BlogCard key={post.title} post={post} option="row" />
      ))}
    </div>
  ),
};