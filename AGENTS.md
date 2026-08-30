# AGENTS.md

Guidance for AI coding agents working in this repository.

## Workflow / branching

- When making a change, work on a dedicated branch — but do not open a new branch
  for every single change. Check the current branch name first; if the migration
  you are about to make fits the branch's purpose, keep working on that same
  branch. Never make these changes directly on branches like `main`.
- Open PRs in English and write them for developers (other engineers who will
  review the code), not for end users.

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

### Dynamic contrast via CSS `contrast-color()`

Text color for dynamic surfaces is chosen by the browser, never by JS:

- Use the native CSS `contrast-color(<color>)` function on any element whose
  background is dynamic (`customColor`, an `accent`, or a token that consumers
  can re-theme). It returns `white` or `black` (whichever contrasts better) and
  re-evaluates automatically when the source color changes at runtime.
- Do **not** reintroduce JS contrast helpers (hand-rolled WCAG luminance/ratio
  pickers). The old `getContrastText` / `useTokenForeground` utilities were
  removed; compute contrast in CSS only.
- Bind custom colors through a custom property so background and text share one
  source and stay in sync, e.g.:
  `--lc-bg: <color>; background-color: var(--lc-bg); color: contrast-color(var(--lc-bg));`
- Token-based surfaces bind directly to the token:
  `color: contrast-color(rgb(var(--color-accent)))`.
- The old draft name `color-contrast()` and its `vs <candidates>` list are
  **not** supported by browsers — always write `contrast-color()`.
- In tests, assert the binding string. jsdom's CSSOM drops `contrast-color()`
  values that contain a bare hex color (e.g. `contrast-color(#111111)`), so the
  `var(--…)` / `rgb(var(--…))` forms are the assertable ones.

### `"use client"` / React Server Components

The library runs in Next.js and other SSR frameworks, so the server/client
boundary is important:

- **Any file that calls React hooks** (`useState`, `useEffect`, `useRef`,
  `useId`, `useMemo`, `useReducer`, `useCallback`, …) **must start with the
  `"use client"` directive** as the first line. Otherwise Next.js throws
  `useState only works in Client Components`. This applies to the file that
  directly calls the hook (e.g. a `parts.tsx` or `variants/*.tsx`), not just the
  top-level dispatcher.
- Server-safe components (no hooks) must **not** have the directive, so they stay
  server components and keep the client bundle small. Only hook-using files get
  pulled into the client graph.
- Model it per module: a dispatcher can stay server-safe while rendering a
  client-marked variant — Next.js handles that boundary if props are serializable.

#### Build machinery (why it works)

- The `dist` JS output uses **`preserveModules`** (see `vite.config.ts`) rather
  than a single bundled file. This keeps each source file as its own
  `dist/es/...js` / `dist/cjs/...cjs` module so every `"use client"` directive
  survives and Next.js can read it from the imported module.
- Rollup otherwise strips `"use client"` directives during bundling. The custom
  `landcraft:preserve-client-directives` plugin in `vite.config.ts` re-emits the
  directive at the top of each chunk whose facade module originally declared it.
- `package.json` `exports` point `import` at `./dist/es/index.js` and `require`
  at `./dist/cjs/index.cjs`; the public single import is unchanged.
- Do **not** add a blanket `"use client"` to the entry/bundle — that would force
  every component into the client bundle, which defeats the tree-shaking /
  server-component size benefits.
