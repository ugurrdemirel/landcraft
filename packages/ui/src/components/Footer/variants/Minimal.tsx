import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import type { FooterProps } from "../types";
import { FooterWordmark, FooterLogoNode } from "../parts";

interface MinimalProps extends FooterProps {}

export function FooterMinimal({ className, brand, logo, logoSrc, logoAlt, logoClassName, columns, languageSwitcher, bottom, LinkComponent, ...props }: MinimalProps) {
  const Link = LinkComponent ?? "a";
  const brandNode = FooterLogoNode({ logo, logoSrc, logoAlt, logoClassName, brand }) ?? <FooterWordmark brand={brand} />;

  return (
    <footer className={cn("w-full border-t border-border bg-background", className)} {...props}>
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        {brandNode}
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
FooterMinimal.displayName = "FooterMinimal";