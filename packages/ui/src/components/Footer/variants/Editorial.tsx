import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { emphasisSurfaceStyle } from "../../../utils/surface";
import type { FooterProps } from "../types";
import {
  FooterColumnsBlock,
  FooterEditorialWordmark,
  FooterLogoNode,
  FooterBottomBar,
} from "../parts";

interface EditorialProps extends FooterProps {}

export function FooterEditorial({
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
  background,
  LinkComponent,
  style,
  ...props
}: EditorialProps) {
  const Link = LinkComponent ?? "a";
  const brandNode = FooterLogoNode({ logo, logoSrc, logoAlt, logoClassName, brand, imageClassName: "h-12 w-auto" }) ?? <FooterEditorialWordmark brand={brand} />;
  const emphatic = Boolean(background);

  return (
    <footer
      data-emphasis={emphatic ? "" : undefined}
      style={emphatic ? { ...emphasisSurfaceStyle(background), ...style } : style}
      className={cn("w-full border-t border-border bg-background", emphatic && "border-current/15", className)}
      {...props}
    >
      <Container className="py-16 sm:py-20">
        <div className="mb-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className={cn(emphatic ? "text-current" : "text-foreground")}>{brandNode}</span>
            {description ? (
              <p className={cn("mt-3 max-w-sm text-sm leading-6", emphatic ? "text-current/60" : "text-muted-foreground")}>
                {description}
              </p>
            ) : null}
          </div>
          {socials ? <div className="flex items-center gap-3">{socials}</div> : null}
        </div>
        <div className={cn("border-t pt-12", emphatic ? "border-current/15" : "border-border")}>
          <FooterColumnsBlock
            columns={columns}
            Link={Link}
            columnTitleClassName={emphatic ? "text-current/50" : "text-muted-foreground"}
            linkClassName={cn(
              "text-[15px] transition-colors duration-150",
              emphatic ? "text-current/80 hover:text-current" : "text-foreground/80 hover:text-foreground",
            )}
          />
        </div>
        <FooterBottomBar
          bottom={bottom}
          languageSwitcher={languageSwitcher}
          brand={brand}
          wrapperClassName={cn(
            "mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm sm:flex-row",
            emphatic ? "border-current/15 text-current/60" : "border-border text-muted-foreground",
          )}
          textClassName=""
        />
      </Container>
    </footer>
  );
}
FooterEditorial.displayName = "FooterEditorial";
