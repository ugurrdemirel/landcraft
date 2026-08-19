import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import { ArrowRight } from "../icons";

describe("Button", () => {
  it("renders a button element with children", () => {
    render(<Button>Hello</Button>);
    const btn = screen.getByRole("button", { name: "Hello" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("defaults to type=button so it never submits forms unintentionally", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "button");
  });

  it("applies the default primary variant", () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole("button", { name: "Start" })).toHaveClass("bg-primary");
  });

  it("applies the requested variant class", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button", { name: "Ghost" })).toHaveClass("hover:bg-surface");
  });

  it("applies the link variant underline behavior", () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button", { name: "Link" })).toHaveClass("hover:underline");
  });

  it("renders leading and trailing icons", () => {
    render(
      <Button iconLeft={<span data-testid="left" />} iconRight={<ArrowRight data-testid="right" />}>
        Next
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Next" });
    expect(btn.querySelector('[data-testid="left"]')).toBeInTheDocument();
    expect(btn.querySelector('[data-testid="right"]')).toBeInTheDocument();
  });

  it("applies fullWidth", () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole("button", { name: "Wide" })).toHaveClass("w-full");
  });

  it("disables and blocks clicks when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets a computed text color and background for customColor", () => {
    render(<Button customColor="#111111">Custom</Button>);
    const btn = screen.getByRole("button", { name: "Custom" });
    expect(btn).toHaveStyle({ backgroundColor: "#111111" });
    // Text is the light candidate for a very dark background.
    expect(btn).toHaveStyle({ color: "#ffffff" });
  });

  it("forwards an onClick handler and fires it", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies button styles onto a single child when asChild is set", () => {
    render(
      <Button asChild>
        <a href="#pricing">Pricing link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Pricing link" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveClass("bg-primary");
    // No wrapping <button> is rendered.
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
