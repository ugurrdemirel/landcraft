import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

const base = {
  title: "Build something great",
  description: "A short description.",
  eyebrow: "New release",
};

describe("Hero", () => {
  it("renders the headline and description", () => {
    render(<Hero {...base} />);
    expect(
      screen.getByRole("heading", { name: "Build something great" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A short description.")).toBeInTheDocument();
  });

  it("renders an eyebrow, primary and secondary actions", () => {
    render(
      <Hero
        {...base}
        primaryAction={<a href="#a">Primary</a>}
        secondaryAction={<a href="#b">Secondary</a>}
      />,
    );
    expect(screen.getByText("New release")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Secondary" })).toBeInTheDocument();
  });

  it("renders the split variant by default with meta row and media", () => {
    render(
      <Hero
        {...base}
        media={<div data-testid="media" />}
        meta={[{ label: "4.9/5", icon: <span>★</span> }]}
      />,
    );
    expect(screen.getByTestId("media")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
    const section = screen.getByTestId("media").closest("section");
    expect(section).toHaveClass("bg-background");
  });

  it("renders the centered variant with centered copy", () => {
    render(<Hero {...base} variant="centered" media={<div data-testid="m" />} />);
    const h1 = screen.getByRole("heading", { name: "Build something great" });
    expect(h1).toBeInTheDocument();
    expect(screen.getByTestId("m")).toBeInTheDocument();
  });

  it("renders the statement variant as an ink band with a grain overlay", () => {
    const { container } = render(<Hero {...base} variant="statement" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-secondary");
    // Statement paints a grain overlay div.
    expect(container.querySelector(".grain")).toBeInTheDocument();
  });

  it("omits the meta row when no meta is supplied", () => {
    render(<Hero {...base} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("forwards an id to the section", () => {
    const { container } = render(<Hero {...base} id="home" />);
    expect(container.querySelector("section#home")).not.toBeNull();
  });
});
