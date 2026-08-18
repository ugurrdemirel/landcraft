import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Container } from "./Container";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
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

export const Footer = ({
  className,
  brand,
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  description,
  columns,
  socials,
  bottom,
  languageSwitcher,
  option = "classic",
  badge,
  LinkComponent,
  ...props
}: FooterProps) => {
  const Link = LinkComponent ?? "a";

  const logoNode = (imageClassName = "h-7 w-auto") =>
    logo ??
    (logoSrc ? (
      <img
        src={logoSrc}
        alt={logoAlt ?? (typeof brand === "string" ? brand : "Logo")}
        className={cn(imageClassName, logoClassName)}
      />
    ) : null);

  const brandNode = (
    <span className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-sm bg-current" />
      {brand}
    </span>
  );

  const classicBrand = logoNode() ?? brandNode;
  const minimalBrand = logoNode() ?? brandNode;
  const editorialBrand = logoNode("h-12 w-auto") ?? (
    <span className="font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-7xl">
      {brand}
    </span>
  );

  if (option === "minimal") {
    return (
      <footer className={cn("w-full border-t border-border bg-background", className)} {...props}>
        <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          {minimalBrand}
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {columns.flatMap((c) => c.links).slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-3">
            {languageSwitcher ? <div>{languageSwitcher}</div> : null}
            <div className="text-sm text-muted-foreground">{bottom}</div>
          </div>
        </Container>
      </footer>
    );
  }

  if (option === "editorial") {
    return (
      <footer className={cn("w-full border-t border-border bg-background", className)} {...props}>
        <Container className="py-16 sm:py-20">
          <div className="mb-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              {editorialBrand}
              {description ? (
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {socials ? <div className="flex items-center gap-3">{socials}</div> : null}
          </div>
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-foreground/80 transition-colors duration-150 hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
            <span>{bottom}</span>
            {languageSwitcher ? <div>{languageSwitcher}</div> : null}
            <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className={cn("w-full bg-secondary text-on-secondary", className)} {...props}>
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <span style={{ color: "rgb(var(--color-on-secondary))" }}>{classicBrand}</span>
            {description ? (
              <p className="mt-4 max-w-xs text-sm leading-6 text-on-secondary/60">{description}</p>
            ) : null}
            {socials ? <div className="mt-6 flex items-center gap-3">{socials}</div> : null}
            {badge ? <div className="mt-6">{badge}</div> : null}
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-secondary/50">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-secondary/70 transition-colors duration-150 hover:text-on-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-on-secondary/50 sm:flex-row">
          <span>{bottom}</span>
          {languageSwitcher ? <div>{languageSwitcher}</div> : null}
          <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
};
Footer.displayName = "Footer";