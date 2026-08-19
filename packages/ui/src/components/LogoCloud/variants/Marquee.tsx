import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { LogoMark, LogoCloudTitle } from "../parts";
import type { LogoItem } from "../types";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  title?: string;
}

export const LogoCloudMarquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, logos, title, ...props }, ref) => {
    const doubled = [...logos, ...logos];
    return (
      <div ref={ref} className={cn("w-full overflow-hidden", className)} {...props}>
        <LogoCloudTitle title={title} />
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
  },
);
LogoCloudMarquee.displayName = "LogoCloudMarquee";