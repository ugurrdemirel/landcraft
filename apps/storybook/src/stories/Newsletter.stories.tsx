import type { Meta, StoryObj } from "@storybook/react-vite";
import { Newsletter } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Newsletter",
  component: Newsletter,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["inline", "card", "underline"] },
  },
  args: {
    option: "inline",
    placeholder: "you@company.com",
    buttonLabel: "Join",
    successMessage: "Congrats, you're in!",
    note: "One email a month. Unsubscribe anytime.",
  },
} satisfies Meta<typeof Newsletter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three layouts side by side, so their visual weight is easy to compare. */
export const AllOptions: Story = {
  name: "All options",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-5xl space-y-12 p-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">inline</p>
        <div className="max-w-xl">
          <Newsletter option="inline" placeholder="you@company.com" />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">card</p>
        <div className="max-w-sm">
          <Newsletter option="card" placeholder="you@company.com" note="Once a month. No spam." />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">underline</p>
        <div className="max-w-md">
          <Newsletter option="underline" placeholder="you@company.com" />
        </div>
      </div>
    </div>
  ),
};

export const Option1_Inline: Story = {
  name: "Option 1 · Inline",
  args: { option: "inline" },
  parameters: { layout: "padded" },
};

export const Option2_Card: Story = {
  name: "Option 2 · Card",
  args: { option: "card" },
  parameters: { layout: "padded" },
};

export const Option3_Underline: Story = {
  name: "Option 3 · Underline",
  args: { option: "underline", note: undefined },
  parameters: { layout: "padded" },
};

/** Use inside a hero or section copy block — inline form under a short heading. */
export const InHeroContext: Story = {
  name: "In a section copy block",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8">
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
        Get early access
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Join a private beta and shape the roadmap with us. We'll email once a month.
      </p>
      <div className="mt-6">
        <Newsletter option="inline" buttonLabel="Notify me" note="No spam, unsubscribe anytime." />
      </div>
    </div>
  ),
};

/** The card option on an ink (--color-secondary) surface — for footer or CTA bands. */
export const OnInkSurface: Story = {
  name: "Card · on ink surface",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="rounded-2xl bg-secondary p-10">
      <div className="mx-auto max-w-md">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wider text-on-secondary/60">
          Newsletter
        </p>
        <h3 className="text-center font-display text-2xl font-semibold tracking-tight text-on-secondary">
          The monthly digest
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-on-secondary/70">
          Product updates, design notes, and the occasional special. Read once, act once.
        </p>
        <div className="mt-6">
          <Newsletter option="card" buttonLabel="Subscribe" placeholder="you@company.com" />
        </div>
      </div>
    </div>
  ),
};