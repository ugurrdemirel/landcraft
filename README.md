# Landcraft — Monorepo

A React component library for landing / marketing pages plus a Storybook playground.
Built on Tailwind CSS, token-based theming, with contrast guarantees.

## Structure

```
landcraft/
├─ packages/ui/          @ugurdemirel/landcraft — component library
│  ├─ src/components/    Button, Badge, Card, Section, Hero, Features,
│  │                     Stats, Pricing, Testimonials, CTA, Navbar,
│  │                     Footer, FAQ, Newsletter, LogoCloud, Blog, Prose,
│  │                     Container, Stack
│  ├─ src/styles/        CSS variables (tokens) + Tailwind entry point
│  └─ src/styles/theme.css  Tailwind v4 theme (CSS) for consumer projects
└─ apps/storybook/       Storybook 8 (React + Vite) — preview & customize
```

## Commands

```bash
pnpm install                 # install dependencies
pnpm build                   # builds @ugurdemirel/landcraft (JS + CSS + types)
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
   cards use the CSS `contrast-color()` function to pick the most readable text color.
   Switch to a dark palette and gradient text flips automatically.

## Using the library in your own project

```bash
pnpm add @ugurdemirel/landcraft
```

```tsx
import { Button, Hero } from "@ugurdemirel/landcraft";
import "@ugurdemirel/landcraft/styles.css";
```

Or reuse the theme in your own Tailwind v4 project by importing the CSS theme
(no JS config or preset needed):

```css
/* app.css — wire it up with @tailwindcss/vite, @tailwindcss/postcss or the CLI */
@import "tailwindcss";
@import "@ugurdemirel/landcraft/theme.css";

/* Branding (required) — override these to match your brand.
   Colors are space-separated RGB channels. */
:root {
  --color-primary: 37 99 235;        /* blue-600 */
  --color-primary-hover: 29 78 216;  /* blue-700 */
  --color-primary-soft: 219 234 254; /* blue-100 */
  --color-on-primary: 255 255 255;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* Optional — fine-tune the neutral palette, radii, shadows */
:root {
  --color-background: 248 250 252;
  --color-foreground: 15 23 42;
  --color-surface: 255 255 255;
  --color-border: 226 232 240;
  --radius-2xl: 1.25rem;
  --shadow-raised: 0 2px 4px rgb(15 23 42 / 0.06), 0 12px 32px rgb(15 23 42 / 0.1);
}
```

### Customization tokens

**Branding (required)** — color: `--color-primary`, `--color-primary-hover`,
`--color-primary-soft`, `--color-on-primary`, `--color-secondary`,
`--color-secondary-hover`, `--color-on-secondary`, `--color-accent`,
`--color-accent-hover`, `--color-on-accent` · typography: `--font-display`,
`--font-sans`.

**Optional** — `--color-background`, `--color-foreground`,
`--color-muted-foreground`, `--color-surface`, `--color-surface-strong`,
`--color-border`, `--color-ring`, `--color-danger`, `--color-danger-soft`,
radii (`--radius-sm` → `--radius-3xl`) and elevation (`--shadow-soft`,
`--shadow-raised`, `--shadow-overlay`).

Full token reference with defaults and roles: `packages/ui/README.md`.

### Framework-aware links

Landcraft renders plain `<a>` tags by default so it works anywhere. When you
use a router (Next.js, Remix, React Router…), pass your framework's `<Link>` so
navigation stays client-side and server-side correct.

**Single links — `asChild` on `Button`** (the button styles are applied to the
child element instead of a `<button>`):

```tsx
import { Button } from "@ugurdemirel/landcraft";
import Link from "next/link";

<Button asChild>
  <Link href="/pricing">Get started</Link>
</Button>
```

**Link lists — `LinkComponent` prop** on `Navbar`, `MegaMenu`, `Footer`, and
`BlogSection`/`BlogCard` (defaults to `<a>`):

```tsx
import { Navbar, Footer } from "@ugurdemirel/landcraft";
import Link from "next/link";

<Navbar links={links} LinkComponent={Link} />
<Footer columns={columns} LinkComponent={Link} />
```

The low-level `Slot` used to implement `asChild` is also exported if you want to
compose it yourself.