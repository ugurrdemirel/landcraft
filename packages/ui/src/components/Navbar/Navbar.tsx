"use client";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { Menu, X } from "../../icons";
import type { NavbarProps, NavbarVariant } from "./types";

interface NavbarStyle {
  shell: string;
  bar: string;
  header: string;
  link: string;
  mobilePanel: string;
  mobileLink: string;
  menuButton: string;
  brandText: string;
  brandDot: string;
  desktopList: string;
}

const inverse = "text-on-secondary";
const light = "text-foreground";

const styles: Record<NavbarVariant, NavbarStyle> = {
  classic: {
    shell: "border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
    bar: "mx-auto max-w-6xl px-5 sm:px-8",
    header: "px-0",
    link: "text-muted-foreground hover:text-foreground",
    mobilePanel: "border-t border-border bg-background",
    mobileLink:
      "text-muted-foreground hover:bg-surface hover:text-foreground",
    menuButton: `${light} hover:bg-surface`,
    brandText: light,
    brandDot: "bg-foreground",
    desktopList: "hidden items-center gap-7 md:flex",
  },
  floating: {
    shell: "px-0",
    bar: "mx-auto mt-3 max-w-5xl rounded-xl border border-border bg-surface/90 px-5 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-surface/70",
    header: "px-3 sm:px-6",
    link: "text-muted-foreground hover:text-foreground",
    mobilePanel:
      "mx-3 mb-3 max-w-5xl overflow-hidden rounded-b-xl border border-border bg-surface",
    mobileLink:
      "text-muted-foreground hover:bg-surface hover:text-foreground",
    menuButton: `${light} hover:bg-surface`,
    brandText: light,
    brandDot: "bg-foreground",
    desktopList: "hidden items-center gap-7 md:flex",
  },
  inverse: {
    shell: "border-b border-white/10 bg-[#101010]/85 backdrop-blur-md",
    bar: "mx-auto max-w-6xl px-5 sm:px-8",
    header: "px-0",
    link: "text-on-secondary/60 hover:text-on-secondary",
    mobilePanel: "border-t border-white/10 bg-[#101010]",
    mobileLink:
      "text-on-secondary/70 hover:bg-white/10 hover:text-on-secondary",
    menuButton: `${inverse} hover:bg-white/10`,
    brandText: inverse,
    brandDot: "bg-on-secondary",
    desktopList: "hidden items-center gap-7 md:flex",
  },
};

export const Navbar = ({
  className,
  variant = "classic",
  brand,
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  brandHref = "#",
  links,
  actions,
  cta,
  languageSwitcher,
  sticky = true,
  LinkComponent,
  ...props
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const Link = LinkComponent ?? "a";
  const s = styles[variant];

  const logoNode =
    logo ??
    (logoSrc ? (
      <img
        src={logoSrc}
        alt={logoAlt ?? (typeof brand === "string" ? brand : "Logo")}
        className={cn("h-7 w-auto", logoClassName)}
      />
    ) : null);

  const brandNode = logoNode ? (
    <span className="flex items-center">{logoNode}</span>
  ) : (
    <span className={cn("flex items-center gap-2 font-display text-[17px] font-bold tracking-tight", s.brandText)}>
      <span aria-hidden className={cn("inline-block h-2.5 w-2.5 rounded-sm", s.brandDot)} />
      {brand}
    </span>
  );

  return (
    <header className={cn("w-full transition-colors duration-200", sticky && "sticky top-0 z-50", s.shell, s.header, className)} {...props}>
      <nav className={cn("flex h-16 w-full items-center justify-between gap-4 transition-colors duration-200", s.bar)} aria-label="Main navigation">
        <Link href={brandHref} className="shrink-0">
          {brandNode}
        </Link>

        <ul className={s.desktopList}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn("text-sm font-medium transition-colors duration-150", s.link)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {languageSwitcher}
          {actions}
          {cta}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md md:hidden",
            "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            s.menuButton,
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          s.mobilePanel,
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className={cn("flex flex-col py-4", variant !== "floating" && "px-5")}>
            {languageSwitcher ? (
              <li className="px-2 pb-4">{languageSwitcher}</li>
            ) : null}
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-2 py-2.5 text-sm font-medium transition-colors duration-150",
                    s.mobileLink,
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {cta ? (
              <li className="mt-3 px-2 pb-2">{cta}</li>
            ) : actions ? (
              <li className="mt-3 flex flex-wrap gap-3 px-2 pb-2">{actions}</li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  );
};
Navbar.displayName = "Navbar";