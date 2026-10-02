import { describe, it, expect } from "vitest";
import { emphasisSurfaceStyle, emphasisGradient } from "./surface";

describe("emphasisSurfaceStyle", () => {
  it("paints the brand gradient and derives text from the primary token by default", () => {
    const style = emphasisSurfaceStyle();
    expect(style.background).toBe(emphasisGradient);
    // CSS-only contrast against the live token (assertable string form).
    expect(style.color).toBe("contrast-color(rgb(var(--color-primary)))");
  });

  it("binds a custom background to --lc-bg and derives text from it", () => {
    const style = emphasisSurfaceStyle("#101010");
    // Background and text share one source so they stay in sync.
    expect(style).toMatchObject({
      "--lc-bg": "#101010",
      backgroundColor: "var(--lc-bg)",
      color: "contrast-color(var(--lc-bg))",
    });
  });

  it("ignores an empty background override", () => {
    const style = emphasisSurfaceStyle("");
    expect(style.background).toBe(emphasisGradient);
    expect(style.color).toBe("contrast-color(rgb(var(--color-primary)))");
  });
});
