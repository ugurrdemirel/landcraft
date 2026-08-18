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