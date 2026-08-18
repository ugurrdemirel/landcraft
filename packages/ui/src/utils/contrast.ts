/**
 * Contrast utilities.
 *
 * The library ships paired semantic tokens (e.g. --color-primary /
 * --color-on-primary) so explicit pairings stay safe. For the few places where
 * a *dynamic* color paints a background (a `customColor` prop, a token-based
 * highlight card...) we pick the text color that yields the **best WCAG
 * contrast ratio** at runtime.
 *
 * Inputs may be hex colors, bare RGB channels ("21 128 61"), rgb() functions
 * (`rgb(21 128 61 / 0.95)`) or CSS variable references
 * (`rgb(var(--color-primary) / 0.85)`). Variable references are resolved
 * against the live stylesheet before computing luminance, so a re-themed
 * palette never produces a low-contrast combination.
 */

export type ColorInput = string;

function readVariable(name: string): string {
  if (typeof window === "undefined") return "";
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/** Resolve `var(--x)` references against the live stylesheet. */
function resolveVars(input: string): string {
  let str = input;
  const refs = str.match(/var\(--[\w-]+/g) ?? [];
  for (const ref of refs) {
    const name = ref.replace(/^var\(/, "");
    const resolved = readVariable(name);
    if (resolved) str = str.split(ref).join(resolved);
  }
  return str;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function channels(color: ColorInput): RGB | null {
  let str = color.trim();

  if (/^#([0-9a-f]{3}){1,2}$/i.test(str)) {
    if (str.length === 4) {
      str =
        "#" +
        str
          .slice(1)
          .split("")
          .map((c) => c + c)
          .join("");
    }
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
    };
  }

  const resolved = resolveVars(str);

  // Normalize rgb()/rgba() separators ("r g b / a", "r, g, b") and bare channels.
  const normalized = resolved.replace(/[()/;,]/g, " ");
  const parts = normalized.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (parts.length < 3) return null;
  // Alpha (4th component) is ignored: these colors paint opaque surfaces and
  // mixing against an unknown backdrop can't be modelled reliably.
  const [r, g, b] = parts;
  return {
    r: Math.max(0, Math.min(255, Math.round(r))),
    g: Math.max(0, Math.min(255, Math.round(g))),
    b: Math.max(0, Math.min(255, Math.round(b))),
  };
}

function relativeLuminance(color: ColorInput): number {
  const c = channels(color);
  if (!c) return 0;
  const lin = [c.r, c.g, c.b]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatio(lumA: number, lumB: number): number {
  const [hi, lo] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Returns the more readable of the two candidate text colors for a given
 * background. Both candidates are evaluated with the WCAG contrast formula and
 * the winning (highest ratio) color is returned — not a fixed luminance
 * breakpoint — so mid-luminance backgrounds (amber, pastels, light violet…)
 * always fall on the correct side.
 */
export function getContrastText(bg: ColorInput, light = "#ffffff", dark = "#0f172a"): string {
  const lumBg = relativeLuminance(bg);
  const lumLight = relativeLuminance(light);
  const lumDark = relativeLuminance(dark);
  return contrastRatio(lumBg, lumLight) >= contrastRatio(lumBg, lumDark) ? light : dark;
}