import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Hero,
  Button,
  ArrowRight,
  Play,
  Star,
  Users,
  Rocket,
} from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["split", "centered", "statement"] },
  },
  args: {
    variant: "split",
    eyebrow: "New release 2.0",
    title: "Ship your ideas in minutes",
    description:
      "A ready-made component library for marketing pages, adaptable to your brand. Colors come from tokens; contrast is never a concern.",
    primaryAction: (
      <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
        Start for free
      </Button>
    ),
    secondaryAction: (
      <Button size="lg" variant="outline" iconLeft={<Play className="h-4 w-4" />}>
        Live demo
      </Button>
    ),
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const MediaWindow = () => (
  <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-soft">
    <div className="flex items-center gap-1.5 px-3 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="ml-3 text-xs text-muted-foreground">app.acurio.com</span>
    </div>
    <div className="grid aspect-[16/10] place-items-center rounded-lg bg-surface-strong">
      <div className="text-center text-sm text-muted-foreground">Product screenshot</div>
    </div>
  </div>
);

const metaRow = [
  { label: "4.9/5 rating", icon: <Star className="h-4 w-4" /> },
  { label: "12K+ users", icon: <Users className="h-4 w-4" /> },
  { label: "60s setup", icon: <Rocket className="h-4 w-4" /> },
];

/** Option 1 · Split — editorial: large type on the left, media on the right, meta row at the bottom. */
export const Option1_Split: Story = {
  name: "Option 1 · Split",
  args: {
    variant: "split",
    media: <MediaWindow />,
    meta: metaRow,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Editorial split layout: oversized type on the left, product visual on the right, hairline meta row.",
      },
    },
  },
};

/** Option 2 · Centered — a single message, generous spacing, hairline-divided meta. */
export const Option2_Centered: Story = {
  name: "Option 2 · Centered",
  args: {
    variant: "centered",
    media: <MediaWindow />,
    meta: metaRow,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Centered oversized headline; meta items separated by hairline rules.",
      },
    },
  },
};

/** Option 3 · Statement — full-width ink band. No eyebrow, just the message. */
export const Option3_Statement: Story = {
  name: "Option 3 · Statement",
  args: {
    variant: "statement",
    eyebrow: undefined,
    title: <>Build. Ship. <span style={{ fontStyle: "italic" }}>Grow.</span></>,
    description:
      "The landing page grind is over. Text color is computed from the --color-secondary token; readable in every palette.",
    primaryAction: (
      <Button size="lg" className="bg-surface text-foreground hover:bg-surface-strong" iconRight={<ArrowRight className="h-4 w-4" />}>
        Get started
      </Button>
    ),
    secondaryAction: (
      <Button size="lg" variant="outline" className="border-white/25 text-current hover:bg-white/10">
        Contact us
      </Button>
    ),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Full-width ink statement block. No eyebrow shown on top.",
      },
    },
  },
};