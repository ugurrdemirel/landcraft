import type { Meta, StoryObj } from "@storybook/react";
import { Navbar, Button, ArrowUpRight } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["classic", "floating", "inverse"] },
    sticky: { control: "boolean" },
  },
  args: {
    variant: "classic",
    brand: "Acurio",
    links: [
      { label: "Product", href: "#" },
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Testimonials", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    cta: (
      <Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
        Start for free
      </Button>
    ),
    actions: <Button variant="ghost" size="sm">Log in</Button>,
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Classic hairline bar — default, most restrained option. */
export const Option1_Classic: Story = {
  name: "Option 1 · Classic",
  args: { variant: "classic" },
  parameters: {
    docs: {
      description: {
        story: "A classic menu bar with a bottom border, blur, and sticky positioning.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[18rem]">
        <Story />
      </div>
    ),
  ],
};

/** Floating pill — modern inset container with soft shadow. */
export const Option2_Floating: Story = {
  name: "Option 2 · Floating",
  args: { variant: "floating" },
  parameters: {
    docs: {
      description: {
        story: "A floating bar inset from the page with rounded corners and a soft shadow.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[18rem]">
        <Story />
      </div>
    ),
  ],
};

/** Inverse — full-bleed ink bar for dark/statement sites. */
export const Option3_Inverse: Story = {
  name: "Option 3 · Inverse",
  args: { variant: "inverse" },
  parameters: {
    docs: {
      description: {
        story: "Ink-black surface; text comes from the `--color-on-secondary` token.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[18rem]">
        <Story />
      </div>
    ),
  ],
};

export const NotSticky: Story = {
  args: { sticky: false, variant: "classic" },
};

const SampleLogo = () => (
  <span className="flex items-center gap-2.5">
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M10 22 22 10M13 10h6.5A2.5 2.5 0 0 1 22 12.5V19"
        stroke="rgb(var(--color-on-primary))"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    <span className="font-display text-[17px] font-bold tracking-tight">Acurio</span>
  </span>
);

/** Logo (node) — a brand visual/mark instead of a wordmark. */
export const WithLogo: Story = {
  name: "Logo swap (brand mark)",
  args: { variant: "classic", brand: undefined, logo: <SampleLogo /> },
  decorators: [
    (Story) => (
      <div className="min-h-[16rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "You can pass any node to the `logo` prop (SVG, <img>, component…). You can also supply a ready image via `logoSrc`/`logoAlt`; the wordmark is disabled then.",
      },
    },
  },
};