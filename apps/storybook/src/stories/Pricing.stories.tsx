import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pricing, type Plan } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Pricing",
  component: Pricing,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["cards", "bento", "compact"] },
    defaultBilling: { control: "radio", options: ["monthly", "yearly"] },
    yearlyBadge: { control: "text", description: "Badge text next to Yearly in the billing toggle" },
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

export const YearlyBadge: Story = {
  name: "Custom yearly badge",
  render: (args) => (
    <Pricing {...args} option="bento" yearlyBadge="2 months free" />
  ),
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

/** The highlight card can be any brand color via `customColor` — text is computed automatically. */
export const CustomColorPalette: Story = {
  name: "customColor palette",
  args: { option: "cards" },
  parameters: { docs: { description: { story: "Paste a `customColor` on the highlighted plan to match any brand without touching CSS." } } },
  render: (args) => (
    <div className="space-y-10">
      {["#065f46", "#7c3aed", "#b91c1c"].map((color) => (
        <Pricing
          key={color}
          {...args}
          option="compact"
          plans={[
            { name: "Starter", monthly: 9, yearly: 90, features: ["1 project", "Basic analytics"], cta: "Get started" },
            { name: "Pro", monthly: 29, yearly: 290, highlighted: true, customColor: color, features: ["Unlimited projects", "Advanced analytics"], cta: "Go Pro" },
            { name: "Enterprise", monthly: null, yearly: null, features: ["SLA", "Dedicated support"], cta: "Contact us" },
          ]}
        />
      ))}
    </div>
  ),
};