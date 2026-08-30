import { describe, it, expect } from "vitest";
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

  it("keeps the bento price on the same row as the plan name even with a long description", () => {
    render(
      <Pricing
        option="bento"
        plans={[
          {
            name: "Starter",
            description: "A long description that should never push the price onto its own line ".repeat(3),
            monthly: 9,
            yearly: 90,
            features: [],
          },
        ]}
      />,
    );
    const price = screen.getByText("$9");
    const row = price.parentElement?.parentElement;
    expect(row).toBeInTheDocument();
    expect(row).not.toHaveClass("flex-wrap");
    expect(row?.firstElementChild).toHaveClass("min-w-0");
    expect(price.parentElement).toHaveClass("shrink-0");
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
  it("binds the badge text color to contrast-color() against the accent token", () => {
    render(<Pricing plans={plans} yearlyBadge="2 months free" />);
    expect(screen.getByText("2 months free")).toHaveStyle(
      "color: contrast-color(rgb(var(--color-accent)));",
    );
  });
});
