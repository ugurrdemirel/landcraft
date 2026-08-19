import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface MegaMenuLink {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  title?: string;
  links: MegaMenuLink[];
}

export interface MegaMenuFeatured {
  title: string;
  description?: string;
  href: string;
  cta?: string;
  /** Background color for the card; glyph text color is computed for contrast. */
  accent?: string;
}

export interface MegaMenuItem {
  label: string;
  href?: string;
  /** When set, the item becomes a trigger that opens a mega panel. */
  columns?: MegaMenuColumn[];
  /** Optional highlighted card pinned to the right side of the panel. */
  featured?: MegaMenuFeatured;
  /** Small pill rendered next to the trigger label. */
  badge?: string;
}

export type MegaMenuVariant = "classic" | "floating" | "inverse";

export interface MegaMenuProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: MegaMenuVariant;
  /** Wordmark rendered when no logo is supplied. */
  brand?: ReactNode;
  /** Custom logo node (component, <img>, inline SVG…). Replaces the wordmark. */
  logo?: ReactNode;
  /** Quick logo image source. */
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  brandHref?: string;
  items: MegaMenuItem[];
  /** Rendered at the right side of the bar (desktop) and inside the mobile panel. */
  actions?: ReactNode;
  cta?: ReactNode;
  /** Optional language switcher rendered on the right (desktop) and beside the menu button (mobile). */
  languageSwitcher?: ReactNode;
  sticky?: boolean;
  /** Component used to render brand, trigger and panel links. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}