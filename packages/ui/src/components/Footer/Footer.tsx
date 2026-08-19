import type { FooterProps } from "./types";
import { FooterClassic } from "./variants/Classic";
import { FooterMinimal } from "./variants/Minimal";
import { FooterEditorial } from "./variants/Editorial";

export const Footer = ({ option = "classic", ...props }: FooterProps) => {
  if (option === "minimal") return <FooterMinimal {...props} />;
  if (option === "editorial") return <FooterEditorial {...props} />;
  return <FooterClassic {...props} />;
};
Footer.displayName = "Footer";