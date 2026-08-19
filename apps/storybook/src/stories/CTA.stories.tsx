import type { Meta, StoryObj } from "@storybook/react-vite";
import { CTA, Button, ArrowRight } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/CTA",
  component: CTA,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["panel", "surface", "inverse"] },
    align: { control: "radio", options: ["left", "center"] },
  },
  args: {
    option: "panel",
    align: "left",
    title: "Ready to get started today?",
    description: "14-day free trial, no credit card required. Set up in minutes.",
    action: (
      <Button
        style={{ backgroundColor: "rgb(var(--color-on-primary))", borderColor: "rgb(var(--color-on-primary))", color: "rgb(var(--color-primary))" }}
        iconRight={<ArrowRight className="h-4 w-4" />}
      >
        Try for free
      </Button>
    ),
    secondaryAction: (
      <Button variant="outline" className="border-white/30 text-current hover:bg-white/10">
        Talk to sales
      </Button>
    ),
  },
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1_Panel: Story = {
  name: "Option 1 · Panel (gradient)",
  args: { option: "panel" },
  parameters: {
    docs: {
      description: {
        story:
          "A soft gradient panel derived from brand tokens. Text color is computed from --color-primary luminance.",
      },
    },
  },
};

export const Option2_Surface: Story = {
  name: "Option 2 · Surface (paper)",
  args: {
    option: "surface",
    action: (
      <Button size="lg" variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>
        Try for free
      </Button>
    ),
    secondaryAction: <Button size="lg" variant="outline">Talk to sales</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: "A borderless paper band: hairline rule, oversized type, actions on the right.",
      },
    },
  },
};

export const Option3_Inverse: Story = {
  name: "Option 3 · Inverse (ink)",
  args: { option: "inverse" },
  parameters: {
    docs: {
      description: {
        story: "Ink background + grain texture. Contrast is computed from the --color-secondary token.",
      },
    },
  },
};

export const Centered: Story = {
  args: { option: "inverse", align: "center" },
};

/** The quiet surface option, centered — for a section footer or band. */
export const SurfaceCentered: Story = {
  name: "Surface · centered",
  args: {
    option: "surface",
    align: "center",
    action: (
      <Button size="lg" variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>
        Try for free
      </Button>
    ),
    secondaryAction: <Button size="lg" variant="outline">Talk to sales</Button>,
  },
};

/** All three treatments side by side, so the visual weight is easy to compare. */
export const AllOptions: Story = {
  name: "All options",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-10 p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">panel</p>
        <CTA
          option="panel"
          title="Ready to get started today?"
          description="14-day free trial, no credit card required."
          action={
            <Button
              style={{ backgroundColor: "rgb(var(--color-on-primary))", borderColor: "rgb(var(--color-on-primary))", color: "rgb(var(--color-primary))" }}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Try for free
            </Button>
          }
        />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">surface</p>
        <CTA
          option="surface"
          title="Ready to get started today?"
          action={
            <Button variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>
              Try for free
            </Button>
          }
        />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">inverse</p>
        <CTA
          option="inverse"
          title="Ready to get started today?"
          action={
            <Button className="bg-surface text-foreground hover:bg-surface-strong" iconRight={<ArrowRight className="h-4 w-4" />}>
              Try for free
            </Button>
          }
        />
      </div>
    </div>
  ),
};