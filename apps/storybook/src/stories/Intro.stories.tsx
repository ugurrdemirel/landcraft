import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Badge, ArrowRight, Palette, ShieldCheck, Gauge } from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Intro/Getting Started",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-[13px] font-medium text-primary">
    {children}
  </span>
);

export const Overview: StoryObj = {
  render: () => (
    <div className="mx-auto max-w-3xl space-y-12">
      <div className="space-y-5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Marketing component library
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          A React + Tailwind kit focused on landing pages. One design language: paper
          surface, ink text, a single accent color, tight typography. Every component ships with <strong className="text-foreground">multiple visual options</strong>.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag>React 18</Tag>
          <Tag>Tailwind 4</Tag>
          <Tag>Space Grotesk + DM Sans</Tag>
          <Tag>WCAG contrast</Tag>
          <Tag>Storybook 8</Tag>
        </div>
      </div>

      <section className="space-y-3 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Where are the options?</h2>
        <p className="leading-7 text-muted-foreground">
          Every component has stories under an "Options" heading. Options are{" "}
          <strong className="text-foreground">layouts</strong>, not skins — switching one changes how
          content is arranged, never the typography or color. For example, Navbar has{" "}
          <strong className="text-foreground">Classic</strong> and{" "}
          <strong className="text-foreground">Floating</strong>; Hero has{" "}
          <strong className="text-foreground">Split</strong>, <strong className="text-foreground">Centered</strong>,{" "}
          <strong className="text-foreground">Statement</strong> and <strong className="text-foreground">Parallax</strong>.
          Switch the <strong className="text-foreground">Palette</strong> from the top toolbar — everything
          adapts instantly through tokens. See <code className="rounded bg-surface-strong px-1.5 py-0.5 text-[13px]">DESIGN.md</code> for the contract.
        </p>
      </section>

      <section className="space-y-3 border-t border-border pt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground">
          <Palette className="h-5 w-5 text-primary" /> Contrast guarantee
        </h2>
        <ul className="space-y-3 leading-7 text-muted-foreground">
          <li className="flex gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Matched token pairs:</strong> every surface
              color comes with a <code className="rounded bg-surface-strong px-1.5 py-0.5 text-[13px]">--color-on-*</code>{" "}
              text color.
            </span>
          </li>
          <li className="flex gap-3">
            <Gauge className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Dynamic surfaces:</strong> in cases like gradient
              panels, emphasis bands, and hex <code className="rounded bg-surface-strong px-1.5 py-0.5 text-[13px]">customColor</code>,{" "}
              text color is computed in CSS with <code className="rounded bg-surface-strong px-1.5 py-0.5 text-[13px]">contrast-color()</code>.
              Change the palette and contrast never breaks.
            </span>
          </li>
        </ul>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-foreground">Color tokens</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-strong text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Token</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {[
                ["--color-primary", "79 70 229", "Primary accent"],
                ["--color-on-primary", "255 255 255", "Text on primary"],
                ["--color-secondary", "15 15 15", "Neutral ink (legacy skins retiring)"],
                ["--color-accent", "5 150 105", "Discount / success"],
                ["--color-background", "250 250 250", "Paper surface"],
                ["--color-foreground", "17 17 17", "Body text"],
                ["--color-surface", "255 255 255", "Card surface"],
                ["--font-display", "Space Grotesk", "Heading font"],
                ["--radius-2xl", "1.5rem", "Large corner radius"],
              ].map(([name, value, usage]) => (
                <tr key={name as string} className="transition-colors hover:bg-surface-strong/60">
                  <td className="px-4 py-3 font-mono text-[13px] text-primary">{name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{value}</td>
                  <td className="px-4 py-3 text-muted-foreground">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-2xl border border-border bg-surface p-8">
        <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-foreground">
          Try it
        </h3>
        <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
          Go to the "Components" section
        </Button>
      </div>
    </div>
  ),
};

export const ContrastInAction: StoryObj = {
  parameters: { layout: "padded" },
  render: () => {
    const colors = ["#1d4ed8", "#059669", "#b91c1c", "#eab308", "#ffffff", "#0f172a", "#7c3aed", "#0891b2"];
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <p className="leading-7 text-muted-foreground">
          Each button below uses a different <code className="rounded bg-surface-strong px-1.5 py-0.5 text-[13px]">customColor</code>{" "}
          value. Text color is chosen automatically based on each background's brightness:
        </p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <Button key={color} customColor={color}>
              {color}
            </Button>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" /> The same test in dark mode
          </h3>
          <p className="mb-5 text-sm leading-6 text-muted-foreground">
            Switch to <strong className="text-foreground">midnight (dark)</strong> from the toolbar:
            the same buttons keep the same colors, and the text stays readable. You can also open the
            Accessibility panel (addon-a11y) and see live contrast results.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge customColor="#22c55e">Green</Badge>
            <Badge customColor="#facc15">Yellow</Badge>
            <Badge customColor="#0ea5e9">Blue</Badge>
            <Badge customColor="#111111">Int</Badge>
          </div>
        </div>
      </div>
    );
  },
};