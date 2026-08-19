import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
];

describe("Footer", () => {
  it("renders the brand, column headings and links (classic by default)", () => {
    render(<Footer brand="Acurio" columns={columns} />);
    expect(screen.getByText("Acurio")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features",
    );
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
  });

  it("renders a description and the bottom copy", () => {
    render(<Footer brand="Acurio" columns={columns} description="A kit." bottom="Made with care" />);
    expect(screen.getByText("A kit.")).toBeInTheDocument();
    expect(screen.getByText("Made with care")).toBeInTheDocument();
  });

  it("renders the minimal option", () => {
    render(<Footer brand="Acurio" columns={columns} option="minimal" />);
    expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
  });

  it("renders the editorial option with a large wordmark", () => {
    const { container } = render(<Footer brand="Acurio" columns={columns} option="editorial" />);
    expect(screen.getByText("Acurio")).toBeInTheDocument();
    // Editorial uses a large display wordmark.
    expect(container.querySelector("span.text-5xl")).toBeInTheDocument();
  });

  it("renders a footer element tag", () => {
    const { container } = render(<Footer brand="Acurio" columns={columns} />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
