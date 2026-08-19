import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

describe("Card & subcomponents", () => {
  it("renders an outlined card by default", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("border-border");
  });

  it("applies a custom variant", () => {
    render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText("Elevated")).toHaveClass("shadow-soft");
  });

  it("adds interactive styling when interactive", () => {
    render(<Card interactive>Interactive</Card>);
    expect(screen.getByText("Interactive")).toHaveClass("hover:-translate-y-0.5");
  });

  it("renders the full composite header/content/footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders an icon in the header when provided", () => {
    render(<CardHeader icon={<span data-testid="hdr-icon" />}>Header</CardHeader>);
    expect(screen.getByTestId("hdr-icon")).toBeInTheDocument();
  });
});
