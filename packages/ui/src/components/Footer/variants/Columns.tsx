import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { emphasisSurfaceStyle } from "../../../utils/surface";
import type { FooterProps } from "../types";
import {
  FooterWordmark,
  FooterLogoNode,
  FooterBottomBar,
} from "../parts";

interface ColumnsProps extends FooterProps {}

export function FooterColumns({
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
  badge,
  background,
  LinkComponent,
  style,
  ...props
}: ColumnsProps) {
  const Link = LinkComponent ?? "a";
  const brandNode = FooterLogoNode({ logo, logoSrc, logoAlt, logoClassName, brand }) ?? <FooterWordmark brand={brand} />;
  const emphatic = Boolean(background);

  return (
    <footer
      data-emphasis={emphatic ? "" : undefined}
      style={emphatic ? { ...emphasisSurfaceStyle(background), ...style } : style}
      className={cn("w-full border-t border-border bg-background", emphatic && "border-current/15", className)}
      {...props}
    >
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <span className={cn(emphatic ? "text-current" : "text-foreground")}>{brandNode}</span>
            {description ? (
              <p className={cn("mt-4 max-w-xs text-sm leading-6", emphatic ? "text-current/60" : "text-muted-foreground")}>
                {description}
              </p>
            ) : null}
            {socials ? <div className="mt-6 flex items-center gap-3">{socials}</div> : null}
            {badge ? <div className="mt-6">{badge}</div> : null}
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className={cn("text-xs font-semibold uppercase tracking-[0.16em]", emphatic ? "text-current/50" : "text-muted-foreground")}>
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors duration-150",
                        emphatic
                          ? "text-current/70 hover:text-current"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <FooterBottomBar
          bottom={bottom}
          languageSwitcher={languageSwitcher}
          brand={brand}
          wrapperClassName={cn(
            "mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm sm:flex-row",
            emphatic ? "border-current/15 text-current/50" : "border-border text-muted-foreground",
          )}
          textClassName=""
        />
      </Container>
    </footer>
  );
}
FooterColumns.displayName = "FooterColumns";
