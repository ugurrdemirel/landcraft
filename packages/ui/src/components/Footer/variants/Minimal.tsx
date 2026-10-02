import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { emphasisSurfaceStyle } from "../../../utils/surface";
import type { FooterProps } from "../types";
import { FooterWordmark, FooterLogoNode } from "../parts";

interface MinimalProps extends FooterProps {}

export function FooterMinimal({
  className,
  brand,
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  columns,
  languageSwitcher,
  bottom,
  background,
  LinkComponent,
  style,
  ...props
}: MinimalProps) {
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
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <span className={cn(emphatic ? "text-current" : "text-foreground")}>{brandNode}</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {columns.flatMap((c) => c.links).slice(0, 6).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-150",
                  emphatic ? "text-current/70 hover:text-current" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-3">
          {languageSwitcher ? <div>{languageSwitcher}</div> : null}
          <div className={cn("text-sm", emphatic ? "text-current/60" : "text-muted-foreground")}>{bottom}</div>
        </div>
      </Container>
    </footer>
  );
}
FooterMinimal.displayName = "FooterMinimal";
