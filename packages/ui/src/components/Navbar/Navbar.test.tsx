import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";

const links = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
];

describe("Navbar", () => {
  it("renders brand, nav links and the action slot", () => {
    render(<Navbar brand="Acurio" links={links} cta={<button>Start</button>} />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });

    expect(screen.getByText("Acurio")).toBeInTheDocument();
    // Both the desktop list and the mobile panel render a "Product" link.
    const productLinks = within(nav).getAllByRole("link", { name: "Product" });
    expect(productLinks.length).toBeGreaterThan(0);
    expect(productLinks[0]).toHaveAttribute("href", "#product");
    expect(screen.getAllByRole("button", { name: "Start" }).length).toBeGreaterThan(0);
  });

  it("renders the brand href via brandHref", () => {
    render(<Navbar brand="Acurio" links={links} brandHref="/" />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.querySelector('a[href="/"]')).toBeInTheDocument();
  });

  it("applies the classic variant shell", () => {
    render(<Navbar brand="Acurio" links={links} variant="classic" />);
    expect(screen.getByRole("banner")).toHaveClass("bg-background/85");
  });

  it("applies the inverse variant shell and on-secondary link tokens", () => {
    render(<Navbar brand="Acurio" links={links} variant="inverse" />);
    expect(screen.getByRole("banner")).toHaveClass("bg-[#101010]/85");
    const productLinks = screen.getAllByRole("link", { name: "Product" });
    expect(productLinks[0]).toHaveClass("text-on-secondary/60");
  });

  it("renders a custom logo instead of the wordmark", () => {
    render(
      <Navbar brand="Acurio" links={links} logo={<span data-testid="logo">Logo</span>} />,
    );
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.queryByText("Acurio")).not.toBeInTheDocument();
  });

  it("starts collapsed and toggles the mobile menu via the hamburger", async () => {
    const user = userEvent.setup();
    render(<Navbar brand="Acurio" links={links} />);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the mobile menu when a mobile link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar brand="Acurio" links={links} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    // Two "Product" links exist (desktop + mobile); tapping one collapses.
    const product = screen.getAllByRole("link", { name: "Product" })[1];
    await user.click(product);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("is not sticky when sticky is disabled", () => {
    render(<Navbar brand="Acurio" links={links} sticky={false} />);
    expect(screen.getByRole("banner")).not.toHaveClass("sticky");
  });
});
