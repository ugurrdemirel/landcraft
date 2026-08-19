import { forwardRef } from "react";
import type { LogoCloudProps } from "./types";
import { LogoCloudQuiet } from "./variants/Quiet";
import { LogoCloudMarquee } from "./variants/Marquee";
import { LogoCloudStrip } from "./variants/Strip";

export const LogoCloud = forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ option = "quiet", ...props }, ref) => {
    if (option === "marquee") return <LogoCloudMarquee ref={ref} {...props} />;
    if (option === "strip") return <LogoCloudStrip ref={ref} {...props} />;
    return <LogoCloudQuiet ref={ref} {...props} />;
  },
);
LogoCloud.displayName = "LogoCloud";