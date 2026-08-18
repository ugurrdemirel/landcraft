import type { Meta, StoryObj } from "@storybook/react";
import { Pricing, type Plan } from "@marketing-ui/core";

const meta = {
  title: "Components/Pricing",
  component: Pricing,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["cards", "bento", "compact"] },
    defaultBilling: { control: "radio", options: ["monthly", "yearly"] },
  },
  args: {
    option: "cards",
    defaultBilling: "monthly",
    plans: [
      {
        name: "Starter",
        description: "For small projects",
        monthly: 9,
        yearly: 90,
        features: ["1 project", "5 pages", "Community support", "Basic analytics"],
        cta: "Get started",
      },
      {
        name: "Professional",
        description: "For growing startups",
        monthly: 29,
        yearly: 290,
        highlighted: true,
        features: [
          "Unlimited projects",
          "Unlimited pages",
          "Priority support",
          "Advanced analytics",
          "API access",
        ],
        cta: "Go Professional",
      },
      {
        name: "Enterprise",
        description: "For scale",
        monthly: null,
        yearly: null,
        features: ["SLA", "Custom integrations", "Dedicated account manager"],
        cta: "Contact us",
      },
    ],
  },
} satisfies Meta<typeof Pricing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Cards: Story = {
  name: "Option 1 · Cards",
  args: { option: "cards" },
};

export const Option2_Bento: Story = {
  name: "Option 2 · Bento",
  args: { option: "bento" },
};

export const Option3_Compact: Story = {
  name: "Option 3 · Compact rows",
  args: { option: "compact" },
};

export const CustomColorHighlight: Story = {
  name: "Highlight with customColor",
  render: (args) => (
    <Pricing
      {...args}
      option="cards"
      plans={
        [
          { ...(args.plans as Plan[])[0] },
          { ...(args.plans as Plan[])[1], highlighted: true, customColor: "#065f46" },
          { ...(args.plans as Plan[])[2] },
        ] as Plan[]
      }
    />
  ),
};