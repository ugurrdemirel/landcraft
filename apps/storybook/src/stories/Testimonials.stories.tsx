import type { Meta, StoryObj } from "@storybook/react-vite";
import { Testimonials, TestimonialCard, type Testimonial } from "@ugurdemirel/landcraft";

const items: Testimonial[] = [
  {
    quote:
      "Hours of landing page work dropped to 15 minutes. I changed the colors and everything held together — even the contrast.",
    author: "Ayşe Yıldız",
    role: "Founder",
    company: "Lumina",
    rating: 5,
  },
  {
    quote:
      "We put together a ready marketing page for our first product in one evening. The components are truly marketing-focused.",
    author: "Mehmet Demir",
    role: "CTO",
    company: "Nova Labs",
    rating: 5,
  },
  {
    quote:
      "Even without a designer, all our brands' pages stay consistent and accessible.",
    author: "Zeynep Kaya",
    role: "Product Manager",
    company: "Vertex",
    rating: 5,
    accent: "#db2777",
  },
  {
    quote:
      "The token-based theming system got us hooked up to the corporate brand guidelines in 10 minutes.",
    author: "Emre Aydın",
    role: "Brand Director",
    company: "Papirüs",
    accent: "#0d9488",
  },
  {
    quote:
      "Checking contrast on every change with the accessibility panel open is now part of our onboarding.",
    author: "Selin Arat",
    role: "Frontend Lead",
    company: "Forge",
    rating: 5,
  },
  {
    quote:
      "We replaced a custom-built pricing page with the Pricing component in an afternoon — and it looks better.",
    author: "Kaan Öztürk",
    role: "Growth Lead",
    company: "Havale",
    accent: "#b45309",
  },
];

const meta = {
  title: "Components/Testimonials",
  component: Testimonials,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["grid", "carousel", "marquee"] },
  },
  args: { items },
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Grid: Story = {
  name: "Option 1 · Masonry Grid",
  args: { option: "grid" },
};

export const Option2_Carousel: Story = {
  name: "Option 2 · Carousel",
  args: { option: "carousel" },
};

export const Option3_Marquee: Story = {
  name: "Option 3 · Marquee",
  args: { option: "marquee" },
};

/** `accent` tints the initials avatar and the quote mark; `rating` shows a star row. */
export const CardAnatomy: Story = {
  name: "Card anatomy",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto grid max-w-5xl gap-6 p-6 sm:grid-cols-2">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">with accent + rating</p>
        <TestimonialCard
          testimonial={{
            quote: "Switch palettes any time — text and surfaces re-sync, contrast never breaks.",
            author: "Ayşe Yıldız",
            role: "Founder",
            company: "Lumina",
            rating: 5,
            accent: "#db2777",
          }}
        />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">default initials</p>
        <TestimonialCard
          testimonial={{
            quote: "A plain quote with the default primary avatar mark and no rating.",
            author: "Mehmet Demir",
            role: "CTO",
            company: "Nova Labs",
          }}
        />
      </div>
    </div>
  ),
};