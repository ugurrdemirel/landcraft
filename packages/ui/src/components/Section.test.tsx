import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section, SectionHeader } from "./Section";

describe("Section", () => {
  it("renders a section element with padding for the size", () => {
    render(<Section size="lg">Body</Section>);
    const section = screen.getByText("Body").closest("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("renders children", () => {
    render(<Section>Body</Section>);
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("forwards an id", () => {
    render(<Section id="pricing">Pricing</Section>);
    expect(screen.getByText("Pricing").closest("section")).toHaveAttribute("id", "pricing");
  });

  it("renders a SectionHeader with eyebrow/title/description when provided", () => {
    render(
      <Section eyebrow="E" title="T" description="D">
        Body
      </Section>,
    );
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });
});

describe("SectionHeader", () => {
  it("renders eyebrow, title and description", () => {
    render(<SectionHeader eyebrow="E" title="T" description="D" />);
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("centers by default and aligns left when requested", () => {
    const { rerender } = render(<SectionHeader title="T" />);
    expect(screen.getByText("T").parentElement).toHaveClass("text-center");

    rerender(<SectionHeader title="T" align="left" />);
    // left is the base; center adds mx-auto text-center.
    expect(screen.getByText("T").parentElement).not.toHaveClass("text-center");
  });
});
