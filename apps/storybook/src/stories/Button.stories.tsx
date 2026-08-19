import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ArrowRight, ArrowUpRight, Play, Menu, Zap } from "@ugurdemirel/landcraft";

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
    asChild: { control: "boolean" },
    disabled: { control: "boolean" },
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
        <Button variant="ghost" iconRight={<ArrowRight className="h-4 w-4" />}>Read more</Button>
      </Row>
    </div>
  ),
};

/** Icon-only buttons — for compact controls like menu, close, or next-step actions. */
export const IconOnly: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Pass only `iconLeft` (or `iconRight`) without children. Remember an `aria-label` for icon-only buttons.",
      },
    },
  },
  render: () => (
    <Row>
      <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />} aria-label="Next step" />
      <Button iconRight={<Menu className="h-4 w-4" />} aria-label="Open menu" />
      <Button size="lg" variant="dark" iconRight={<ArrowRight className="h-4 w-4" />} aria-label="Get started" />
    </Row>
  ),
};

/** All variants on an ink surface — shows how `dark` and `outline` adapt to dark contexts. */
export const OnInkSurface: Story = {
  args: {},
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The same variants on a `--color-secondary` (ink) background. `dark` uses the ink token, `outline`/`ghost` expect a light surface — tint them with a class when needed.",
      },
    },
  },
  render: () => (
    <div className="rounded-2xl bg-secondary p-10">
      <Row>
        <Button className="bg-surface text-foreground hover:bg-surface-strong">On-brand light</Button>
        <Button variant="outline" className="border-white/25 text-current hover:bg-white/10">Outline</Button>
        <Button variant="ghost" className="text-current hover:bg-white/10">Ghost</Button>
        <Button variant="link" className="text-current">Link</Button>
      </Row>
    </div>
  ),
};

/** `asChild` — apply button styling to any element, e.g. a Next.js/Remix router `<Link>`. */
export const AsChild: Story = {
  name: "asChild · router Link",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Set `asChild` and wrap a single child. The button styles are merged onto that child (via Slot), so framework `<Link>`s, anchors, or even React Router `<NavLink>`s keep native navigation while looking like a button.",
      },
    },
  },
  render: () => (
    <Row>
      <Button asChild size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
        <a href="#pricing">Anchor with asChild</a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#features">Another variant</a>
      </Button>
    </Row>
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

export const CustomColorRow: Story = {
  name: "customColor · palette row",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <Row>
      {["#1d4ed8", "#059669", "#b91c1c", "#eab308", "#7c3aed", "#0891b2", "#111111"].map((color) => (
        <Button key={color} customColor={color} iconRight={undefined}>
          {color}
        </Button>
      ))}
    </Row>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full-width primary button" },
  parameters: { layout: "padded" },
};

export const Disabled: Story = {
  args: { disabled: true, iconRight: undefined, children: "Disabled" },
};

/** State demo — paired loading style using the icon layout conventions. */
export const WithIcons: Story = {
  name: "Icon positions",
  args: {},
  render: () => (
    <Row>
      <Button variant="primary" iconLeft={<Zap className="h-4 w-4" />}>Leading icon</Button>
      <Button variant="dark" iconRight={<ArrowUpRight className="h-4 w-4" />}>Trailing icon</Button>
      <Button variant="outline" iconLeft={<Play className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Both</Button>
    </Row>
  ),
};