import type { Meta, StoryObj } from "@storybook/react-vite";
import { AccordionShowcase } from "@ugurdemirel/landcraft";

/**
 * A lightweight device mockup so the story reads without image assets.
 * Swap these for real product screenshots in your own pages.
 */
function LaptopVisual() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
        <div className="flex items-center gap-1.5 border-b border-border pb-2">
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
        </div>
        <div className="mt-3 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary-soft via-surface-strong to-accent/10" />
      </div>
      <div className="mx-auto h-1.5 w-24 rounded-b-xl bg-foreground/20" />
    </div>
  );
}

function DeviceVisual({ variant }: { variant: "phone" | "tablet" }) {
  const isPhone = variant === "phone";
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      <div className={`relative rounded-xl border border-border bg-surface shadow-raised ${isPhone ? "h-80 w-44" : "h-80 w-64"}`}>
        <div className="mt-2 h-2 w-16 rounded-full bg-foreground/20" style={{ marginInline: "auto" }} />
        <div className="mx-3 mt-3 rounded-lg bg-gradient-to-br from-primary-soft to-accent/10" style={{ height: isPhone ? "86%" : "88%" }} />
      </div>
    </div>
  );
}

const meta = {
  title: "Components/AccordionShowcase",
  component: AccordionShowcase,
  tags: ["autodocs"],
  argTypes: {
    defaultActive: { control: { type: "number" } },
  },
  parameters: { layout: "padded" },
  args: {
    defaultActive: 0,
    items: [
      {
        title: "Pro and Mobile",
        description:
          "Answer calls or messages from your phone directly on your laptop. Copy images, video, or text from your phone, then paste into another app on your nearby computer. And thanks to sync, you can access your files from either device.",
        visual: <DeviceVisual variant="phone" />,
      },
      {
        title: "Pro and Tablet",
        description:
          "Use your tablet as a second display for your computer — or extend your workspace with a shared pointer and keyboard across both screens.",
        visual: <DeviceVisual variant="tablet" />,
      },
      {
        title: "Pro and Wearable",
        description:
          "Unlock your computer automatically when you're wearing your wearable. Approve password prompts and get all your notifications at a glance.",
        visual: <LaptopVisual />,
      },
    ],
  },
} satisfies Meta<typeof AccordionShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Overview",
};

export const SecondItemOpen: Story = {
  name: "Second item open",
  args: { defaultActive: 1 },
  parameters: {
    docs: {
      description: {
        story: "`defaultActive` controls which item is expanded on first render.",
      },
    },
  },
};
