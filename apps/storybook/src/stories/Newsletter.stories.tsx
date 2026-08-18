import type { Meta, StoryObj } from "@storybook/react";
import { Newsletter } from "@marketing-ui/core";

const meta = {
  title: "Components/Newsletter",
  component: Newsletter,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["inline", "card", "underline"] },
  },
  args: {
    option: "inline",
    placeholder: "you@company.com",
    buttonLabel: "Join",
    successMessage: "Congrats, you're in!",
    note: "One email a month. Unsubscribe anytime.",
  },
} satisfies Meta<typeof Newsletter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Inline: Story = {
  name: "Option 1 · Inline",
  args: { option: "inline" },
  parameters: { layout: "padded" },
};

export const Option2_Card: Story = {
  name: "Option 2 · Card",
  args: { option: "card" },
  parameters: { layout: "padded" },
};

export const Option3_Underline: Story = {
  name: "Option 3 · Underline",
  args: { option: "underline", note: undefined },
  parameters: { layout: "padded" },
};