import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Slot } from "./Slot";

describe("Slot", () => {
  it("renders the single child with merged props", () => {
    render(
      <Slot className="btn" data-testid="slot">
        <span>Hello</span>
      </Slot>,
    );
    const el = screen.getByTestId("slot");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("btn");
  });

  it("forwards an onClick to the child and calls both handlers", () => {
    const slotClick = vi.fn();
    const childClick = vi.fn();
    render(
      <Slot onClick={slotClick}>
        <button onClick={childClick}>Go</button>
      </Slot>,
    );
    const btn = screen.getByRole("button", { name: "Go" });
    btn.click();
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(slotClick).toHaveBeenCalledTimes(1);
  });

  it("renders nothing when there is no single valid child", () => {
    const { container } = render(<Slot>text only</Slot>);
    // A plain string is not a valid React element, so Slot returns null.
    expect(container).toBeEmptyDOMElement();
  });

  it("merges className with the child", () => {
    render(
      <Slot className="slot-class">
        <div className="child-class">x</div>
      </Slot>,
    );
    expect(screen.getByText("x")).toHaveClass("slot-class child-class");
  });
});
