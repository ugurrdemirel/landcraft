import type { Meta, StoryObj } from "@storybook/react-vite";
import { FAQ } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/FAQ",
  component: FAQ,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["accordion", "split", "cards"] },
  },
  args: {
    option: "accordion",
    eyebrow: "Frequently asked",
    title: "Everything you've been wondering",
    description: "If you can't find what you're looking for, our support team has your back.",
    items: [
      {
        question: "How do I install the components?",
        answer:
          "Install the package with `pnpm add @ugurdemirel/landcraft` and import `@ugurdemirel/landcraft/styles.css`. You can override the color tokens in your own CSS.",
      },
      {
        question: "How do I change the colors?",
        answer:
          "All colors are `--color-*` variables on `:root`. Set your brand color in one line; matching text colors and contrast come automatically.",
      },
      {
        question: "Will I run into contrast problems?",
        answer:
          "No. Styles use matched token pairs; on dynamic backgrounds, text color is computed with the WCAG luminance formula.",
      },
      {
        question: "Can I use it in my own project?",
        answer:
          "Yes. Combine components like Button, Section, and Pricing according to a single blueprint, so you don't have to write them from scratch for every startup.",
      },
    ],
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Accordion: Story = {
  name: "Option 1 · Accordion",
  args: { option: "accordion" },
};

export const Option2_Split: Story = {
  name: "Option 2 · Split (sticky aside)",
  args: { option: "split" },
};

export const Option3_Cards: Story = {
  name: "Option 3 · Cards",
  args: { option: "cards" },
};