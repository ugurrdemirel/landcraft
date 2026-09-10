# Landcraft

![Landcraft — a React marketing component library](https://raw.githubusercontent.com/ugurrdemirel/landcraft/main/docs/preview.png)

A marketing / landing-page React component library — `@ugurdemirel/landcraft` —
built on Tailwind CSS 4 with token-based theming and automatic WCAG contrast,
plus a Storybook playground for previewing and customizing every component.

## Structure

```
landcraft/
├─ packages/ui/          @ugurdemirel/landcraft — component library
│  ├─ src/components/    Button, Badge, Card, Section, Navbar, MegaMenu, Hero,
│  │                     LogoCloud, FeatureGrid, FeatureShowcase, Stats, Pricing,
│  │                     Testimonials, CTA, FAQ, AccordionShowcase, Footer,
│  │                     Newsletter, Blog, Prose, Modal, LanguageSwitcher,
│  │                     Container, Stack
│  ├─ src/styles/        CSS variables (tokens) + Tailwind entry point
│  └─ src/styles/theme.css  Tailwind v4 theme (CSS) for consumer projects
└─ apps/storybook/       Storybook (React + Vite) — preview & customize
```

## Install

```bash
pnpm add @ugurdemirel/landcraft
# peers: react >=18, react-dom >=18, tailwindcss ^4
```

```tsx
import { Button, Hero } from "@ugurdemirel/landcraft";
import "@ugurdemirel/landcraft/styles.css";
```

Or reuse the theme in your own Tailwind v4 project by importing the CSS theme
file — no JS config or preset needed:

```css
/* app.css — wire it up with @tailwindcss/vite, @tailwindcss/postcss or the CLI */
@import "tailwindcss";
@import "@ugurdemirel/landcraft/theme.css";
```

The theme registers every color/font/radius/shadow token and the typography
plugin automatically.

> Tailwind v4 auto-detects classes in your own source but skips `node_modules`.
> If you build the library's components from your own CSS (instead of importing
> `@ugurdemirel/landcraft/styles.css`), point detection at the package:
>
> ```css
> @source "../node_modules/@ugurdemirel/landcraft";
> ```

## Options

Every component accepts an `option` / `variant` prop — same API, different look:

| Component | Options |
| --- | --- |
| Button | `primary` · `dark` · `outline` · `ghost` · `link` |
| Badge | `soft` · `solid` · `outline` · `dot` |
| Card | `outlined` · `elevated` · `inset` |
| Navbar | `classic` · `floating` · `inverse` |
| MegaMenu | `classic` · `floating` · `inverse` |
| Hero | `split` · `centered` · `statement` · `parallax` |
| LogoCloud | `quiet` · `marquee` · `strip` |
| FeatureGrid | `columns` · `bento` · `editorialRows` |
| FeatureShowcase | `mediaSide`: `left` · `right` |
| Stats | `editorial` · `hairline` · `cells` · `ticker` |
| Pricing | `cards` · `bento` · `compact` |
| Testimonials | `grid` · `carousel` · `marquee` |
| CTA | `panel` · `surface` · `inverse` |
| FAQ | `accordion` · `split` · `cards` (`allowMultiple`, `defaultOpen`) |
| Footer | `classic` · `minimal` · `editorial` |
| Newsletter | `inline` · `card` · `underline` |
| Blog (BlogSection/BlogCard) | `card` · `row` (`limit` shows the latest N posts) |
| Modal | `size`: `sm` · `md` · `lg` |
| LanguageSwitcher | `dropdown` · `modal` |

**Brand mark.** `Navbar`, `MegaMenu` and `Footer` accept a custom logo in place
of the wordmark: pass any node to `logo` (SVG, `<img>`, component…), or use
`logoSrc`/`logoAlt` for a quick image (`logoClassName` tunes its size, defaults
to `h-7 w-auto`).

## Theme & customization

Every design decision lives on CSS custom properties on `:root` and can be
**overridden from outside** — color, type, radii and shadows. Override any token
in your own CSS after the library import and the whole library re-skins, no
JavaScript or build config required.

### Branding tokens (required for a custom look)

Override these to make the library match your brand. Every color token ships a
paired `--color-on-*` value; set them together so text stays readable.

| Token | Default | Role |
| --- | --- | --- |
| `--color-primary` | `79 70 229` | Primary accent (buttons, links, highlights) |
| `--color-primary-hover` | `67 56 202` | Primary hover / pressed |
| `--color-primary-soft` | `238 242 255` | Soft primary fills (badges, highlights) |
| `--color-on-primary` | `255 255 255` | Text on primary |
| `--color-secondary` | `15 15 15` | Ink surfaces (footer, statement, inverse) |
| `--color-secondary-hover` | `38 38 38` | Ink surface hover / pressed |
| `--color-on-secondary` | `250 250 250` | Text on ink surfaces |
| `--color-accent` | `5 150 105` | Promo / success |
| `--color-accent-hover` | `4 120 87` | Accent hover / pressed |
| `--color-on-accent` | `255 255 255` | Text on accent |
| `--font-display` | `"Space Grotesk", …` | Display / heading type |
| `--font-sans` | `"DM Sans", …` | Body type |

### Optional tokens

Everything below already works out of the box. Override only if you want to
fine-tune the neutral palette, semantics or fine-grained detail.

| Token | Default | Role |
| --- | --- | --- |
| `--color-background` | `250 250 250` | Page background (warm paper) |
| `--color-foreground` | `17 17 17` | Main text |
| `--color-muted-foreground` | `97 97 97` | Secondary / helper text |
| `--color-surface` | `255 255 255` | Card surface |
| `--color-surface-strong` | `244 244 242` | Inset / pressed surfaces, inline code bg |
| `--color-border` | `229 229 228` | Hairline borders |
| `--color-ring` | `79 70 229` | Focus rings |
| `--color-danger` | `217 45 32` | Negative trends |
| `--color-danger-soft` | `255 241 242` | Soft danger fills |
| `--radius-sm` · `--radius-md` · `--radius-lg` | `0.375rem` · `0.625rem` · `0.875rem` | Small / medium / large radii |
| `--radius-xl` · `--radius-2xl` · `--radius-3xl` | `1.125rem` · `1.5rem` · `2rem` | Large card / modal radii |
| `--shadow-soft` | `0 1px 2px rgb(17 17 17 / 0.04), 0 2px 8px …` | Subtle resting elevation |
| `--shadow-raised` | `0 2px 4px …, 0 12px 32px …` | Card / popup elevation |
| `--shadow-overlay` | `0 24px 64px -12px …` | Modal / floating surface |

### Overriding tokens

Tokens store space-separated RGB channels (`79 70 229`) so the library's
`rgb(var(--color-x))` inline styles and Tailwind's opacity modifiers
(`bg-primary/50`, compiled to `color-mix()` against the live token) keep working.

```css
/* app.css */
@import "tailwindcss";
@import "@ugurdemirel/landcraft/theme.css";

:root {
  /* Branding (required) */
  --color-primary: 37 99 235;        /* blue-600 */
  --color-primary-hover: 29 78 216;  /* blue-700 */
  --color-primary-soft: 219 234 254; /* blue-100 */
  --color-on-primary: 255 255 255;
  --color-secondary: 15 23 42;
  --color-secondary-hover: 30 41 59;
  --color-on-secondary: 248 250 252;
  --color-accent: 5 150 105;
  --color-accent-hover: 4 120 87;
  --color-on-accent: 255 255 255;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Optional */
  --color-background: 248 250 252;
  --color-foreground: 15 23 42;
  --color-muted-foreground: 100 116 139;
  --color-surface: 255 255 255;
  --color-border: 226 232 240;
  --radius-2xl: 1.25rem;
  --shadow-raised: 0 2px 4px rgb(15 23 42 / 0.06), 0 12px 32px rgb(15 23 42 / 0.1);
}
```

Because the override targets the same custom property, every component — and any
Tailwind utility you write yourself (`bg-primary`, `text-muted-foreground`, …) —
picks it up immediately. Scope the overrides under `.dark` or a media query for
dark-mode variants.

### Contrast guarantees

1. **Paired tokens.** Every surface color ships with a matching `--color-on-*`
   text color, so readability is preserved as themes change together.
2. **Dynamic surfaces.** `customColor` props, gradient Hero/CTA panels and
   highlighted pricing cards use the CSS `contrast-color()` function to pick the
   most readable text color. Switch to a dark palette and the text flips
   automatically.

### Icons

No emojis. The library ships one consistent 24×24 stroke icon set (Lucide-style):
`ArrowRight`, `Check`, `Zap`, `ShieldCheck`, `Layers`, `Rocket`, `Mail`, … —
import them from the package.

## Layout

`Container` and `Stack` are the single source of the container + gutter rules
used across Section, Footer, CTA and BlogSection (`mx-auto w-full max-w-* px-5 sm:px-8`):

```tsx
import { Container, Stack } from "@ugurdemirel/landcraft";

<Container size="xl">          // sm | md | lg | xl | full
  <Stack gap={8}>              // vertical rhythm (0–20)
    <p>…</p>
    <Stack horizontal gap={4}><span>a</span><span>b</span></Stack>
  </Stack>
</Container>
// Use as="section" for other elements, gutters={false} for flush layouts.
```

## Content

`Prose` wraps `@tailwindcss/typography` and re-skins its colors and type through
the same tokens (headings use `--font-display`, `<pre>` uses the ink surface,
both `prose` and `prose-neutral` adapt to the palette):

```bash
pnpm add @ugurdemirel/landcraft @tailwindcss/typography
```

```tsx
import { Prose, ProseLead } from "@ugurdemirel/landcraft";

<Prose size="lg">
  <ProseLead>Intro paragraph…</ProseLead>
  <h2>Heading</h2>
  <p>Body…</p>
</Prose>
{/* CMS output: */}
<Prose html={articleBody} />
```

Projects using the theme need `@tailwindcss/typography` (optional peer; the
`theme.css` import already registers it via `@plugin`).

## Components

Button, Badge, Card (+Header/Title/Description/Content/Footer), Section (+Header),
Navbar, MegaMenu, Hero, LogoCloud, FeatureGrid/FeatureCard, FeatureShowcase,
Stats, Pricing, Testimonials/TestimonialCard, CTA, FAQ, AccordionShowcase,
Footer, Newsletter, Blog (BlogSection/BlogCard), Modal, LanguageSwitcher,
Prose (+ProseLead), Container, Stack, Slot, plus the icon set.

## What you can do in Storybook

- **Preview** every component and its stories from the left panel.
- **Customize** props live via the **Controls** panel (variant, size, customColor, text…).
- **Re-theme** from the **Palette** toolbar (indigo / forest / crimson / midnight-dark).
  Every component restyles instantly through `--color-*` tokens — a live demo of
  "design from the outside".
- **Audit accessibility** via the a11y panel (AA/AAA contrast results).

## Framework-aware links

Landcraft renders plain `<a>` tags by default so it works anywhere. When you use
a router (Next.js, Remix, React Router…), pass your framework's `<Link>` so
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

## Commands

```bash
pnpm install                 # install dependencies
pnpm build                   # builds @ugurdemirel/landcraft (JS + CSS + types)
pnpm storybook               # starts Storybook (http://localhost:6006)
pnpm build:storybook         # produces a static Storybook build (storybook-static/)
pnpm typecheck               # typechecks all packages
pnpm --filter @ugurdemirel/landcraft test   # run the component/unit tests
```
