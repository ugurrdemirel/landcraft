import type { FooterProps } from "./types";
import { FooterColumns } from "./variants/Columns";
import { FooterMinimal } from "./variants/Minimal";
import { FooterEditorial } from "./variants/Editorial";

export const Footer = ({ option = "columns", ...props }: FooterProps) => {
  if (option === "minimal") return <FooterMinimal {...props} />;
  if (option === "editorial") return <FooterEditorial {...props} />;
  return <FooterColumns {...props} />;
};
Footer.displayName = "Footer";
