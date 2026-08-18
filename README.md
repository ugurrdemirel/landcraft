# Marketing UI — Monorepo

A React component library for landing / marketing pages plus a Storybook playground.
Built on Tailwind CSS, token-based theming, with contrast guarantees.

## Structure

```
marketing-ui/
├─ packages/ui/          @marketing-ui/core — component library
│  ├─ src/components/    Button, Badge, Card, Section, Hero, Features,
│  │                     Stats, Pricing, Testimonials, CTA, Navbar,
│  │                     Footer, FAQ, Newsletter, LogoCloud, Blog, Prose,
│  │                     Container, Stack
│  ├─ src/styles/        CSS variables (tokens) + Tailwind entry point
│  └─ tailwind.preset    Tailwind preset for consumer projects
└─ apps/storybook/       Storybook 8 (React + Vite) — preview & customize
```

## Commands

```bash
pnpm install                 # install dependencies
pnpm build                   # builds @marketing-ui/core (JS + CSS + types)
pnpm storybook               # starts Storybook (http://localhost:6006)
pnpm build:storybook         # produces a static Storybook build (storybook-static/)
pnpm typecheck               # typechecks all packages
```

## What you can do in Storybook

- **Preview** every component and its stories from the left panel.
- **Customize** props live via the **Controls** panel (variant, size, customColor, text…).
- **Re-theme** from the **Palette** toolbar (indigo / forest / crimson / midnight-dark).
  Every component restyles instantly through `--color-*` tokens — a live demo of
  "design from the outside".
- **Audit accessibility** via the a11y panel (AA/AAA contrast results).

## Color system & contrast

1. **Tokens.** All colors are CSS custom properties on `:root`
   (`--color-primary`, `--color-on-primary`, `--color-background`, …). Overriding them
   is a one-liner; no HTML/JS required.
2. **Paired tokens.** Every surface color ships with a matching `--color-on-*` text
   color, so readability is preserved as themes change together.
3. **Dynamic surfaces.** `customColor` props, gradient Hero/CTA and highlighted pricing
   cards read the painted background at runtime and pick the most readable text color
   via the **WCAG relative-luminance** formula (`getContrastText` / `useTokenForeground`).
   Switch to a dark palette and gradient text flips automatically.

## Using the library in your own project

```bash
pnpm add @marketing-ui/core
```

```tsx
import { Button, Hero } from "@marketing-ui/core";
import "@marketing-ui/core/styles.css";
```

Or reuse the preset in your own Tailwind project:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@marketing-ui/core/tailwind-preset")],
  content: [/* your content */],
};
```

Full token reference: `packages/ui/README.md`.