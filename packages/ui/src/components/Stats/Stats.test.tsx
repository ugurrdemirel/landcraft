import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";
import { Users } from "../../icons";

const stats = [
  { value: "12.4K", label: "Active users", delta: 18.2 },
  { value: "98", suffix: "%", label: "Satisfaction", accent: true },
  { value: "1.8", suffix: "ms", label: "Response" },
];

const options = ["stacked", "divided", "cells", "ticker"] as const;

describe("Stats", () => {
  it("renders labels and values with the stacked option by default", () => {
    render(<Stats stats={stats} />);
    expect(screen.getByText("Active users")).toBeInTheDocument();
    expect(screen.getByText("12.4K")).toBeInTheDocument();
    expect(screen.getByText("Satisfaction")).toBeInTheDocument();
  });

  it("renders a suffix inline with the value", () => {
    render(<Stats stats={[stats[1]]} />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("renders a delta mark for statistics that have a delta", () => {
    render(<Stats stats={[stats[0]]} />);
    expect(screen.getByText("18.2%")).toBeInTheDocument();
  });

  it("renders all option layouts", () => {
    const { rerender } = render(<Stats stats={stats} option="stacked" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="divided" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="cells" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="ticker" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();
  });

  it("renders the suffix, delta and supporting copy in every option", () => {
    const { rerender } = render(<Stats option="stacked" stats={[]} />);
    for (const option of options) {
      rerender(
        <Stats
          option={option}
          stats={[{ value: "1.8", suffix: "ms", label: "Response", delta: -24.6, sub: "p95" }]}
        />,
      );
      expect(screen.getByText("ms")).toBeInTheDocument();
      expect(screen.getByText("24.6%")).toBeInTheDocument();
      expect(screen.getByText("p95")).toBeInTheDocument();
    }
  });

  it("uses a downward delta mark for negative changes", () => {
    render(<Stats stats={[{ value: "1.8", label: "Response", delta: -24.6 }]} />);
    expect(screen.getByText("24.6%").closest("[data-direction]")).toHaveAttribute(
      "data-direction",
      "down",
    );
  });

  it("marks the direction of a delta and treats zero as neutral", () => {
    render(
      <Stats
        stats={[
          { value: "12.4K", label: "Users", delta: 18.2 },
          { value: "0.0", label: "Change", delta: 0 },
        ]}
      />,
    );
    expect(screen.getByText("18.2%").closest("[data-direction]")).toHaveAttribute(
      "data-direction",
      "up",
    );
    expect(screen.getByText("0%").closest("[data-direction]")).toHaveAttribute(
      "data-direction",
      "flat",
    );
  });

  it("renders an icon when one is provided", () => {
    render(
      <Stats
        option="cells"
        stats={[
          { value: "12.4K", label: "Active users", icon: <Users data-testid="stat-icon" /> },
        ]}
      />,
    );
    expect(screen.getByTestId("stat-icon")).toBeInTheDocument();
  });

  it("applies the requested column count", () => {
    const { container } = render(<Stats stats={stats} columns={3} />);
    expect(container.querySelector("dl")?.className).toContain("lg:grid-cols-3");
  });
});
