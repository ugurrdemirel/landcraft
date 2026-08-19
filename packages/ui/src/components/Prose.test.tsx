import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Prose, ProseLead } from "./Prose";

describe("Prose", () => {
  it("renders an article element with prose classes", () => {
    render(<Prose>Text</Prose>);
    const article = screen.getByText("Text");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("prose");
  });

  it("applies the requested size", () => {
    render(<Prose size="xl">Text</Prose>);
    expect(screen.getByText("Text")).toHaveClass("prose-xl");
  });

  it("caps width by default and removes it when wide", () => {
    render(<Prose>Capped</Prose>);
    expect(screen.getByText("Capped")).toHaveClass("max-w-3xl");

    render(<Prose wide>Wide</Prose>);
    expect(screen.getByText("Wide")).not.toHaveClass("max-w-3xl");
  });

  it("renders children", () => {
    render(
      <Prose>
        <h1>Heading</h1>
      </Prose>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders raw HTML via the html prop instead of children", () => {
    render(<Prose html="<h2>CMS content</h2><p>A paragraph.</p>" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("CMS content");
    expect(screen.getByText("A paragraph.")).toBeInTheDocument();
  });
});

describe("ProseLead", () => {
  it("renders a lead-styled paragraph", () => {
    render(<ProseLead>Intro</ProseLead>);
    const p = screen.getByText("Intro");
    expect(p.tagName).toBe("P");
    expect(p).toHaveClass("lead");
  });
});
