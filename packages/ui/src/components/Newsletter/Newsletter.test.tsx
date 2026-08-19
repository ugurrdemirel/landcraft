import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Newsletter } from "./Newsletter";

describe("Newsletter", () => {
  it("renders the field and submit button (inline by default)", () => {
    render(<Newsletter />);
    expect(screen.getByLabelText("Your email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
  });

  it("calls onSubmit with a valid email and shows the success message", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Newsletter onSubmit={onSubmit} successMessage="You're in!" />);
    await user.type(screen.getByLabelText("Your email address"), "foo@bar.com");
    await user.click(screen.getByRole("button", { name: "Join" }));

    expect(onSubmit).toHaveBeenCalledWith("foo@bar.com");
    expect(screen.getByRole("status")).toHaveTextContent("You're in!");
  });

  it("shows a validation error when an empty/invalid value is submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Newsletter onSubmit={onSubmit} />);
    // Submit without entering a value; the component's own regex rejects it.
    await user.click(screen.getByRole("button", { name: "Join" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("valid email");
  });

  it("renders the note text when provided", () => {
    render(<Newsletter note="Once a month." />);
    expect(screen.getByText("Once a month.")).toBeInTheDocument();
  });

  it("renders the card and underline options", () => {
    const { container } = render(<Newsletter option="card" />);
    expect(container.querySelector("form")).toBeInTheDocument();
    render(<Newsletter option="underline" />);
  });
});
