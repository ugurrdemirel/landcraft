import type { Meta, StoryObj } from "@storybook/react";
import { Footer, Newsletter } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["classic", "minimal", "editorial"] },
  },
  args: {
    option: "classic",
    brand: "Acurio",
    description:
      "Ready-made, token-based, accessible marketing components for startups.",
    columns: [
      { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }, { label: "Integrations", href: "#" }, { label: "Updates", href: "#" }] },
      { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
      { title: "Resources", links: [{ label: "Documentation", href: "#" }, { label: "API", href: "#" }, { label: "Status", href: "#" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Security", href: "#" }] },
    ],
    socials: (
      <>
        {["X", "in", "gh"].map((label) => (
          <a
            key={label}
            href="#"
            aria-label={`Social ${label}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </>
    ),
    bottom: "Made with @ugurdemirel/landcraft",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Classic: Story = {
  name: "Option 1 · Classic (inverse)",
  args: { option: "classic" },
  render: (args) => <Footer {...args} />,
};

export const Option2_Minimal: Story = {
  name: "Option 2 · Minimal",
  args: { option: "minimal" },
};

export const Option3_Editorial: Story = {
  name: "Option 3 · Editorial wordmark",
  args: { option: "editorial" },
};

export const WithNewsletter: Story = {
  name: "Classic + Newsletter badge",
  args: {
    option: "classic",
    badge: (
      <Newsletter option="card" placeholder="you@company.com" note="Once a month. No spam." />
    ),
  },
};