import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MegaMenu } from "./MegaMenu";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

const items = [
  {
    label: "Product",
    columns: [
      {
        title: "Build",
        links: [
          { label: "API Platform", description: "REST + GraphQL", href: "#api" },
          { label: "Workflows", href: "#wf" },
        ],
      },
    ],
    featured: { title: "Get started", description: "See it live", cta: "Start", href: "#start" },
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
];

function desktopTrigger(container: HTMLElement): HTMLButtonElement {
  // The desktop trigger is the one with aria-haspopup; the mobile accordion
  // button does not set it, and it is hidden behind `lg:hidden` CSS.
  return container.querySelector('button[aria-haspopup="true"]')!;
}

describe("MegaMenu", () => {
  it("renders the brand and plain link items", () => {
    render(<MegaMenu brand="Acurio" items={items} />);
    expect(screen.getByText("Acurio")).toBeInTheDocument();
    // Links render in both the desktop bar and the mobile panel.
    const pricingLinks = screen.getAllByRole("link", { name: "Pricing" });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "#pricing");
    expect(screen.getAllByRole("link", { name: "Docs" }).length).toBeGreaterThan(0);
  });

  it("renders a trigger button for panel items (with columns/featured)", () => {
    const { container } = render(<MegaMenu brand="Acurio" items={items} />);
    const trigger = desktopTrigger(container);
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("reveals the panel (column links + featured card) when the desktop trigger is clicked", () => {
    const { container } = render(<MegaMenu brand="Acurio" items={items} />);
    fireEvent.click(desktopTrigger(container));

    expect(container.querySelector('[role="region"][aria-label="Product menu"]')).toBeInTheDocument();
    // The column and featured links are present in the panel markup.
    expect(container.querySelector('a[href="#api"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="#wf"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="#start"]')).toBeInTheDocument();
  });

  it("sets aria-expanded while the panel is open and closes on Escape", () => {
    const { container } = render(<MegaMenu brand="Acurio" items={items} />);
    const trigger = desktopTrigger(container);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(screen.getByRole("banner"), { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("applies the inverse variant to the header shell", () => {
    render(<MegaMenu brand="Acurio" items={items} variant="inverse" />);
    expect(screen.getByRole("banner")).toHaveClass("bg-[#101010]/85");
  });

  it("toggles the mobile menu via the hamburger", () => {
    render(<MegaMenu brand="Acurio" items={items} />);
    const openBtn = screen.getByRole("button", { name: "Open menu" });
    expect(openBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(openBtn);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("does not render sticky when sticky is disabled", () => {
    render(<MegaMenu brand="Acurio" items={items} sticky={false} />);
    expect(screen.getByRole("banner")).not.toHaveClass("sticky");
  });

  it("renders the language switcher inside the mobile hamburger panel", () => {
    const { container } = render(
      <MegaMenu
        brand="Acurio"
        items={items}
        languageSwitcher={<LanguageSwitcher languages={languages} defaultValue="en" />}
      />,
    );

    // One trigger in the desktop action group, one inside the mobile panel.
    const triggers = container.querySelectorAll('button[aria-haspopup="listbox"]');
    expect(triggers.length).toBe(2);

    const mobileList = container.querySelector("ul.flex-col")!;
    expect(mobileList.querySelector('button[aria-haspopup="listbox"]')).toBeInTheDocument();
  });
});
