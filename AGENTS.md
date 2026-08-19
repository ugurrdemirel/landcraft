# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

Monorepo (`pnpm` workspaces) containing:

- `packages/ui` — `@ugurdemirel/landcraft`, a marketing/landing-page React component
  library built on Tailwind CSS 4 with token-based theming and automatic WCAG
  contrast.
- `apps/storybook` — Storybook playground and design documentation.

## Commands

- `pnpm build` — build the UI package (JS + CSS + `.d.ts`).
- `pnpm typecheck` — TypeScript across all workspaces.
- `pnpm --filter @ugurdemirel/landcraft test` — run the component/unit test suite.
- `pnpm --filter @ugurdemirel/landcraft test:watch` — watch mode.
- `pnpm storybook` — run Storybook in dev.
- `pnpm build:storybook` — build static Storybook.

## Testing: TDD approach

Every component and utility follows a **test-first (TDD)** workflow. Tests are the
spec: they are written alongside (or before) the implementation and cover **all
variants and states** of a component.

### Stack

- **Vitest 3** (jsdom environment, globals enabled).
- **@testing-library/react** + **@testing-library/jest-dom** + **user-event** for
  DOM queries and interactions.

### Conventions

- Test files colocate with source: `src/components/<Name>/<Name>.test.tsx` (or
  `src/utils/<name>.test.ts`).
- Write meaningful behavior tests, not snapshots or style-string coupling. Assert
  on roles, accessible names, attributes, and rendered structure/state.
- Cover **every variant/option prop** (`variant`, `option`, `size`, …) and every
  key state (open/closed, empty, loading, disabled, etc.).
- Prefer `getByRole` with accessible names. When a component intentionally stays
  in the DOM but is hidden via responsive classes or the Popover API
  (`[popover]`, `hidden md:flex`, `invisible`), Tailwind classes are **not**
  applied in jsdom — so hidden elements remain queryable. Scope with
  `container.querySelector`/`within()` and target trigger elements via stable
  attributes (e.g. `aria-haspopup`, `button[aria-haspopup="true"]`).
- Use `userEvent` for realistic interactions unless hover+click conflicts (e.g.
  the hover-driven MegaMenu) make `fireEvent` more deterministic.
- Modal uses the HTML Popover API which jsdom lacks — stub
  `showPopover`/`hidePopover` and `:popover-open` matching in the test.

### Adding a new component

1. Write the test file first (all variants + states → red).
2. Implement the component (green).
3. Keep the public shape: one import, variant-driven — implementation may split
   into dispatcher + `variants/` + shared `parts` as long as the public API stays
   a single `option`/`variant` switch.

## Build / type notes

- `packages/ui/src/index.ts` is the public entry; keep every public export there.
- Tests are excluded from the published `.d.ts` via `tsconfig.build.json`
  (referenced by `vite-plugin-dts`). Do not emit test files into `dist`.
- Components that call React hooks must carry the `"use client"` directive so the
  library works in Next.js Server Components.
