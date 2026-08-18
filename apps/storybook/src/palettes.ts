/**
 * Ready-to-use CSS custom property palettes.
 *
 * The library reads every design decision from `--color-*`, `--font-*` and
 * `--radius-*` tokens, so a palette only needs to override a handful of
 * channels — components re-style themselves automatically.
 */
export interface Palette {
  name: string;
  properties: Record<string, string>;
}

const PAPER = {
  "--color-background": "250 250 250",
  "--color-foreground": "17 17 17",
  "--color-muted-foreground": "97 97 97",
  "--color-surface": "255 255 255",
  "--color-surface-strong": "244 244 242",
  "--color-border": "229 229 228",
  "--color-secondary": "15 15 15",
  "--color-secondary-hover": "38 38 38",
  "--color-on-secondary": "250 250 250",
};

export const palettes: Palette[] = [
  {
    name: "indigo (default)",
    properties: {
      ...PAPER,
      "--color-primary": "79 70 229",
      "--color-primary-hover": "67 56 202",
      "--color-primary-soft": "238 242 255",
      "--color-on-primary": "255 255 255",
      "--color-accent": "5 150 105",
      "--color-accent-hover": "4 120 87",
      "--color-on-accent": "255 255 255",
      "--color-ring": "79 70 229",
    },
  },
  {
    name: "forest",
    properties: {
      ...PAPER,
      "--color-primary": "21 128 61",
      "--color-primary-hover": "15 102 47",
      "--color-primary-soft": "236 253 245",
      "--color-on-primary": "255 255 255",
      "--color-accent": "202 138 4",
      "--color-accent-hover": "161 98 7",
      "--color-on-accent": "255 255 255",
      "--color-ring": "21 128 61",
    },
  },
  {
    name: "crimson",
    properties: {
      ...PAPER,
      "--color-primary": "190 18 60",
      "--color-primary-hover": "159 18 57",
      "--color-primary-soft": "255 241 242",
      "--color-on-primary": "255 255 255",
      "--color-accent": "217 119 6",
      "--color-accent-hover": "180 83 9",
      "--color-on-accent": "255 255 255",
      "--color-ring": "190 18 60",
    },
  },
  {
    name: "midnight (dark)",
    properties: {
      "--color-primary": "139 141 248",
      "--color-primary-hover": "165 166 255",
      "--color-primary-soft": "38 38 64",
      "--color-on-primary": "13 13 20",
      "--color-accent": "52 211 153",
      "--color-accent-hover": "16 185 129",
      "--color-on-accent": "5 5 8",
      "--color-ring": "139 141 248",
      "--color-background": "9 9 11",
      "--color-foreground": "237 237 237",
      "--color-muted-foreground": "161 161 170",
      "--color-surface": "17 17 20",
      "--color-surface-strong": "24 24 28",
      "--color-border": "39 39 45",
      "--color-secondary": "24 24 28",
      "--color-secondary-hover": "39 39 45",
      "--color-on-secondary": "237 237 237",
      "--color-danger": "248 113 113",
      "--color-danger-soft": "69 35 35",
    },
  },
];