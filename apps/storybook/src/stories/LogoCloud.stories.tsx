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

/** Without a title, the cloud reads as a plain trust strip. */
export const NoTitle: Story = {
  name: "Quiet · no title",
  args: { option: "quiet", title: undefined },
  parameters: { layout: "padded" },
};

/** Each logo can link somewhere via `href`. */
export const LinkedLogos: Story = {
  name: "Strip · linked logos",
  args: {
    option: "strip",
    title: "Featuring",
    logos: [
      { name: "Acme", href: "#" },
      { name: "Globex", href: "#" },
      { name: "Initech", href: "#" },
      { name: "Soylent", href: "#" },
      { name: "Umbrella", href: "#" },
      { name: "Wayne", href: "#" },
    ],
  },
  parameters: { layout: "padded" },
};

/** All three options in one view — pick the right weight for your section. */
export const AllOptions: Story = {
  name: "All options",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-4xl space-y-14 p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">quiet</p>
        <LogoCloud option="quiet" logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Soylent" }]} />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">strip</p>
        <LogoCloud option="strip" logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Soylent" }]} />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">marquee</p>
        <LogoCloud option="marquee" logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Soylent" }]} />
      </div>
    </div>
  ),
};