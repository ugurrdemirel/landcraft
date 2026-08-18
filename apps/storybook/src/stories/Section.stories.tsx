import type { Meta, StoryObj } from "@storybook/react";
import { Section, Button, ArrowUpRight } from "@marketing-ui/core";

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "radio", options: ["left", "center"] },
    eyebrowStyle: { control: "radio", options: ["caps", "soft", "plain"] },
  },
  args: {
    size: "md",
    align: "center",
    eyebrowStyle: "caps",
    eyebrow: "Why choose us",
    title: "Less effort, more shipping",
    description:
      "Carry the same components from one startup to the next — just change the colors. The rest is the library.",
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const cards = (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {[1, 2, 3].map((n) => (
      <div
        key={n}
        className="flex h-36 items-center justify-center rounded-2xl border border-border bg-surface text-sm text-muted-foreground"
      >
        Content block {n}
      </div>
    ))}
  </div>
);

export const Center: Story = { args: { children: cards } };
export const Left: Story = { args: { align: "left", children: cards } };
export const SoftEyebrow: Story = { args: { eyebrowStyle: "soft", children: cards } };
export const Compact: Story = {
  args: {
    size: "sm",
    eyebrowStyle: "plain",
    eyebrow: undefined,
    title: "Compact section heading",
    description: undefined,
    children: cards,
  },
};

export const WithAction: Story = {
  args: {
    align: "left",
    eyebrowStyle: "soft",
    title: "Not a member yet?",
    description: "14-day free trial. No credit card required.",
    children: (
      <div className="flex flex-wrap gap-4">
        <Button iconRight={<ArrowUpRight className="h-4 w-4" />}>Try for free</Button>
        <Button variant="outline">See pricing</Button>
      </div>
    ),
  },
};