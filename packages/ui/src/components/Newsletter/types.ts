import type { HTMLAttributes } from "react";

export type NewsletterOption = "inline" | "card" | "underline";

export interface NewsletterProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  option?: NewsletterOption;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  note?: string;
  onSubmit?: (email: string) => void;
}