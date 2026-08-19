import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  brand?: ReactNode;
  /** Custom logo node (component, <img>, inline SVG…). Replaces the wordmark. */
  logo?: ReactNode;
  /** Quick logo image source. */
  logoSrc?: string;
  logoAlt?: string;
  /** Size / position tuning for logo images. Defaults to `h-7 w-auto`. */
  logoClassName?: string;
  description?: string;
  columns: FooterColumn[];
  socials?: ReactNode;
  bottom?: ReactNode;
  /** Optional language switcher rendered in the footer's bottom bar. */
  languageSwitcher?: ReactNode;
  option?: "classic" | "minimal" | "editorial";
  badge?: ReactNode;
  /** Component used to render footer links. Defaults to `<a>`. Pass your router's `<Link>` (Next.js, Remix, React Router…) for framework-aware navigation. */
  LinkComponent?: ElementType;
}