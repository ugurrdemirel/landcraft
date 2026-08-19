import { forwardRef } from "react";
import type { HeroProps } from "./types";
import { HeroSplit } from "./variants/Split";
import { HeroCentered } from "./variants/Centered";
import { HeroStatement } from "./variants/Statement";

export const Hero = forwardRef<HTMLElement, HeroProps>(({ variant = "split", ...props }, ref) => {
  if (variant === "centered") return <HeroCentered ref={ref} {...props} />;
  if (variant === "statement") return <HeroStatement ref={ref} {...props} />;
  return <HeroSplit ref={ref} {...props} />;
});
Hero.displayName = "Hero";