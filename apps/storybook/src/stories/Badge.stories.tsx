import type { Meta, StoryObj } from "@storybook/react";
import { Badge, Zap } from "@ugurdemirel/landcraft";

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

export const AllOptions: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Online</Badge>
      <Badge variant="soft" icon={<Zap className="h-3.5 w-3.5" />}>Fast</Badge>
    </div>
  ),
};