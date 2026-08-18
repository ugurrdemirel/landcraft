import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ArrowRight, Play } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "dark", "outline", "ghost", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    customColor: { control: "color" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Start now",
    iconRight: <ArrowRight className="h-4 w-4" />,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-4 p-6">{children}</div>
);

export const Primary: Story = { args: { variant: "primary", iconRight: undefined, children: "Primary button" } };
export const Dark: Story = { args: { variant: "dark", iconRight: undefined, children: "Dark / ink button" } };
export const Outline: Story = { args: { variant: "outline", iconRight: undefined, children: "Outline button" } };
export const Ghost: Story = { args: { variant: "ghost", iconRight: undefined, children: "Ghost button" } };
export const Link: Story = { args: { variant: "link", iconRight: undefined, children: "Link button" } };

export const Sizes: Story = {
  args: {},
  render: () => (
    <Row>
      <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>Small</Button>
      <Button size="md" iconRight={<ArrowRight className="h-4 w-4" />}>Medium</Button>
      <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>Large</Button>
    </Row>
  ),
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <Row>
        <Button variant="primary">Primary</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Row>
      <Row>
        <Button variant="primary" iconLeft={<Play className="h-4 w-4" />}>Watch video</Button>
        <Button variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>Start</Button>
        <Button variant="outline">Log in</Button>
      </Row>
    </div>
  ),
};

export const CustomColor: Story = {
  args: { customColor: "#0ea5e9", iconRight: undefined, children: "customColor" },
  parameters: {
    docs: {
      description: {
        story:
          "Use any color with the `customColor` prop — the text color is computed automatically with the WCAG luminance formula.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full-width primary button" },
  parameters: { layout: "padded" },
};

export const Disabled: Story = {
  args: { disabled: true, iconRight: undefined, children: "Disabled" },
};