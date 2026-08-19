import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { LogoMark, LogoCloudTitle } from "../parts";
import type { LogoItem } from "../types";

interface StripProps extends HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  title?: string;
}

export const LogoCloudStrip = forwardRef<HTMLDivElement, StripProps>(
  ({ className, logos, title, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <LogoCloudTitle title={title} />
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-border bg-surface px-6 py-7 sm:gap-x-14">
        {logos.map((logo) => (
          <li key={logo.name} className="group">
            <LogoMark logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  ),
);
LogoCloudStrip.displayName = "LogoCloudStrip";