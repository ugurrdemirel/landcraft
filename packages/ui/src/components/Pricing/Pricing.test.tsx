import { describe, it, expect, vi } from "vitest";
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

  it("renders the compact option", () => {
    render(<Pricing plans={plans} option="compact" />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
  });

  it("renders the bento option", () => {
    render(<Pricing plans={plans} option="bento" />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
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
