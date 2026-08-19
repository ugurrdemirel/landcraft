import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";

const stats = [
  { value: "12.4K", label: "Active users", delta: 18.2 },
  { value: "98", suffix: "%", label: "Satisfaction", accent: true },
  { value: "1.8", suffix: "ms", label: "Response" },
];

describe("Stats", () => {
  it("renders labels and values with the editorial option by default", () => {
    render(<Stats stats={stats} />);
    expect(screen.getByText("Active users")).toBeInTheDocument();
    expect(screen.getByText("12.4K")).toBeInTheDocument();
    expect(screen.getByText("Satisfaction")).toBeInTheDocument();
  });

  it("renders a suffix inline with the value", () => {
    render(<Stats stats={[stats[1]]} />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("renders delta badges for statistics that have a delta", () => {
    render(<Stats stats={[stats[0]]} />);
    expect(screen.getByText("18.2%")).toBeInTheDocument();
  });

  it("renders all option layouts", () => {
    const { rerender } = render(<Stats stats={stats} option="editorial" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="hairline" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="cells" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();

    rerender(<Stats stats={stats} option="ticker" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();
  });

  it("uses a downward delta badge for negative changes", () => {
    render(<Stats stats={[{ value: "1.8", label: "Response", delta: -24.6 }]} />);
    expect(screen.getByText("24.6%")).toBeInTheDocument();
  });
});
