import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialCard } from "./TestimonialCard";
import { Testimonials } from "./Testimonials";

const items = [
  { quote: "Great product.", author: "Ayşe Yıldız", role: "Founder", company: "Lumina", rating: 5 },
  { quote: "Saved us hours.", author: "Mehmet Demir", company: "Nova" },
];

describe("TestimonialCard", () => {
  it("renders quote, author, role and company", () => {
    render(<TestimonialCard testimonial={items[0]} />);
    expect(screen.getByText("Great product.")).toBeInTheDocument();
    expect(screen.getByText("Ayşe Yıldız")).toBeInTheDocument();
    expect(screen.getByText("Founder · Lumina")).toBeInTheDocument();
  });

  it("renders initials for the default avatar", () => {
    render(<TestimonialCard testimonial={items[0]} />);
    expect(screen.getByText("AY")).toBeInTheDocument();
  });
});

describe("Testimonials", () => {
  it("renders all items in the grid (default) option", () => {
    render(<Testimonials items={items} option="grid" />);
    expect(screen.getByText("Great product.")).toBeInTheDocument();
    expect(screen.getByText("Saved us hours.")).toBeInTheDocument();
  });

  it("renders the marquee option (items are duplicated for the loop)", () => {
    render(<Testimonials items={items} option="marquee" />);
    expect(screen.getAllByText("Great product.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Saved us hours.").length).toBeGreaterThan(0);
  });

  it("renders a carousel that advances on next and cycles", () => {
    render(<Testimonials items={items} option="carousel" />);
    expect(screen.getByText("Great product.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByText("Saved us hours.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByText("Great product.")).toBeInTheDocument();
  });
});
