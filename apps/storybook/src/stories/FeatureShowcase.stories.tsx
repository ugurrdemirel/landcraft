import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureShowcase, Box, Sliders, BarChart } from "@ugurdemirel/landcraft";

/** A self-contained control-panel mockup shown on the left. */
function DashboardVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary shadow-overlay">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-transparent opacity-30" />
      <div className="relative m-4 rounded-xl border border-white/10 bg-secondary p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-8 w-8 rounded-full bg-primary" />
          <div className="space-y-1.5">
            <div className="h-2 w-28 rounded-full bg-white/25" />
            <div className="h-2 w-20 rounded-full bg-white/15" />
          </div>
          <div className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-14 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["5868", "$96,442", "Satisfaction"].map((label) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="h-2 w-16 rounded-full bg-white/20" />
              <p className="mt-2 font-display text-xl font-semibold text-white">{label}</p>
              <div className="mt-2 h-1.5 w-10 rounded-full bg-accent" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="h-2 w-24 rounded-full bg-white/20" />
          <div className="mt-4 flex h-16 items-end gap-2">
            {[36, 58, 42, 70, 52, 64, 46].map((h, j) => (
              <div key={j} className="flex-1 rounded-t bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Components/FeatureShowcase",
  component: FeatureShowcase,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Why Landcraft",
    title: "A better way to manage everything",
    description:
      "Bring your workflows, data, and team operations into one organized workspace. Designed to help you move faster, stay aligned.",
    visual: <DashboardVisual />,
    items: [
      {
        icon: <Box className="h-5 w-5" />,
        title: "Unified workspace",
        description:
          "Keep tasks, data, and team operations connected in one organized and easy-to-manage platform.",
        href: "#workspace",
      },
      {
        icon: <Sliders className="h-5 w-5" />,
        title: "Workflow automation",
        description:
          "Simplify recurring processes and keep work moving with less manual effort and more consistency.",
        href: "#automation",
      },
      {
        icon: <BarChart className="h-5 w-5" />,
        title: "Actionable analytics",
        description:
          "Turn daily activity into clear insights that help your team make faster and smarter decisions.",
        href: "#analytics",
      },
    ],
  },
} satisfies Meta<typeof FeatureShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Overview",
};

/** `mediaSide` moves the visual right; `link` slot lets you render a router link instead of a plain anchor. */
export const MediaRightWithLinkSlot: Story = {
  name: "Media right + slot link",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "`mediaSide=\"right\"` swaps the visual to the right. Items can pass a `link` slot (here an `<a>`, but any router `Link` works) which replaces the default anchor entirely.",
      },
    },
  },
  args: {
    mediaSide: "right",
    items: [
      {
        icon: <Box className="h-5 w-5" />,
        title: "Unified workspace",
        description:
          "Keep tasks, data, and team operations connected in one organized and easy-to-manage platform.",
        link: (
          <a
            href="#workspace"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore the workspace
          </a>
        ),
      },
      {
        icon: <Sliders className="h-5 w-5" />,
        title: "Workflow automation",
        description:
          "Simplify recurring processes and keep work moving with less manual effort and more consistency.",
        href: "#automation",
      },
    ],
  },
};
