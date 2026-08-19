import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container, Stack } from "./Container";

describe("Container", () => {
  it("renders a div by default", () => {
    render(<Container>Body</Container>);
    const el = screen.getByText("Body");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("mx-auto");
  });

  it("applies a size class", () => {
    render(<Container size="sm">Body</Container>);
    expect(screen.getByText("Body")).toHaveClass("max-w-xl");
  });

  it("does not cap width for the full size", () => {
    render(<Container size="full">Body</Container>);
    expect(screen.getByText("Body")).not.toHaveClass("max-w-xl", "max-w-6xl");
  });

  it("adds gutters by default and removes them with gutters=false", () => {
    render(<Container>A</Container>);
    expect(screen.getByText("A")).toHaveClass("px-5");

    render(<Container gutters={false}>B</Container>);
    expect(screen.getByText("B")).not.toHaveClass("px-5");
  });

  it("renders as the requested element via `as`", () => {
    render(<Container as="section">Body</Container>);
    expect(screen.getByText("Body").tagName).toBe("SECTION");
  });
});

describe("Stack", () => {
  it("renders a vertical flex by default", () => {
    render(<Stack>A</Stack>);
    expect(screen.getByText("A")).toHaveClass("flex", "flex-col");
  });

  it("renders horizontal when horizontal", () => {
    render(<Stack horizontal>A</Stack>);
    expect(screen.getByText("A")).toHaveClass("flex-row");
  });

  it("applies a gap", () => {
    render(<Stack gap={6}>A</Stack>);
    expect(screen.getByText("A")).toHaveClass("gap-6");
  });
});
