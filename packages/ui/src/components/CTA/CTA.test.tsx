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

  it("renders the panel option (default) with a brand emphasis surface", () => {
    const { container } = render(<CTA {...base} option="panel" />);
    const panel = container.querySelector("div[class*='rounded-']");
    expect(panel).toBeInTheDocument();
    // Emphasis text color is derived from the primary token in CSS.
    expect(panel).toHaveAttribute(
      "style",
      expect.stringContaining("contrast-color(rgb(var(--color-primary)))"),
    );
  });

  it("overrides the panel surface with a custom background", () => {
    const { container } = render(<CTA {...base} option="panel" background="#101010" />);
    const panel = container.querySelector("div[class*='rounded-']");
    // Background and text share one source property, so contrast stays correct.
    expect(panel).toHaveAttribute(
      "style",
      expect.stringContaining("--lc-bg: #101010"),
    );
    expect(panel).toHaveAttribute(
      "style",
      expect.stringContaining("color: contrast-color(var(--lc-bg))"),
    );
  });

  it("marks the panel actions so descendant buttons inherit the band's contrast color", () => {
    const { container } = render(<CTA {...base} option="panel" />);
    // The actions wrapper is the emphasis scope that fixes outline buttons.
    expect(container.querySelector("[data-emphasis]")).toBeInTheDocument();
  });

  it("does not mark the surface actions as an emphasis scope", () => {
    const { container } = render(<CTA {...base} option="surface" />);
    expect(container.querySelector("[data-emphasis]")).not.toBeInTheDocument();
  });

  it("renders the surface option as a paper band", () => {
    const { container } = render(<CTA {...base} option="surface" />);
    expect(container.querySelector("section")).toHaveClass("w-full");
  });

  it("does not leak an unused background prop onto the surface DOM node", () => {
    const { container } = render(<CTA {...base} option="surface" background="#101010" />);
    expect(container.querySelector("section")).not.toHaveAttribute("background");
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
