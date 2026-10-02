# Landcraft design contract

This document is the source of truth for how components in
`@ugurdemirel/landcraft` are designed. When a component and this document
disagree, the component is wrong.

The goal is **one design language with many layouts** — not a collection of
independently styled themes. A consumer should be able to swap one layout for
another without the typography, color, spacing, radii or motion changing.

## 1. Variants describe layout, never skin

A component's `option` / `variant` prop answers *"how is the content arranged?"*
It must never answer *"what color is it?"* or *"what type style is it?"*.

- Good: `card` / `row`, `split` / `centered`, `panel` / `surface`.
- Bad: `classic` / `editorial` / `minimal`, `inverse` / `ink`, `dark`.

`Blog` is the reference implementation: `BlogCard` with `option="card"` and
`option="row"` render the **same** `Cover`, `AuthorMark` and `Badge` parts with
the same type and borders — only the composition changes. Copy that model.

Variant names should be a short, literal description of the composition. When in
doubt, name the shape: `stacked`, `columns`, `split`, `rows`, `ticker`, `cells`.

## 2. The shared visual language

Every layout composes the same primitives. These are not per-variant choices.

### Type

| Role | Font | Size / style |
| --- | --- | --- |
| Display / headings | `--font-display` (Space Grotesk) | semibold, `tracking-[-0.03em]`, `text-balance` |
| Body | `--font-sans` (DM Sans) | `leading-7`, muted for supporting copy |
| Eyebrow | `--font-sans` | `text-xs font-semibold uppercase tracking-[0.18em] text-primary` |
| Meta / captions | `--font-sans` | `text-xs` or `text-sm`, `text-muted-foreground`, `tabular-nums` for dates/figures |

Headings never hard-code a text color per variant. A layout that inherits a
contrast color (see §4) omits the color class; a layout on the page background
adds `text-foreground` explicitly.

### Surfaces

There are exactly four surfaces, all driven by tokens:

| Surface | Token | Use |
| --- | --- | --- |
| Page | `--color-background` | Default section background |
| Card | `--color-surface` | Raised content (cards, popovers) |
| Inset | `--color-surface-strong` | Sunken content, inline code |
| Emphasis | `--color-primary` (gradient) | "Bold" bands, closing CTAs |

Hairlines use `--color-border`. Radii come from the `--radius-*` scale; shadows
from `--shadow-soft` / `--shadow-raised` / `--shadow-overlay`.

### Spacing

Sections use a shared rhythm — `py-20 sm:py-24` (or `Section`'s `sm`/`md`/`lg`),
inside a `Container` (`max-w-6xl px-5 sm:px-8`). Gaps sit on the 4px scale.

## 3. No ink / inverse skins

Components must not ship a hard-coded dark ("ink") surface. The old
`--color-secondary` skins (`CTA: inverse`, `Hero: statement`'s ink band,
`Navbar`/`MegaMenu: inverse`, `Footer: classic`, `Button: dark`) are being
retired.

- **Default** compositions sit on the page/card surfaces.
- **Emphasis** comes from `--color-primary`, not black. A bold band is painted
  with the brand token and `contrast-color(rgb(var(--color-primary)))`, so it
  re-skins with the palette.
- `--color-secondary` remains a neutral token for incidental dark elements
  (e.g. `<pre>` code blocks). It is not a component skin.

## 4. Dynamic contrast is CSS-only

Any element whose background is dynamic **must** pick its text color with the
CSS `contrast-color()` function — never a JS luminance helper.

- Token surfaces: `color: contrast-color(rgb(var(--color-primary)));`
- Arbitrary colors: bind the background to a custom property so background and
  text share one source:

  ```css
  --lc-bg: <color>;
  background-color: var(--lc-bg);
  color: contrast-color(var(--lc-bg));
  ```

The shared `emphasisSurfaceStyle(background?)` helper (`utils/surface.ts`)
implements both cases for the emphasis band, so every emphasis section paints the
exact same gradient and contrast behavior.

## 5. The `background` escape hatch

When a consumer needs a custom emphasis surface, components expose a single
`background?: string` prop that accepts any CSS color. It overrides the brand
gradient and derives the text color with `contrast-color()`. This replaces the
old "inverse" variants: a dark band is now an explicit consumer choice, not a
built-in skin.

```tsx
<CTA option="panel" title="…" background="rgb(var(--color-secondary))" />
<Hero variant="statement" title="…" background="#101010" />
```

The prop only affects layouts that actually paint an emphasis surface
(`CTA: panel`, `Hero: statement`). Layouts on the page background are unaffected.

### Buttons on an emphasis band inherit its contrast color

CSS `contrast-color()` can only see an element's **own** background — it cannot
read an ancestor's, and it cannot resolve token colors behind `var()`. So an
outline/ghost button sitting on an emphasis band cannot compute the band's
contrast itself; left alone it would paint `--color-foreground` and vanish on a
dark band.

Instead, the band emits its resolved contrast color through `currentColor`, and
its action area is marked with `data-emphasis`. Buttons that have no fill of
their own (`outline`, `ghost`) are marked `data-unfilled`, and the `theme.css`
rule scoped to `[data-emphasis] [data-unfilled]` makes them use `currentColor`
for text and border, with a translucent currentColor hover fill. Filled buttons
(`primary`, `bg-surface`, `customColor`) keep their own background and
`contrast-color()` text.

The `data-unfilled` hook is deliberate: matching on utility classes like
`text-foreground` is brittle because `hover:bg-surface` makes a filled button
look unfilled to a substring selector. The markup attribute is exact.

This is automatic: a `Button variant="outline"` or `variant="ghost"` inside
`CTA option="panel"`, `Hero variant="statement"`, or any `background`-tinted
`Navbar`/`MegaMenu`/`Footer` adapts with no per-button override.

## 6. Public API conventions

- One import, one variant switch: `option` or `variant` (match the component's
  existing name), plus layout-only values.
- Variants may share a `parts.tsx` (or `parts/`) for the elements they have in
  common. If two variants hand-roll their own heading, that is a bug.
- Framework-agnostic links: `LinkComponent` for link lists, `asChild` on
  `Button` for single links.
- Any file calling React hooks starts with `"use client"`; server-safe files do
  not.

## 7. Migration map

Ink/secondary skins are removed and, where a component named *styles* rather
than *layouts*, variants are renamed. Work is landing incrementally; this table
tracks the target.

| Component | Before | Target |
| --- | --- | --- |
| CTA | `panel` · `surface` · `inverse` | ✅ `panel` · `surface` (+ `background` on `panel`) |
| Hero | `split` · `centered` · `statement` · `parallax` | ✅ unchanged, but `statement` is a primary emphasis band; `background` overrides it |
| Navbar | `classic` · `floating` · `inverse` | ✅ `classic` · `floating` (+ `background`) |
| MegaMenu | `classic` · `floating` · `inverse` | ✅ `classic` · `floating` (+ `background`) |
| Footer | `classic` · `minimal` · `editorial` | ✅ `columns` · `minimal` · `editorial` on the page surface (+ `background`) |
| Button | `primary` · `dark` · `outline` · `ghost` · `link` | ✅ `primary` · `outline` · `ghost` · `link` (+ `customColor`) |
| Stats | `editorial` · `hairline` · `cells` · `ticker` | ✅ `stacked` · `divided` · `cells` · `ticker` |

> **Status:** the contract and all component passes are implemented. No rows
> pending.
