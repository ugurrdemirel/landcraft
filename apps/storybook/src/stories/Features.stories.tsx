import type { Meta, StoryObj } from "@storybook/react";
import {
  FeatureGrid,
  Zap,
  Palette,
  Smartphone,
  ShieldCheck,
  Layers,
  Gauge,
  Cpu,
} from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Features",
  component: FeatureGrid,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["columns", "bento", "editorialRows"] },
    columns: { control: "radio", options: [2, 3, 4] },
  },
  args: {
    option: "columns",
    columns: 3,
    features: [
      {
        icon: <Zap className="h-5 w-5" />,
        title: "Lightning-fast setup",
        description: "Go live in minutes with zero config; zero build issues.",
      },
      {
        icon: <Palette className="h-5 w-5" />,
        title: "Token-based theming",
        description: "Colors come from one place; contrast is computed automatically.",
      },
      {
        icon: <Smartphone className="h-5 w-5" />,
        title: "Fully responsive",
        description: "Flawless on every screen, from desktop to phone.",
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Accessible",
        description: "WCAG-compliant focus rings, ARIA labels, and contrast.",
      },
      {
        icon: <Gauge className="h-5 w-5" />,
        title: "Measurable conversions",
        description: "A/B-testable, analytics-friendly sections.",
      },
      {
        icon: <Layers className="h-5 w-5" />,
        title: "Composable",
        description: "Assemble Hero + Features + Pricing in a single template.",
      },
    ],
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Columns: Story = {
  name: "Option 1 · Columns",
  args: { option: "columns" },
};

export const Option2_Bento: Story = {
  name: "Option 2 · Bento",
  args: { option: "bento" },
};

export const Option3_EditorialRows: Story = {
  name: "Option 3 · Editorial Rows",
  args: { option: "editorialRows" },
};

export const FourColumns: Story = {
  args: { option: "columns", columns: 4, features: [
    { icon: <Cpu className="h-5 w-5" />, title: "Performance", description: "Smooth 60fps animation." },
    { icon: <Gauge className="h-5 w-5" />, title: "Metrics", description: "Real-time reports." },
    { icon: <Layers className="h-5 w-5" />, title: "Layers", description: "Modular structure." },
    { icon: <Smartphone className="h-5 w-5" />, title: "Mobile", description: "Mobile-first." },
  ] },
};