import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureShowcase } from "./FeatureShowcase";

const items = [
  {
    icon: <span data-testid="icon-1" />,
    title: "Unified workspace",
    description: "Keep tasks, data, and team operations connected.",
    href: "/workspace",
    linkLabel: "Learn more",
  },
  {
    icon: <span data-testid="icon-2" />,
    title: "Workflow automation",
    description: "Simplify recurring processes and keep work moving.",
  },
];

describe("FeatureShowcase", () => {
  it("renders the heading title and description", () => {
    render(<FeatureShowcase title="A better way to manage everything" description="Bring your workflows into one organized workspace." items={items} visual={<div data-testid="visual" />} />);
    expect(screen.getByText("A better way to manage everything")).toBeInTheDocument();
    expect(screen.getByText("Bring your workflows into one organized workspace.")).toBeInTheDocument();
  });

  it("renders every feature with its icon, title and description", () => {
    render(<FeatureShowcase items={items} visual={<div data-testid="visual" />} />);
    expect(screen.getByTestId("icon-1")).toBeInTheDocument();
    expect(screen.getByText("Unified workspace")).toBeInTheDocument();
    expect(screen.getByText("Keep tasks, data, and team operations connected.")).toBeInTheDocument();
    expect(screen.getByText("Workflow automation")).toBeInTheDocument();
  });

  it("renders the visual node", () => {
    render(<FeatureShowcase items={items} visual={<div data-testid="visual" />} />);
    expect(screen.getByTestId("visual")).toBeInTheDocument();
  });

  it("renders a link only when an href is provided", () => {
    render(<FeatureShowcase items={items} visual={<div data-testid="visual" />} />);
    const link = screen.getByRole("link", { name: "Learn more" });
    expect(link).toHaveAttribute("href", "/workspace");
    // The item without an href must not produce a link.
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("renders a slot link as-is when provided, omitting the default anchor", () => {
    render(
      <FeatureShowcase
        items={[
          {
            title: "Slot link",
            href: "/ignored",
            link: <a href="/custom" data-testid="slot-link">Go to custom</a>,
          },
        ]}
        visual={<div data-testid="visual" />}
      />,
    );
    const slotLink = screen.getByTestId("slot-link");
    expect(slotLink).toHaveAttribute("href", "/custom");
    // Default anchor must not be rendered alongside the slot.
    expect(screen.queryByRole("link", { name: "Learn more" })).not.toBeInTheDocument();
  });

  it("defaults to the visual on the left and items on the right", () => {
    const { container } = render(<FeatureShowcase items={items} visual={<div data-testid="visual" />} />);
    const visualWrapper = container.querySelector("[data-testid='visual']")?.parentElement;
    expect(visualWrapper).toHaveClass("lg:order-1");
  });

  it("flips the visual to the right when mediaSide is right", () => {
    const { container } = render(
      <FeatureShowcase items={items} visual={<div data-testid="visual" />} mediaSide="right" />,
    );
    const visualWrapper = container.querySelector("[data-testid='visual']")?.parentElement;
    expect(visualWrapper).toHaveClass("lg:order-2");
  });
});
