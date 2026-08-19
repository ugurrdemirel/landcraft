import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "./FAQ";

const items = [
  { question: "How do I install it?", answer: "Run pnpm add." },
  { question: "How do I theme it?", answer: "Set --color-primary." },
];

describe("FAQ", () => {
  it("renders all questions and the accordion option by default", () => {
    render(<FAQ items={items} />);
    expect(screen.getByText("How do I install it?")).toBeInTheDocument();
    expect(screen.getByText("How do I theme it?")).toBeInTheDocument();
  });

  it("expands an answer when a question is activated", () => {
    render(<FAQ items={items} />);
    const q = screen.getByRole("button", { name: "How do I install it?" });
    expect(q).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(q);
    expect(q).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Run pnpm add.")).toBeInTheDocument();
  });

  it("closes the first item when another is opened (single open by default)", () => {
    render(<FAQ items={items} />);
    fireEvent.click(screen.getByRole("button", { name: "How do I install it?" }));
    fireEvent.click(screen.getByRole("button", { name: "How do I theme it?" }));

    // Only the second question's answer is visible.
    expect(screen.getByText("Set --color-primary.")).toBeInTheDocument();
    expect(screen.queryByText("Run pnpm add.")).not.toBeInTheDocument();
  });

  it("keeps multiple items open when allowMultiple is set", () => {
    render(<FAQ items={items} allowMultiple />);
    fireEvent.click(screen.getByRole("button", { name: "How do I install it?" }));
    fireEvent.click(screen.getByRole("button", { name: "How do I theme it?" }));

    expect(screen.getByText("Run pnpm add.")).toBeInTheDocument();
    expect(screen.getByText("Set --color-primary.")).toBeInTheDocument();
  });

  it("renders the split and cards options", () => {
    const { rerender } = render(<FAQ items={items} option="split" />);
    expect(screen.getByText("How do I install it?")).toBeInTheDocument();

    rerender(<FAQ items={items} option="cards" />);
    expect(screen.getByText("How do I install it?")).toBeInTheDocument();
    expect(screen.getByText("Run pnpm add.")).toBeInTheDocument();
  });
});
