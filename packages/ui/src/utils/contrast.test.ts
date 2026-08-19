import { describe, it, expect, vi, afterEach } from "vitest";
import { getContrastText } from "../utils/contrast";

describe("getContrastText", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a light text on very dark backgrounds", () => {
    expect(getContrastText("#000000")).toBe("#ffffff");
    expect(getContrastText("#111111")).toBe("#ffffff");
    expect(getContrastText("#0f172a")).toBe("#ffffff");
  });

  it("returns a dark text on very light backgrounds", () => {
    expect(getContrastText("#ffffff")).toBe("#0f172a");
    expect(getContrastText("#f5f5f5")).toBe("#0f172a");
    expect(getContrastText("#fafafa")).toBe("#0f172a");
  });

  it("respects a custom light/dark candidate pair", () => {
    // On white, the black candidate has more contrast than the white candidate.
    expect(getContrastText("#ffffff", "#000000", "#ffffff")).toBe("#000000");
    // On black, the white candidate has more contrast.
    expect(getContrastText("#000000", "#000000", "#ffffff")).toBe("#ffffff");
  });

  it("handles 3-digit shorthand hex", () => {
    expect(getContrastText("#fff")).toBe("#0f172a");
    expect(getContrastText("#000")).toBe("#ffffff");
  });

  it("handles lowercase and mixed-case hex", () => {
    expect(getContrastText("#FFFFFF")).toBe("#0f172a");
    expect(getContrastText("#000000")).toBe("#ffffff");
  });

  it("handles bare RGB channel triplets", () => {
    expect(getContrastText("21 128 61")).toBe("#ffffff");
    expect(getContrastText("255 255 255")).toBe("#0f172a");
  });

  it("handles rgb() and rgba() functions", () => {
    expect(getContrastText("rgb(0 0 0)")).toBe("#ffffff");
    expect(getContrastText("rgb(255, 255, 255)")).toBe("#0f172a");
    expect(getContrastText("rgb(0 0 0 / 0.9)")).toBe("#ffffff");
  });

  it("picks the high-contrast side for mid-luminance colors", () => {
    // Amber (#eab308) is bright — dark text should win.
    expect(getContrastText("#eab308")).toBe("#0f172a");
    // A mid violet keeps white text readable.
    expect(getContrastText("#4f46e5")).toBe("#ffffff");
  });

  it("resolves CSS variable references against the live stylesheet when in a DOM", () => {
    const root = document.documentElement;
    const getComputedStyle = vi.spyOn(window, "getComputedStyle");
    getComputedStyle.mockReturnValue({
      getPropertyValue: (name: string) => (name === "--color-primary" ? "21 128 61" : ""),
    } as CSSStyleDeclaration);
    root.setAttribute("style", "--color-primary: 21 128 61");

    expect(getContrastText("rgb(var(--color-primary) / 0.85)")).toBe("#ffffff");
  });

  it("falls back to the light candidate when the input is unparsable", () => {
    // An unknown color yields luminance 0, so light text wins by default.
    expect(getContrastText("not-a-color")).toBe("#ffffff");
  });
});
