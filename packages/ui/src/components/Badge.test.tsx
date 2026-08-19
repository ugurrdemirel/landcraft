import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";
import { Zap } from "../icons";

describe("Badge", () => {
  it("renders a span with children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("New").tagName).toBe("SPAN");
  });

  it("defaults to the soft variant", () => {
    render(<Badge>Soft</Badge>);
    expect(screen.getByText("Soft")).toHaveClass("bg-primary-soft");
  });

  it("applies the requested variant", () => {
    render(<Badge variant="solid">Solid</Badge>);
    expect(screen.getByText("Solid")).toHaveClass("bg-primary");
  });

  it("renders a dot indicator for the dot variant", () => {
    const { container } = render(<Badge variant="dot">Online</Badge>);
    // The dot is an inner decorative span.
    const dots = container.querySelectorAll("span.h-1\\.5");
    expect(dots.length).toBeGreaterThan(0);
  });

  it("renders an icon", () => {
    render(
      <Badge icon={<Zap data-testid="icon" />} variant="soft">
        Fast
      </Badge>,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies sizes", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("px-2.5");
  });

  it("sets a computed text color for customColor", () => {
    render(<Badge customColor="#111111">Dark</Badge>);
    const badge = screen.getByText("Dark");
    expect(badge).toHaveStyle({ backgroundColor: "#111111" });
    expect(badge).toHaveStyle({ color: "#ffffff" });
  });

  it("forwards arbitrary props like aria-label", () => {
    render(<Badge aria-label="status">v1</Badge>);
    expect(screen.getByLabelText("status")).toBeInTheDocument();
  });
});
