import { describe, it, expect, vi } from "vitest";
import { forwardRef } from "react";
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

  it("does not attach a ref to the child when none is forwarded", () => {
    const childRefs: Array<unknown> = [];
    const Child = forwardRef<HTMLSpanElement>((_props, ref) => {
      childRefs.push(ref);
      return <span />;
    });

    render(
      <Slot>
        <Child />
      </Slot>,
    );

    // A ref injected by Slot onto a client child (e.g. next/link) from a Server
    // Component would throw "Refs cannot be used in Server Components". With no
    // ref to forward, Slot must leave the child's ref untouched.
    expect(childRefs).toEqual([null]);
  });
});
