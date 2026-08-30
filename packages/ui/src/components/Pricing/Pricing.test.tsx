import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pricing } from "./Pricing";

const plans = [
  {
    name: "Starter",
    monthly: 9,
    yearly: 90,
    features: ["1 project"],
    cta: "Get started",
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 290,
    highlighted: true,
    features: ["Unlimited projects"],
    cta: "Go Pro",
  },
];

describe("Pricing", () => {
  it("renders plan names, prices and the cards option by default", () => {
    render(<Pricing plans={plans} />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    // Monthly price for the starter plan is $9 (default billing = monthly).
    expect(screen.getByText("$9")).toBeInTheDocument();
  });

  it("switches between monthly and yearly billing via the toggle", () => {
    render(<Pricing plans={[plans[0]]} />);
    expect(screen.getByText("$9")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders the compact option with a billing toggle", () => {
    render(<Pricing plans={plans} option="compact" />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$9")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders the bento option with a billing toggle", () => {
    render(<Pricing plans={plans} option="bento" />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$9")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders a custom yearly badge via the yearlyBadge prop", () => {
    render(<Pricing plans={plans} yearlyBadge="2 months free" />);
    expect(screen.getByText("2 months free")).toBeInTheDocument();
    expect(screen.queryByText("−2 ay")).not.toBeInTheDocument();
  });

  it("does not render a yearly badge when yearlyBadge is not provided", () => {
    render(<Pricing plans={plans} />);
    expect(screen.queryByText("−2 ay")).not.toBeInTheDocument();
  });

  it("calls onSelect with the plan and current billing when a plan button is pressed", () => {
    const onSelect = vi.fn();
    render(<Pricing plans={[plans[0]]} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Get started" }));
    expect(onSelect).toHaveBeenCalledWith(plans[0], "monthly");
  });

  it("renders a price label for custom (null) pricing", () => {
    render(
      <Pricing
        plans={[
          { name: "Enterprise", monthly: null, yearly: null, features: [], cta: "Contact" },
        ]}
      />,
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});

describe("Pricing billing badge contrast", () => {
  class FakeMutationObserver {
    observe() {}
    disconnect() {}
  }

  function stubComputedStyle(resolver: (name: string) => string) {
    vi.stubGlobal("MutationObserver", FakeMutationObserver as unknown as typeof MutationObserver);
    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: (name: string) => resolver(name),
    } as CSSStyleDeclaration);
  }

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("derives a dark badge text color for a light accent token", () => {
    stubComputedStyle((name) => (name === "--color-accent" ? "255 255 255" : ""));
    render(<Pricing plans={plans} yearlyBadge="2 months free" />);
    expect(screen.getByText("2 months free")).toHaveAttribute("style", "color: rgb(15, 23, 42);");
  });

  it("derives a light badge text color for a dark accent token", () => {
    stubComputedStyle((name) => (name === "--color-accent" ? "5 5 5" : ""));
    render(<Pricing plans={plans} yearlyBadge="2 months free" />);
    expect(screen.getByText("2 months free")).toHaveAttribute("style", "color: rgb(255, 255, 255);");
  });

  it("falls back to a readable contrast-based color (not white) when the accent token is unreadable", () => {
    stubComputedStyle(() => "");
    render(<Pricing plans={plans} yearlyBadge="2 months free" />);
    expect(screen.getByText("2 months free")).toHaveAttribute("style", "color: rgb(15, 23, 42);");
  });
});
