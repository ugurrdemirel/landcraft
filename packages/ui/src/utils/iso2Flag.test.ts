import { describe, it, expect } from "vitest";
import { iso2ToFlagEmoji } from "../utils/iso2Flag";

describe("iso2ToFlagEmoji", () => {
  it("converts a known country code to its flag emoji", () => {
    expect(iso2ToFlagEmoji("tr")).toBe("🇹🇷");
    expect(iso2ToFlagEmoji("us")).toBe("🇺🇸");
    expect(iso2ToFlagEmoji("de")).toBe("🇩🇪");
  });

  it("is case-insensitive", () => {
    expect(iso2ToFlagEmoji("TR")).toBe("🇹🇷");
    expect(iso2ToFlagEmoji("Tr")).toBe("🇹🇷");
  });

  it("returns an empty string for non-country codes like language codes", () => {
    expect(iso2ToFlagEmoji("en")).toBe("");
    expect(iso2ToFlagEmoji("qq")).toBe("");
  });

  it("returns an empty string for empty or invalid input", () => {
    expect(iso2ToFlagEmoji("")).toBe("");
    expect(iso2ToFlagEmoji("x")).toBe("");
    expect(iso2ToFlagEmoji("zz")).toBe("");
  });
});
