import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  ArrowUpRight,
  BarChart,
  DollarSign,
  Users,
} from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["outlined", "elevated", "inset"] },
    interactive: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = ({
  className,
  ...cardProps
}: { className?: string } & React.ComponentProps<typeof Card>) => (
  <Card className={className} {...cardProps}>
    <CardHeader
      icon={
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      }
    >
      <CardTitle>Your analytics dashboard</CardTitle>
      <CardDescription>Real-time metrics and smart suggestions on one screen.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm leading-6 text-foreground/80">
        This card is a composite showing header, content, and footer blocks. Borders and
        spacing align with the type system.
      </p>
    </CardContent>
    <CardFooter>
      <Button size="sm">Try now</Button>
      <Badge variant="soft" size="sm">Free</Badge>
    </CardFooter>
  </Card>
);

export const Outlined: Story = {
  args: { variant: "outlined" },
  render: () => (
    <div className="max-w-sm p-6">
      <Demo />
    </div>
  ),
};

export const Elevated: Story = {
  args: { variant: "elevated" },
  render: () => (
    <div className="max-w-sm p-6">
      <Demo className="shadow-raised" />
    </div>
  ),
};

export const Inset: Story = {
  args: { variant: "inset" },
  render: () => (
    <div className="max-w-sm p-6">
      <Demo className="border-0" />
    </div>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: () => (
    <div className="max-w-sm p-6">
      <Demo interactive />
    </div>
  ),
};

/** The three surface treatments side by side. */
export const VariantComparison: Story = {
  name: "Variant comparison",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid gap-6 p-6 sm:grid-cols-3">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">outlined</p>
        <Demo />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">elevated</p>
        <Demo variant="elevated" />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">inset</p>
        <div className="-m-3 rounded-2xl bg-surface-strong/50 p-3">
          <Demo variant="inset" className="border-0" />
        </div>
      </div>
    </div>
  ),
};

/** Compact stat card — a common marketing "metric" tile. */
export const StatTile: Story = {
  name: "Stat tile",
  args: {},
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid max-w-4xl gap-4 p-6 sm:grid-cols-3">
      {[
        { icon: <DollarSign className="h-5 w-5" />, label: "MRR", value: "$2.4M" },
        { icon: <Users className="h-5 w-5" />, label: "Active users", value: "12.4K" },
        { icon: <BarChart className="h-5 w-5" />, label: "Conversion", value: "4.8%" },
      ].map(({ icon, label, value }) => (
        <Card key={label} interactive>
          <CardContent className="flex flex-col gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              {icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};