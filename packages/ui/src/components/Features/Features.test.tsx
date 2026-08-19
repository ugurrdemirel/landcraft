import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./FeatureCard";
import { FeatureGrid } from "./FeatureGrid";

const features = [
  { icon: <span data-testid="icon-1">⚡</span>, title: "Fast", description: "Go live fast." },
  { title: "No description title" },
];

describe("FeatureCard", () => {
  it("renders title, description and icon", () => {
    render(<FeatureCard icon={<span data-testid="ic" />} title="Fast" description="Go live fast." />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Go live fast.")).toBeInTheDocument();
    expect(screen.getByTestId("ic")).toBeInTheDocument();
  });

  it("applies a large heading when large", () => {
    render(<FeatureCard title="Big" large />);
    expect(screen.getByText("Big")).toHaveClass("text-2xl");
  });
});

describe("FeatureGrid", () => {
  it("renders all features in columns mode", () => {
    render(<FeatureGrid features={features} option="columns" />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByTestId("icon-1")).toBeInTheDocument();
  });

  it("renders features in bento mode", () => {
    render(<FeatureGrid features={features} option="bento" />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
  });

  it("renders features as editorial rows with numbering", () => {
    render(<FeatureGrid features={features} option="editorialRows" />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    // Editorial rows number features starting at 01.
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("applies the requested column count in columns mode", () => {
    const { container } = render(<FeatureGrid features={features} option="columns" columns={2} />);
    expect(container.querySelector("div.sm\\:grid-cols-2")).not.toBeNull();
  });
});
