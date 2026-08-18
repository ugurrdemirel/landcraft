import type { Meta, StoryObj } from "@storybook/react";
import { Container, Stack, Button, Badge } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Layout",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
    gutters: { control: "boolean" },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Sample = ({ label }: { label: string }) => (
  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border bg-surface text-sm text-muted-foreground">
    {label}
  </div>
);

/** Single-source container — sections, footer, and CTA all use it. */
export const Sizes: Story = {
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <Stack gap={6}>
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Container key={size} size={size}>
          <Sample label={`size=${size}`} />
        </Container>
      ))}
    </Stack>
  ),
};

export const NoGutters: Story = {
  args: { gutters: false },
  parameters: { layout: "padded" },
  render: () => (
    <div className="border border-border">
      <Container gutters={false}>
        <Sample label="gutters=false → edge to edge" />
      </Container>
    </div>
  ),
};

export const AsSection: Story = {
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <Container as="section" size="xl" className="space-y-6 rounded-2xl border border-border bg-surface-strong p-5 sm:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        as="section" + className
      </h2>
      <p className="text-muted-foreground">
        You can give Container any element and additional classes.
      </p>
      <Stack horizontal gap={3}>
        <Button size="sm">Button</Button>
        <Badge variant="soft" size="sm">Badge</Badge>
      </Stack>
    </Container>
  ),
};

/** Vertical rhythm helper — spacing management with `gap`. */
export const StackDemo: Story = {
  name: "Stack (vertical rhythm)",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <Container size="sm">
      <Stack gap={8}>
        <Sample label="gap=8" />
        <Stack gap={2}>
          <Sample label="nested stack · gap=2" />
          <Sample label="nested stack · gap=2" />
        </Stack>
        <Sample label="gap=8" />
      </Stack>
    </Container>
  ),
};