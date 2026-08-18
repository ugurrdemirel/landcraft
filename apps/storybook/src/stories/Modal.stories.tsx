import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, Button } from "@ugurdemirel/landcraft";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
  args: {
    open: false,
    onClose: () => {},
    size: "md",
    title: "Confirm your choice",
    description: "This action cannot be undone.",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = ({
  size,
  title,
  description,
  children,
  footer,
}: {
  size?: "sm" | "md" | "lg";
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid min-h-[18rem] place-items-center p-10">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={title}
        description={description}
        footer={footer}
      >
        {children}
      </Modal>
    </div>
  );
};

/** Dialog with a close button, `Escape` and outside-click dismissal. */
export const Default: Story = {
  name: "Default",
  render: (args) => (
    <Demo
      size={args.size}
      title={args.title}
      description={args.description}
      footer={<Button size="sm" onClick={() => {}}>Confirm</Button>}
    >
      A dialog rendered through the HTML Popover API — no portal or focus-trap
      code required. Adjust the `size` control to see the width change.
    </Demo>
  ),
};

/** No heading — used for plain confirmations or quick actions. */
export const WithoutTitle: Story = {
  render: () => (
    <Demo
      size="sm"
      footer={<Button size="sm" onClick={() => {}}>Got it</Button>}
    >
      This quiet little modal has no heading, just content and a footer action.
    </Demo>
  ),
};

/** A longer body to show scrolling inside the dialog. */
export const ScrollingContent: Story = {
  render: () => (
    <Demo title="Long content" size="lg">
      <div className="space-y-3 text-sm leading-6 text-muted-foreground">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i}>
            Paragraph {i + 1}. Popovers render in the top layer, lock nothing
            manually, and give light-dismiss for free. The body stays scrollable
            while the dialog itself scrolls when it overflows.
          </p>
        ))}
      </div>
    </Demo>
  ),
};