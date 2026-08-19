import type { HTMLAttributes, ReactNode } from "react";

export interface LanguageOption {
  /** Language code (ISO 3166-1 alpha-2, e.g. `"tr"`) — this is the value passed to `onChange` and the flag source. */
  code: string;
  /** Native display name, e.g. `"Türkçe"`. */
  label: string;
}

export type LanguageSwitcherOption = "dropdown" | "modal";

export interface LanguageSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** `dropdown` opens the anchored menu; `modal` opens a full dialog via the Modal component. */
  option?: LanguageSwitcherOption;
  /** Languages to switch between. Required — no built-in default language list. */
  languages: LanguageOption[];
  /** Controlled current language code. */
  value?: string;
  /** Uncontrolled initial language code. Defaults to the first language. */
  defaultValue?: string;
  /** Called with the selected language code. */
  onChange?: (code: string) => void;
  /** Dropdown menu alignment relative to its trigger. Defaults to `end`. */
  align?: "start" | "end";
  /** Heading rendered inside the `modal` option. Optional — pass it to show a title. */
  modalTitle?: ReactNode;
  /** Replace the globe icon with the selected language's flag emoji (and show flags in options). */
  showFlag?: boolean;
  /** Adapts colors for dark surfaces (inverse Navbar, classic Footer). */
  inverse?: boolean;
}

export interface LanguageSwitcherVariantProps
  extends Omit<LanguageSwitcherProps, "option"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  current: string;
  currentLang: LanguageOption;
  setCurrent: (code: string) => void;
}