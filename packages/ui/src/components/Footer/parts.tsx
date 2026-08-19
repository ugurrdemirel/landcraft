import type { ElementType, ReactNode } from "react";
import { cn } from "../../utils/cn";
import type { FooterColumn } from "./types";

export function FooterLogoNode({
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  brand,
  imageClassName = "h-7 w-auto",
}: {
  logo?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  brand?: ReactNode;
  imageClassName?: string;
}) {
  if (logo) return logo;
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt ?? (typeof brand === "string" ? brand : "Logo")}
        className={cn(imageClassName, logoClassName)}
      />
    );
  }
  return null;
}

export function FooterWordmark({ brand }: { brand?: ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-sm bg-current" />
      {brand}
    </span>
  );
}

export function FooterEditorialWordmark({ brand }: { brand?: ReactNode }) {
  return (
    <span className="font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-7xl">
      {brand}
    </span>
  );
}

export function FooterColumnsBlock({
  columns,
  Link,
  linkClassName,
}: {
  columns: FooterColumn[];
  Link: ElementType;
  linkClassName: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {columns.map((column) => (
        <div key={column.title}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {column.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function FooterBottomBar({
  bottom,
  languageSwitcher,
  brand,
  wrapperClassName,
  textClassName,
}: {
  bottom?: ReactNode;
  languageSwitcher?: ReactNode;
  brand?: ReactNode;
  wrapperClassName: string;
  textClassName: string;
}) {
  return (
    <div className={wrapperClassName}>
      <span className={cn(textClassName)}>{bottom}</span>
      {languageSwitcher ? <div>{languageSwitcher}</div> : null}
      <span className={cn(textClassName)}>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
    </div>
  );
}