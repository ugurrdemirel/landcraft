import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import type { FooterProps } from "../types";
import {
  FooterWordmark,
  FooterLogoNode,
  FooterBottomBar,
} from "../parts";

interface ClassicProps extends FooterProps {}

export function FooterClassic({ className, brand, logo, logoSrc, logoAlt, logoClassName, description, columns, socials, bottom, languageSwitcher, badge, LinkComponent, ...props }: ClassicProps) {
  const Link = LinkComponent ?? "a";
  const brandNode = FooterLogoNode({ logo, logoSrc, logoAlt, logoClassName, brand }) ?? <FooterWordmark brand={brand} />;

  return (
    <footer className={cn("w-full bg-secondary text-on-secondary", className)} {...props}>
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <span style={{ color: "rgb(var(--color-on-secondary))" }}>{brandNode}</span>
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
        <FooterBottomBar
          bottom={bottom}
          languageSwitcher={languageSwitcher}
          brand={brand}
          wrapperClassName="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-on-secondary/50 sm:flex-row"
          textClassName=""
        />
      </Container>
    </footer>
  );
}
FooterClassic.displayName = "FooterClassic";