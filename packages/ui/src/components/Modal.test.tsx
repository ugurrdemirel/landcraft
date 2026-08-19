import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

// The Modal drives the HTML Popover API, which jsdom doesn't implement, and a
// `[popover]` element is treated as hidden by Testing Library's role queries.
// Stub the popover surface and query the rendered structure directly.
beforeEach(() => {
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = vi.fn();
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = vi.fn();
  }
  const originalMatches = Element.prototype.matches;
  Element.prototype.matches = function (selector: string) {
    if (selector === ":popover-open") return false;
    return originalMatches.call(this, selector);
  };
});

describe("Modal", () => {
  it("renders the dialog with title and description when open", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose} title="Title" description="Description">
        Body
      </Modal>,
    );
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("is marked as a modal dialog and links title via aria-labelledby", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose} title="Confirm">
        Body
      </Modal>,
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const labelledBy = dialog!.getAttribute("aria-labelledby")!;
    expect(document.getElementById(labelledBy)).toHaveTextContent("Confirm");
  });

  it("keeps its content in the DOM even when closed (hidden via popover)", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={false} onClose={onClose} title="Title">
        Body
      </Modal>,
    );
    // The component always renders the dialog markup; open/close is handled by
    // the native popover, so the markup is present but hidden.
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it("calls onClose when the close button is pressed", async () => {
    const onClose = vi.fn();
    const { container } = render(<Modal open onClose={onClose} title="Title" />);
    const user = userEvent.setup();
    const closeBtn = container.querySelector('button[aria-label="Close dialog"]')!;
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders a footer", () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} footer={<button>Go</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByText("Go")).toBeInTheDocument();
  });
});
