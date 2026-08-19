import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTA } from "./CTA";

const base = { title: "Ready to get started?" };

describe("CTA", () => {
  it("renders the title and description", () => {
    render(<CTA {...base} description="Free for 14 days." />);
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
    expect(screen.getByText("Free for 14 days.")).toBeInTheDocument();
  });

  it("renders primary and secondary actions", () => {
    render(
      <CTA
        {...base}
        action={<a href="#a">Action</a>}
        secondaryAction={<a href="#b">Secondary</a>}
      />,
    );
    expect(screen.getByRole("link", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Secondary" })).toBeInTheDocument();
  });

  it("renders the panel option (default) with a radial brand background", () => {
    const { container } = render(<CTA {...base} option="panel" />);
    const panel = container.querySelector("div[class*='rounded-']");
    expect(panel).toBeInTheDocument();
  });

  it("renders the surface option as a paper band", () => {
    const { container } = render(<CTA {...base} option="surface" />);
    expect(container.querySelector("section")).toHaveClass("w-full");
  });

  it("renders the inverse option on a secondary surface", () => {
    const { container } = render(<CTA {...base} option="inverse" />);
    // The inverse option paints its band with the --color-secondary token.
    const ink = container.querySelector("[style*='--color-secondary']");
    expect(ink).toBeInTheDocument();
  });

  it("applies centered alignment", () => {
    render(<CTA {...base} option="surface" align="center" />);
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
  });

  it("forwards an id", () => {
    const { container } = render(<CTA {...base} id="cta" />);
    expect(container.querySelector("section#cta")).not.toBeNull();
  });
});
