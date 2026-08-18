import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface LogoItem {
  name: string;
  src?: string;
  href?: string;
}

export interface LogoCloudProps extends HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  title?: string;
  /** Visual option: quiet list · infinite marquee · hairline strip */
  option?: "quiet" | "marquee" | "strip";
}

const LogoText = ({ name }: { name: string }) => (
  <span className="text-lg font-semibold tracking-tight text-foreground/45 transition-colors duration-200 group-hover:text-foreground">
    {name}
  </span>
);

const LogoMark = ({ logo }: { logo: LogoItem }) =>
  logo.src ? (
    <img
      src={logo.src}
      alt={logo.name}
      loading="lazy"
      className={cn(
        "max-h-7 w-auto opacity-50 grayscale transition-all duration-200 group-hover:opacity-90 group-hover:grayscale-0",
        "h-7",
      )}
    />
  ) : (
    <LogoText name={logo.name} />
  );

export const LogoCloud = forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ className, logos, title, option = "quiet", ...props }, ref) => {
    if (option === "marquee") {
      const doubled = [...logos, ...logos];
      return (
        <div ref={ref} className={cn("w-full overflow-hidden", className)} {...props}>
          {title ? (
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </p>
          ) : null}
          <div className="mask-fade-x">
            <div className="flex w-max animate-marquee gap-14 pr-14 motion-reduce:animate-none">
              {doubled.map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="group shrink-0">
                  <LogoMark logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (option === "strip") {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {title ? (
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </p>
          ) : null}
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-border bg-surface px-6 py-7 sm:gap-x-14">
            {logos.map((logo) => (
              <li key={logo.name} className="group">
                <LogoMark logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // quiet — unbounded spread of wordmarks.
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {title ? (
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {title}
          </p>
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <li key={logo.name} className="group">
              <LogoMark logo={logo} />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
LogoCloud.displayName = "LogoCloud";