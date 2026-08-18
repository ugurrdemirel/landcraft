import { useEffect, useState } from "react";
import { getContrastText } from "./contrast";

function readChannel(variable: string): string {
  if (typeof window === "undefined") return "";
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

/**
 * Reads a `--color-*` token from the live stylesheet and returns a text color
 * that is always readable against it. Recomputes whenever the palette changes
 * at runtime (e.g. the Storybook theme switcher or an app-level theme swap).
 */
export function useTokenForeground(variable: string, fallback = "#ffffff"): string {
  const [text, setText] = useState<string>(() => {
    const value = readChannel(variable);
    return value ? getContrastText(value) : fallback;
  });

  useEffect(() => {
    const update = () => {
      const value = readChannel(variable);
      setText(value ? getContrastText(value) : fallback);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    return () => observer.disconnect();
  }, [variable, fallback]);

  return text;
}