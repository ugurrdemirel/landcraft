import { forwardRef } from "react";
import type { CTAProps } from "./types";
import { CTAPanel } from "./variants/Panel";
import { CTASurface } from "./variants/Surface";
import { CTAInverse } from "./variants/Inverse";

export const CTA = forwardRef<HTMLElement, CTAProps>(({ option = "panel", ...props }, ref) => {
  if (option === "surface") return <CTASurface ref={ref} {...props} />;
  if (option === "inverse") return <CTAInverse ref={ref} {...props} />;
  return <CTAPanel ref={ref} {...props} />;
});
CTA.displayName = "CTA";