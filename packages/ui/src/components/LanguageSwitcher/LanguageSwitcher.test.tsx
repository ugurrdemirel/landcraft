import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
];

function trigger(container: HTMLElement): HTMLButtonElement {
  // The dropdown trigger is the only button with aria-haspopup="listbox".
  return container.querySelector('button[aria-haspopup="listbox"]')!;
}

describe("LanguageSwitcher", () => {
  it("renders a trigger showing the current language (dropdown by default)", () => {
    const { container } = render(
      <LanguageSwitcher languages={languages} defaultValue="tr" />,
    );
    expect(trigger(container)).toBeInTheDocument();
    expect(trigger(container)).toHaveTextContent("Türkçe");
  });

  it("opens a listbox and selects a language via onChange", () => {
    const onChange = vi.fn();
    const { container } = render(
      <LanguageSwitcher languages={languages} defaultValue="en" onChange={onChange} />,
    );

    fireEvent.click(trigger(container));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: /Türkçe/ }));
    expect(onChange).toHaveBeenCalledWith("tr");
  });

  it("marks the active option as selected", () => {
    const { container } = render(
      <LanguageSwitcher languages={languages} defaultValue="en" />,
    );
    fireEvent.click(trigger(container));

    const enOption = screen.getByRole("option", { name: /English/ });
    expect(enOption).toHaveAttribute("aria-selected", "true");
    const trOption = screen.getByRole("option", { name: /Türkçe/ });
    expect(trOption).toHaveAttribute("aria-selected", "false");
  });

  it("collapses the dropdown after selecting a language", () => {
    const { container } = render(
      <LanguageSwitcher languages={languages} defaultValue="en" />,
    );
    fireEvent.click(trigger(container));
    expect(trigger(container)).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("option", { name: /English/ }));
    expect(trigger(container)).toHaveAttribute("aria-expanded", "false");
  });

  it("renders nothing when there are no languages", () => {
    const { container } = render(<LanguageSwitcher languages={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
