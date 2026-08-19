"use client";
import type { LanguageSwitcherProps } from "./types";
import { useLanguageSwitcher } from "./useLanguageSwitcher";
import { LanguageSwitcherDropdown } from "./variants/Dropdown";
import { LanguageSwitcherModal } from "./variants/Modal";

export const LanguageSwitcher = ({
  option = "dropdown",
  languages,
  value,
  defaultValue,
  onChange,
  ...props
}: LanguageSwitcherProps) => {
  const state = useLanguageSwitcher(languages, value, defaultValue, onChange);

  if (languages.length === 0) return null;

  const variantProps = {
    languages,
    value,
    defaultValue,
    onChange,
    ...props,
    open: state.open,
    onOpenChange: state.setOpen,
    current: state.current,
    currentLang: state.currentLang,
    setCurrent: state.setCurrent,
  };

  if (option === "modal") {
    return <LanguageSwitcherModal {...variantProps} />;
  }
  return <LanguageSwitcherDropdown {...variantProps} />;
};
LanguageSwitcher.displayName = "LanguageSwitcher";