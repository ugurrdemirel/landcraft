import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stats, Users, Globe, Zap, BarChart, Clock } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Stats",
  component: Stats,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["stacked", "divided", "cells", "ticker"] },
    columns: { control: "radio", options: [2, 3, 4] },
  },
  args: {
    option: "stacked",
    columns: 4,
    stats: [
      { value: "12.4K", suffix: "", label: "Active users", delta: 18.2, icon: <Users className="h-5 w-5" />, sub: "+2.1K last month" },
      { value: "1.8", suffix: "ms", label: "Median response", delta: -24.6, icon: <BarChart className="h-5 w-5" />, sub: "After optimization" },
      { value: "98", suffix: "%", label: "Satisfaction", delta: 4.1, accent: true, icon: <Globe className="h-5 w-5" />, sub: "Average NPS survey score" },
      { value: "99.99", suffix: "%", label: "Uptime", icon: <Clock className="h-5 w-5" />, sub: "Last 90 days" },
    ],
  },
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

const growth = [
  { value: "12.4K", suffix: "", label: "Active users", delta: 18.2 },
  { value: "1.8", suffix: "ms", label: "Median response", delta: -24.6 },
  { value: "98", suffix: "%", label: "Satisfaction", delta: 4.1, accent: true },
  { value: "99.99", suffix: "%", label: "Uptime", delta: 0 },
];

export const Option1_Stacked: Story = {
  name: "Option 1 · Stacked",
  args: { option: "stacked", stats: growth },
  parameters: {
    docs: {
      description: {
        story: "Ruled ledger: sentence-case label on the rule, oversized Space Grotesk numeral, typed delta and supporting copy below.",
      },
    },
  },
};

export const Option2_Divided: Story = {
  name: "Option 2 · Divided",
  args: {
    option: "divided",
    stats: [
      { value: "12.4K", suffix: "", label: "Active users" },
      { value: "1.8", suffix: "ms", label: "Median response" },
      { value: "98", suffix: "%", label: "Satisfaction", accent: true },
      { value: "99.99", suffix: "%", label: "Uptime" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Centered numerals in a symmetric run, divided by true vertical hairlines. Quiet and even.",
      },
    },
  },
};

export const Option3_Cells: Story = {
  name: "Option 3 · Cells",
  args: {
    option: "cells",
    columns: 4,
    stats: [
      { value: "12.4K", suffix: "", label: "Active users", icon: <Users className="h-5 w-5" /> },
      { value: "1.8", suffix: "ms", label: "Median response", icon: <BarChart className="h-5 w-5" /> },
      { value: "98", suffix: "%", label: "Satisfaction", accent: true, icon: <Globe className="h-5 w-5" /> },
      { value: "38", suffix: "", label: "Connected systems", icon: <Zap className="h-5 w-5" /> },
    ],
  },
  parameters: { docs: { description: { story: "One framed spec matrix — cells separated by real hairlines, not detached cards. Label sits opposite the icon." } } },
};

export const Option4_Ticker: Story = {
  name: "Option 4 · Ticker",
  args: {
    option: "ticker",
    stats: growth.map((g, i) => ({
      ...g,
      sub: ["+2.1K last month", "After optimization", "Average NPS survey score", "Last 90 days"][i],
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "One horizontal readout band, ruled top and bottom. Delta marks are type, not pills: the arrow carries accent/danger, the figure stays high-contrast, zero reads neutral.",
      },
    },
  },
};

export const Deltas: Story = {
  name: "Delta badges (accent/danger)",
  args: {},
  parameters: { layout: "padded", docs: { description: { story: "Arrow tint: delta < 0 → danger, delta > 0 → accent, delta = 0 → neutral." } } },
  render: () => (
    <div className="mx-auto max-w-3xl">
      <Stats
        option="stacked"
        columns={3}
        stats={[
          { value: "+24.6%", label: "Conversions", delta: 24.6 },
          { value: "-8.1%", label: "Startup cost", delta: -8.1 },
          { value: "0.0%", label: "Change", delta: 0 },
        ]}
      />
    </div>
  ),
};

export const WithCurrency: Story = {
  name: "Currency (₺)",
  args: {
    option: "cells",
    stats: [
      { value: "2.4M", suffix: "₺", label: "Monthly recurring", accent: true },
      { value: "312", suffix: "", label: "Active subscribers" },
      { value: "18.4", suffix: "%", label: "Upsell", delta: 12.1 },
    ],
  },
};

export const LongContent: Story = {
  name: "Long content (no delta)",
  args: {},
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Real copy at width: long labels and values, missing deltas, and a dangling final row must not overflow or break the rules.",
      },
    },
  },
  render: () => (
    <div className="mx-auto max-w-6xl space-y-16">
      <Stats
        option="stacked"
        columns={3}
        stats={[
          {
            value: "12,480,921",
            label: "Monthly active accounts",
            sub: "Across every connected workspace",
          },
          { value: "99.998", suffix: "%", label: "Rolling 90-day uptime", accent: true },
          { value: "3.2", suffix: "s", label: "Median time to first value" },
        ]}
      />
      <Stats
        option="cells"
        columns={2}
        stats={[
          {
            value: "1,284",
            label: "Enterprise seats provisioned",
            icon: <Users className="h-5 w-5" />,
          },
          {
            value: "42,918",
            label: "Events ingested per second",
            icon: <Zap className="h-5 w-5" />,
          },
        ]}
      />
    </div>
  ),
};