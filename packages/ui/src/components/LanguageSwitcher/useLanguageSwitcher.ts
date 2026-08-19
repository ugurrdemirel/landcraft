"use client";
import { useState } from "react";
import type { LanguageOption } from "./types";

export function useLanguageSwitcher(
  languages: LanguageOption[],
  value?: string,
  defaultValue?: string,
  onChange?: (code: string) => void,
) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? languages[0]?.code ?? "");
  const current = value ?? internal;
  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  const setCurrent = (code: string) => {
    setInternal(code);
    setOpen(false);
    onChange?.(code);
  };

  return { open, setOpen, current, currentLang, setCurrent };
}