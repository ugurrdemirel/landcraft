import type { NewsletterProps } from "./types";
import { NewsletterInline } from "./variants/Inline";
import { NewsletterCard } from "./variants/Card";
import { NewsletterUnderline } from "./variants/Underline";

export const Newsletter = (props: NewsletterProps) => {
  const { option = "inline", ...rest } = props;
  if (option === "card") return <NewsletterCard {...rest} />;
  if (option === "underline") return <NewsletterUnderline {...rest} />;
  return <NewsletterInline {...rest} />;
};
Newsletter.displayName = "Newsletter";