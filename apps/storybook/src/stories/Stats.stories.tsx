import type { Meta, StoryObj } from "@storybook/react";
import { Stats, Users, Globe, Zap, BarChart, Clock } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Stats",
  component: Stats,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["editorial", "hairline", "cells", "ticker"] },
    columns: { control: "radio", options: [2, 3, 4] },
  },
  args: {
    option: "editorial",
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

export const Option1_Editorial: Story = {
  name: "Option 1 · Editorial",
  args: { option: "editorial", stats: growth },
  parameters: {
    docs: {
      description: {
        story: "Label on top, hairline rule, oversized type; optional growth/decline badge.",
      },
    },
  },
};

export const Option2_Hairline: Story = {
  name: "Option 2 · Hairline",
  args: {
    option: "hairline",
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
        story: "Numbers side by side, separated by hairline rules. Quiet and symmetrical.",
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
  parameters: { docs: { description: { story: "Quiet cells with icon + value." } } },
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
        story: "Horizontal band; growth uses `--color-accent`, decline uses `--color-danger` (semantic token).",
      },
    },
  },
};

export const Deltas: Story = {
  name: "Delta badges (accent/danger)",
  args: {},
  parameters: { layout: "padded", docs: { description: { story: "delta < 0 → danger, delta > 0 → accent, delta ≈ 0 → neutral." } } },
  render: () => (
    <div className="mx-auto max-w-3xl">
      <Stats
        option="editorial"
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