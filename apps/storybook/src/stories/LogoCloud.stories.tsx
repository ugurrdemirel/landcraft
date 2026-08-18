import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoCloud } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/LogoCloud",
  component: LogoCloud,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["quiet", "marquee", "strip"] },
  },
  args: {
    title: "Teams we work with",
    logos: [
      { name: "Acme" },
      { name: "Globex" },
      { name: "Initech" },
      { name: "Soylent" },
      { name: "Umbrella" },
      { name: "Wayne" },
      { name: "Stark" },
      { name: "Hooli" },
    ],
  },
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Quiet: Story = {
  name: "Option 1 · Quiet",
  args: { option: "quiet" },
};

export const Option2_Marquee: Story = {
  name: "Option 2 · Marquee",
  args: { option: "marquee" },
};

export const Option3_Strip: Story = {
  name: "Option 3 · Hairline strip",
  args: { option: "strip" },
};