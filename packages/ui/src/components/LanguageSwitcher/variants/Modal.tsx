"use client";
import { useRef } from "react";
import { cn } from "../../../utils/cn";
import { Modal } from "../../Modal";
import { LanguageTrigger, LanguageOptionRow } from "../parts";
import type { LanguageSwitcherVariantProps } from "../types";

export function LanguageSwitcherModal({
  className,
  languages,
  open,
  onOpenChange,
  current,
  currentLang,
  setCurrent,
  modalTitle,
  showFlag = false,
  inverse = false,
  align,
  value,
  defaultValue,
  onChange,
  ...props
}: LanguageSwitcherVariantProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={rootRef} className={cn("relative inline-flex", className)} {...props}>
        <LanguageTrigger
          inverse={inverse}
          open={open}
          showFlag={showFlag}
          currentLang={currentLang}
          onClick={() => onOpenChange(!open)}
          ariaProps={{ haspopup: "dialog", expanded: open }}
        />
      </div>
      <Modal open={open} onClose={() => onOpenChange(false)} title={modalTitle} size="sm">
        <div role="listbox" aria-label="Select language" className="grid min-w-[19rem] gap-1.5">
          {languages.map((lang) => (
            <LanguageOptionRow
              key={lang.code}
              lang={lang}
              active={lang.code === current}
              onSelect={() => setCurrent(lang.code)}
              variant="modal"
              showFlag={showFlag}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}
LanguageSwitcherModal.displayName = "LanguageSwitcherModal";