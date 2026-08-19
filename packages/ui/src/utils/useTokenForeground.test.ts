import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTokenForeground } from "../utils/useTokenForeground";

class FakeMutationObserver {
  observe() {}
  disconnect() {}
}

describe("useTokenForeground", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function stubComputedStyle(resolver: (name: string) => string) {
    vi.stubGlobal(
      "MutationObserver",
      FakeMutationObserver as unknown as typeof MutationObserver,
    );
    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: (name: string) => resolver(name),
    } as CSSStyleDeclaration);
  }

  it("returns the fallback when the token cannot be resolved", () => {
    stubComputedStyle(() => "");
    const { result } = renderHook(() => useTokenForeground("--color-primary"));
    expect(result.current).toBe("#ffffff");
  });

  it("returns light text for a dark token value", () => {
    stubComputedStyle(() => "21 128 61");
    const { result } = renderHook(() => useTokenForeground("--color-primary"));
    expect(result.current).toBe("#ffffff");
  });

  it("returns dark text for a light token value", () => {
    stubComputedStyle(() => "255 255 255");
    const { result } = renderHook(() => useTokenForeground("--color-secondary"));
    expect(result.current).toBe("#0f172a");
  });

  it("honours a custom fallback", () => {
    stubComputedStyle(() => "");
    const { result } = renderHook(() =>
      useTokenForeground("--color-missing", "#123456"),
    );
    expect(result.current).toBe("#123456");
  });
});
