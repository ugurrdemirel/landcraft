import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

const links = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
];

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
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

  it("opens links marked external in a new tab and keeps others in the same tab", () => {
    render(
      <Navbar
        brand="Acurio"
        links={[
          { label: "Docs", href: "https://docs.example.com", external: true },
          { label: "Pricing", href: "#pricing" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Main navigation" });

    // Both the desktop list and the mobile panel render the external link.
    const docsLinks = within(nav).getAllByRole("link", { name: "Docs" });
    expect(docsLinks.length).toBeGreaterThan(0);
    docsLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const pricingLinks = within(nav).getAllByRole("link", { name: "Pricing" });
    pricingLinks.forEach((link) => {
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });
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

  it("renders the language switcher inside the mobile hamburger panel", () => {
    const { container } = render(
      <Navbar
        brand="Acurio"
        links={links}
        languageSwitcher={<LanguageSwitcher languages={languages} defaultValue="en" />}
      />,
    );

    // One trigger in the desktop action group, one inside the mobile panel.
    const triggers = container.querySelectorAll('button[aria-haspopup="listbox"]');
    expect(triggers.length).toBe(2);

    const mobileList = container.querySelector("ul.flex-col")!;
    expect(mobileList.querySelector('button[aria-haspopup="listbox"]')).toBeInTheDocument();
  });

  it("is not sticky when sticky is disabled", () => {
    render(<Navbar brand="Acurio" links={links} sticky={false} />);
    expect(screen.getByRole("banner")).not.toHaveClass("sticky");
  });
});
