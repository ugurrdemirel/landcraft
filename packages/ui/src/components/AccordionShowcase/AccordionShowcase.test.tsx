import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AccordionShowcase } from "./AccordionShowcase";

const items = [
  {
    title: "Pro and Mobile",
    description: "Answer calls or messages from your phone directly on your laptop.",
    visual: <div data-testid="visual-mobile">Mobile visual</div>,
  },
  {
    title: "Pro and Tablet",
    description: "Use your tablet as a second display for your laptop.",
    visual: <div data-testid="visual-tablet">Tablet visual</div>,
  },
];

describe("AccordionShowcase", () => {
  it("renders all item headings", () => {
    render(<AccordionShowcase items={items} />);
    expect(screen.getByText("Pro and Mobile")).toBeInTheDocument();
    expect(screen.getByText("Pro and Tablet")).toBeInTheDocument();
  });

  it("shows only the active item's description and visual by default", () => {
    render(<AccordionShowcase items={items} />);
    expect(screen.getByText("Answer calls or messages from your phone directly on your laptop.")).toBeInTheDocument();
    expect(screen.queryByText("Use your tablet as a second display for your laptop.")).not.toBeInTheDocument();
    expect(screen.getByTestId("visual-mobile")).toBeInTheDocument();
  });

  it("swaps description and visual when another item is clicked (single open)", () => {
    render(<AccordionShowcase items={items} />);

    const inactiveButton = screen.getByRole("button", { name: "Pro and Tablet" });
    expect(inactiveButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(inactiveButton);
    expect(inactiveButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Use your tablet as a second display for your laptop.")).toBeInTheDocument();
    expect(screen.getByTestId("visual-tablet")).toBeInTheDocument();
    expect(screen.queryByText("Answer calls or messages from your phone directly on your laptop.")).not.toBeInTheDocument();
  });

  it("respects defaultActive", () => {
    render(<AccordionShowcase items={items} defaultActive={1} />);
    expect(screen.getByText("Use your tablet as a second display for your laptop.")).toBeInTheDocument();
    expect(screen.queryByText("Answer calls or messages from your phone directly on your laptop.")).not.toBeInTheDocument();
  });

  it("exposes all item headings as buttons with the correct accessible name", () => {
    render(<AccordionShowcase items={items} />);
    expect(screen.getByRole("button", { name: "Pro and Mobile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pro and Tablet" })).toBeInTheDocument();
  });
});
