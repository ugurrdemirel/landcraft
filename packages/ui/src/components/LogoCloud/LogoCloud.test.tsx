import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogoCloud } from "./LogoCloud";

const logos = [{ name: "Acme" }, { name: "Globex" }];

describe("LogoCloud", () => {
  it("renders the title and logo names (quiet by default)", () => {
    render(<LogoCloud title="Teams" logos={logos} />);
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Globex")).toBeInTheDocument();
  });

  it("does not render a title when none is provided", () => {
    render(<LogoCloud logos={logos} />);
    expect(screen.queryByText("Teams")).not.toBeInTheDocument();
  });

  it("renders the marquee option (items duplicated for the loop)", () => {
    render(<LogoCloud logos={logos} option="marquee" />);
    expect(screen.getAllByText("Acme").length).toBeGreaterThan(1);
  });

  it("renders the strip option", () => {
    render(<LogoCloud logos={logos} option="strip" />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });

  it("renders a logo image when src is provided", () => {
    render(<LogoCloud logos={[{ name: "Acme", src: "/acme.png" }]} />);
    const img = screen.getByAltText("Acme");
    expect(img).toHaveAttribute("src", "/acme.png");
  });
});
