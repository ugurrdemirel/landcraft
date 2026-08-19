import { describe, it, expect } from "vitest";
import { cn } from "../utils/cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cn("a", false, null, undefined, 0, "b")).toBe("a b");
  });

  it("handles nested arrays and objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("merges conflicting tailwind classes keeping the last", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
