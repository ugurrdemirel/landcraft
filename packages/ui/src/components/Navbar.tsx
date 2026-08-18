import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Menu, X } from "../icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: "classic" | "floating" | "inverse";
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
  sticky?: boolean;
  cta?: ReactNode;
}

const linkStyles = {
  classic: "text-muted-foreground hover:text-foreground",
  floating: "text-muted-foreground hover:text-foreground",
  inverse: "text-on-secondary/60 hover:text-on-secondary",
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
  sticky = true,
  ...props
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const inverse = variant === "inverse";

  const shell = cn(
    "w-full transition-colors duration-200",
    sticky && "sticky top-0 z-50",
    variant === "classic" &&
      "border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
    variant === "floating" && "px-0",
    variant === "inverse" && "border-b border-white/10 bg-[#101010]/85 backdrop-blur-md",
  );

  const bar = cn(
    "flex h-16 w-full items-center justify-between gap-4 transition-colors duration-200",
    variant === "floating" &&
      "mx-auto mt-3 max-w-5xl rounded-xl border border-border bg-surface/90 px-5 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-surface/70",
    variant === "classic" && "mx-auto max-w-6xl px-5 sm:px-8",
    variant === "inverse" && "mx-auto max-w-6xl px-5 sm:px-8",
  );

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
    <span
      className={cn(
        "flex items-center gap-2 font-display text-[17px] font-bold tracking-tight",
        inverse ? "text-on-secondary" : "text-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-2.5 w-2.5 rounded-sm",
          inverse ? "bg-on-secondary" : "bg-foreground",
        )}
      />
      {brand}
    </span>
  );

  return (
    <header className={cn(shell, variant === "floating" && "px-3 sm:px-6", className)} {...props}>
      <nav className={bar} aria-label="Main navigation">
        <a href={brandHref} className="shrink-0">
          {brandNode}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  linkStyles[variant],
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
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
            inverse ? "text-on-secondary hover:bg-white/10" : "text-foreground hover:bg-surface",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          inverse
            ? "border-t border-white/10 bg-[#101010]"
            : variant === "floating"
              ? "mx-3 mb-3 max-w-5xl overflow-hidden rounded-b-xl border border-border bg-surface"
              : "border-t border-border bg-background",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className={cn("flex flex-col py-4", variant !== "floating" && "px-5")}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-2 py-2.5 text-sm font-medium transition-colors duration-150",
                    inverse
                      ? "text-on-secondary/70 hover:bg-white/10 hover:text-on-secondary"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
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