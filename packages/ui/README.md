# @ugurdemirel/landcraft

Landing / marketing-focused React component library.
One consistent design language — paper surfaces, ink text, a single accent — with
multiple visual options per component.

## Install

```bash
pnpm add @ugurdemirel/landcraft
# peers: react >=18, tailwindcss ^3.4
```

```tsx
import { Button, Hero } from "@ugurdemirel/landcraft";
import "@ugurdemirel/landcraft/styles.css";
```

Add the preset to your own Tailwind project:

```js
module.exports = {
  presets: [require("@ugurdemirel/landcraft/tailwind-preset")],
  content: [/* … */],
};
```

## Options

Every component accepts an `option` / `variant` prop — same API, different look:

| Component | Options |
| --- | --- |
| Navbar | `classic` · `floating` · `inverse` |
| Hero | `split` · `centered` · `statement` |
| LogoCloud | `quiet` · `marquee` · `strip` |
| FeatureGrid | `columns` · `bento` · `editorialRows` |
| Stats | `editorial` · `hairline` · `cells` · `ticker` |
| Pricing | `cards` · `bento` · `compact` |
| Testimonials | `grid` · `carousel` · `marquee` |
| CTA | `panel` · `surface` · `inverse` |
| FAQ | `accordion` · `split` · `cards` |
| Footer | `classic` · `minimal` · `editorial` |
| Newsletter | `inline` · `card` · `underline` |
| Blog (BlogSection/BlogCard) | `card` · `row` (`limit` shows the latest N posts) |

## Theme / Colors

Every design decision lives on CSS custom properties on `:root` and can be
**overridden from outside** — color, type, radii and shadows:

| Token | Default | Role |
| --- | --- | --- |
| `--color-primary` | `79 70 229` | Primary accent |
| `--color-on-primary` | `255 255 255` | Text on primary |
| `--color-secondary` | `15 15 15` | Ink surfaces (footer, statement, inverse) |
| `--color-on-secondary` | `250 250 250` | Text on ink surfaces |
| `--color-accent` | `5 150 105` | Promo / success |
| `--color-danger` / `--color-danger-soft` | `217 45 32` / `255 241 242` | Negative trends |
| `--color-background` | `250 250 250` | Paper background (not pure white) |
| `--color-foreground` | `17 17 17` | Main text |
| `--color-surface` | `255 255 255` | Card surface |
| `--color-border` | `229 229 228` | Hairline borders |
| `--font-display` | Space Grotesk | Display type |
| `--font-sans` | DM Sans | Body type |
| `--radius-2xl` | `1.5rem` | Large card radius |
| `--shadow-raised` | — | Elevation |

Tokens store space-separated RGB channels (`79 70 229`) so Tailwind's opacity syntax
(`bg-primary/50`) keeps working.

### Contrast guarantees

1. **Paired tokens.** Every surface color ships with a matching `--color-on-*` value;
   themes change together.
2. **Dynamic surfaces.** Gradient CTA panels, statement heroes and `customColor` use
   the WCAG relative-luminance formula at runtime (`getContrastText` /
   `useTokenForeground`). When a dark palette lightens the primary, text flips dark
   automatically.

### Icons

No emojis. The library ships one consistent 24×24 stroke icon set (Lucide-style):
`ArrowRight`, `Check`, `Zap`, `ShieldCheck`, `Layers`, `Rocket`, `Mail`, … — import
them from the package.

## Layout

`Container` and `Stack` are the single source of the container + gutter rules used
across Section, Footer, CTA and BlogSection (`mx-auto w-full max-w-* px-5 sm:px-8`):

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

`Prose` wraps `@tailwindcss/typography` and re-skins its colors and type through the
same tokens (headings use `--font-display`, `<pre>` uses the ink surface, both `prose`
and `prose-neutral` adapt to the palette):

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

Projects using the preset need `@tailwindcss/typography` (optional peer).

## Components

Button, Badge, Card (+Header/Title/Content/Footer), Section (+Header), Navbar, Hero,
LogoCloud, FeatureGrid/Card, Stats, Pricing, Testimonials, CTA, FAQ, Footer, Newsletter,
Blog (BlogSection/BlogCard), Prose (+ProseLead), Container, Stack.