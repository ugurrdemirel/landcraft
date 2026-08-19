import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import type { FooterProps } from "../types";
import {
  FooterColumnsBlock,
  FooterEditorialWordmark,
  FooterLogoNode,
  FooterBottomBar,
} from "../parts";

interface EditorialProps extends FooterProps {}

export function FooterEditorial({ className, brand, logo, logoSrc, logoAlt, logoClassName, description, columns, socials, bottom, languageSwitcher, LinkComponent, ...props }: EditorialProps) {
  const Link = LinkComponent ?? "a";
  const brandNode = FooterLogoNode({ logo, logoSrc, logoAlt, logoClassName, brand, imageClassName: "h-12 w-auto" }) ?? <FooterEditorialWordmark brand={brand} />;

  return (
    <footer className={cn("w-full border-t border-border bg-background", className)} {...props}>
      <Container className="py-16 sm:py-20">
        <div className="mb-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            {brandNode}
            {description ? (
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {socials ? <div className="flex items-center gap-3">{socials}</div> : null}
        </div>
        <div className="border-t border-border pt-12">
          <FooterColumnsBlock
            columns={columns}
            Link={Link}
            linkClassName="text-[15px] text-foreground/80 transition-colors duration-150 hover:text-foreground"
          />
        </div>
        <FooterBottomBar
          bottom={bottom}
          languageSwitcher={languageSwitcher}
          brand={brand}
          wrapperClassName="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row"
          textClassName=""
        />
      </Container>
    </footer>
  );
}
FooterEditorial.displayName = "FooterEditorial";