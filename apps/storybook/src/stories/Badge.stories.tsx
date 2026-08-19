import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Zap, ShieldCheck } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["solid", "soft", "outline", "dot"] },
    size: { control: "select", options: ["sm", "md"] },
    customColor: { control: "color" },
  },
  args: { children: "New release" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = { args: { variant: "solid" } };
export const Soft: Story = { args: { variant: "soft" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Dot: Story = { args: { variant: "dot" } };
export const WithIcon: Story = { args: { variant: "soft", icon: <Zap className="h-3.5 w-3.5" /> } };

/** All four variants side by side, at both sizes. */
export const AllOptions: Story = {
  name: "All variants · both sizes",
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="soft">Soft</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="dot">Online</Badge>
        <Badge variant="soft" icon={<Zap className="h-3.5 w-3.5" />}>Fast</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="solid" size="sm">Solid · sm</Badge>
        <Badge variant="soft" size="sm">Soft · sm</Badge>
        <Badge variant="outline" size="sm">Outline · sm</Badge>
        <Badge variant="dot" size="sm">Online · sm</Badge>
        <Badge variant="soft" size="sm" icon={<Zap className="h-3.5 w-3.5" />}>Fast · sm</Badge>
      </div>
    </div>
  ),
};

/** Real use: status / meta labels as they appear on a card or in a page header. */
export const UseCases: Story = {
  name: "Use cases",
  args: {},
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="dot">All systems operational</Badge>
        <Badge variant="outline">v2.4.0</Badge>
        <Badge variant="soft" icon={<ShieldCheck className="h-3.5 w-3.5" />}>SOC 2</Badge>
        <Badge variant="solid" size="sm">New</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="soft">Stable</Badge>
        <Badge customColor="#b45309" size="sm">Beta</Badge>
        <Badge variant="outline" size="sm">Docs</Badge>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  args: { customColor: "#d946ef", variant: "solid" },
  parameters: {
    docs: {
      description: {
        story: "Text color is computed automatically from the background brightness.",
      },
    },
  },
};