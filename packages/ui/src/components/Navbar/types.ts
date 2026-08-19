import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export type NavbarVariant = "classic" | "floating" | "inverse";

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: NavbarVariant;
  /** Wordmark or fallback text rendered when no logo is supplied. */
  brand?: ReactNode;
  /** Custom logo node (component, <img>, inline SVG…). Replaces the wordmark. */
  logo?: ReactNode;
  /** Quick logo image source. */
  logoSrc?: string;
  logoAlt?: string;
  /** Size / position tuning for logo images. Defaults to `h-7 w-auto`. */
  logoClassName?: string;
  brandHref?: string;
  links: NavLink[];
  actions?: ReactNode;
  cta?: ReactNode;
  /** Optional language switcher rendered on the right (desktop) and beside the menu button (mobile). */
  languageSwitcher?: ReactNode;
  sticky?: boolean;
  /** Component used to render the brand and nav links. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}