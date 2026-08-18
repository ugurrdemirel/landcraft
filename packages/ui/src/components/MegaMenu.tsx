import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { getContrastText } from "../utils/contrast";
import { ChevronDown, Menu, X } from "../icons";

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

export interface MegaMenuProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  variant?: "classic" | "floating" | "inverse";
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
  sticky?: boolean;
}

const triggerStyles = {
  classic: "text-muted-foreground hover:text-foreground hover:bg-surface",
  floating: "text-muted-foreground hover:text-foreground hover:bg-surface",
  inverse: "text-on-secondary/60 hover:text-on-secondary hover:bg-white/10",
};

export const MegaMenu = ({
  className,
  variant = "classic",
  brand,
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  brandHref = "#",
  items,
  actions,
  cta,
  sticky = true,
  onKeyDown,
  ...props
}: MegaMenuProps) => {
  const ids = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const inverse = variant === "inverse";

  const closePanels = () => setOpenIndex(null);
  const closeAll = () => {
    setOpenIndex(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const panelBackground = inverse
    ? "border-white/10 bg-[#161616]"
    : "border-border bg-surface shadow-raised";

  const panelId = (i: number) => `${ids}-panel-${i}`;

  const shell = cn(
    "relative w-full transition-colors duration-200",
    sticky && "sticky top-0 z-50",
    variant === "classic" &&
      "border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
    variant === "inverse" && "border-b border-white/10 bg-[#101010]/85 backdrop-blur-md",
  );

  const bar = cn(
    "relative flex h-16 w-full items-center justify-between gap-4 transition-colors duration-200",
    variant === "floating" &&
      "mx-auto mt-3 max-w-5xl rounded-xl border border-border bg-surface/90 px-5 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-surface/70",
    variant !== "floating" && "mx-auto max-w-6xl px-5 sm:px-8",
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

  const triggerClasses = cn(
    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
    triggerStyles[variant],
  );

  const renderColumns = (item: MegaMenuItem) => (
    <div
      className={cn(
        "grid gap-x-10 gap-y-8 sm:grid-cols-2",
        item.featured ? "" : "lg:grid-cols-3",
      )}
    >
      {item.columns?.map((column, ci) => (
        <div key={column.title ?? ci}>
          {column.title ? (
            <h4
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.14em]",
                inverse ? "text-on-secondary/45" : "text-muted-foreground/70",
              )}
            >
              {column.title}
            </h4>
          ) : null}
          <ul className={cn(column.title && "mt-3", "space-y-0.5")}>
            {column.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeAll}
                  className={cn(
                    "-mx-2 block rounded-md px-2 py-2 transition-colors duration-150",
                    inverse
                      ? "hover:bg-white/10"
                      : "hover:bg-surface-strong",
                  )}
                >
                  <span className="block text-sm font-medium text-foreground">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span
                      className={cn(
                        "mt-0.5 block text-[13px] leading-snug",
                        inverse ? "text-on-secondary/50" : "text-muted-foreground",
                      )}
                    >
                      {link.description}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderFeatured = (item: MegaMenuItem, mobile = false) => {
    const featured = item.featured;
    if (!featured) return null;
    const featuredStyle = featured.accent
      ? { backgroundColor: featured.accent, color: getContrastText(featured.accent) }
      : undefined;

    return (
      <a
        href={featured.href}
        onClick={closeAll}
        className={cn(
          "group relative block overflow-hidden rounded-lg p-6 transition-transform duration-150 hover:-translate-y-0.5",
          mobile && "mt-8",
          !featured.accent && "bg-primary text-on-primary",
        )}
        style={featuredStyle}
      >
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <h4 className="font-display text-base font-semibold tracking-tight">
              {featured.title}
            </h4>
            {featured.description ? (
              <p className="mt-1.5 text-[13px] leading-relaxed opacity-80">
                {featured.description}
              </p>
            ) : null}
          </div>
          {featured.cta ? (
            <span className="text-sm font-semibold underline decoration-1 underline-offset-4">
              {featured.cta} →
            </span>
          ) : null}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl bg-black/40"
        />
      </a>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      closeAll();
    }
    onKeyDown?.(event);
  };

  return (
    <header
      className={cn(shell, variant === "floating" && "px-3 sm:px-6", className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <nav className={bar} onMouseLeave={closePanels} aria-label="Mega menu">
        <a href={brandHref} className="shrink-0">
          {brandNode}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item, i) => {
            const hasPanel = Boolean(item.columns?.length || item.featured);
            const open = openIndex === i;
            return (
              <li key={item.label} className="relative">
                {hasPanel ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    aria-controls={panelId(i)}
                    onClick={() => setOpenIndex(open ? null : i)}
                    onMouseEnter={() => setOpenIndex(i)}
                    className={cn(
                      triggerClasses,
                      open &&
                        (inverse
                          ? "bg-white/10 text-on-secondary"
                          : "bg-surface text-foreground"),
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      {item.badge ? (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
                            inverse
                              ? "bg-white/15 text-on-secondary"
                              : "bg-primary-soft text-primary",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-150",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <a href={item.href ?? "#"} className={triggerClasses}>
                    {item.label}
                    {item.badge ? (
                      <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
                        {item.badge}
                      </span>
                    ) : null}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {actions}
          {cta}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className={cn(
            "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md lg:hidden",
            "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            inverse ? "text-on-secondary hover:bg-white/10" : "text-foreground hover:bg-surface",
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Desktop mega panels */}
      {items.map((item, i) => {
        if (!item.columns?.length && !item.featured) return null;
        const open = openIndex === i;
        return (
          <div
            key={item.label}
            id={panelId(i)}
            role="region"
            aria-label={`${item.label} menu`}
            onMouseEnter={() => setOpenIndex(i)}
            className={cn(
              "absolute inset-x-0 top-full z-50 pt-2 transition-all duration-150",
              open
                ? "visible translate-y-0 opacity-100"
                : "pointer-events-none invisible -translate-y-1 opacity-0",
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-xl border p-6 md:p-8",
                panelBackground,
                item.featured ? "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12" : "",
              )}
            >
              {renderColumns(item)}
              {item.featured && (
                <div className={cn("mt-8 max-w-sm lg:mt-0 lg:w-64")}>
                  {renderFeatured(item)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Mobile accordion panel */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 lg:hidden",
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          inverse
            ? "border-t border-white/10 bg-[#101010]"
            : variant === "floating"
              ? "mx-3 mb-3 max-w-5xl overflow-hidden rounded-b-xl border border-border bg-surface"
              : "border-t border-border bg-background",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col py-4">
            {items.map((item, i) =>
              item.columns?.length || item.featured ? (
                <li key={item.label} className="px-5">
                  <button
                    type="button"
                    aria-expanded={mobileExpanded === i}
                    onClick={() =>
                      setMobileExpanded((prev) => (prev === i ? null : i))
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2 py-2.5 text-sm font-medium transition-colors duration-150",
                      inverse
                        ? "text-on-secondary hover:bg-white/10"
                        : "text-foreground hover:bg-surface",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.badge ? (
                        <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-150",
                        mobileExpanded === i && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200",
                      mobileExpanded === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="py-2 pl-1">
                        {renderColumns(item)}
                        {item.featured ? (
                          <div className="max-w-sm">{renderFeatured(item, true)}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="px-5">
                  <a
                    href={item.href ?? "#"}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-2 py-2.5 text-sm font-medium transition-colors duration-150",
                      inverse
                        ? "text-on-secondary/70 hover:bg-white/10 hover:text-on-secondary"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
            {cta ? (
              <li className="px-8 pb-2 pt-3">{cta}</li>
            ) : actions ? (
              <li className="mt-3 flex flex-wrap gap-3 px-8 pb-2">{actions}</li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  );
};
MegaMenu.displayName = "MegaMenu";