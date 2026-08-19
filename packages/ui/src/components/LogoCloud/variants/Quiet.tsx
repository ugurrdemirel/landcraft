import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import { LogoMark, LogoCloudTitle } from "../parts";
import type { LogoItem } from "../types";

interface QuietProps extends HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  title?: string;
}

/** quiet — unbounded spread of wordmarks. */
export const LogoCloudQuiet = forwardRef<HTMLDivElement, QuietProps>(
  ({ className, logos, title, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <LogoCloudTitle title={title} />
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((logo) => (
          <li key={logo.name} className="group">
            <LogoMark logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  ),
);
LogoCloudQuiet.displayName = "LogoCloudQuiet";