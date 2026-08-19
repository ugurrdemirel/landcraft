"use client";
import { useId, useRef, type CSSProperties } from "react";
import { cn } from "../../../utils/cn";
import {
  useOutsideClose,
  LanguageTrigger,
  LanguageOptionRow,
} from "../parts";
import type { LanguageSwitcherVariantProps } from "../types";

export function LanguageSwitcherDropdown({
  className,
  languages,
  open,
  onOpenChange,
  current,
  currentLang,
  setCurrent,
  align = "end",
  showFlag = false,
  inverse = false,
  modalTitle,
  value,
  defaultValue,
  onChange,
  ...props
}: LanguageSwitcherVariantProps) {
  const listboxId = useId();
  const anchorName = `--ls-${listboxId.replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClose(open, rootRef, () => onOpenChange(false));

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <button
        type="button"
        style={{ anchorName } as CSSProperties}
        onClick={() => onOpenChange(!open)}
      >
        <LanguageTrigger
          inverse={inverse}
          open={open}
          showFlag={showFlag}
          currentLang={currentLang}
          onClick={() => onOpenChange(!open)}
          ariaProps={{ haspopup: "listbox", expanded: open, controls: listboxId }}
        />
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-label="Select language"
        style={
          {
            positionAnchor: anchorName,
            top: "anchor(bottom)",
            ...(align === "start" ? { left: "anchor(left)" } : { right: "anchor(right)" }),
          } as CSSProperties
        }
        className={cn(
          "absolute top-full z-50 mt-2 min-w-[10rem] rounded-lg border border-border bg-surface p-1 shadow-raised transition-all duration-150",
          align === "start" ? "left-0" : "right-0",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
      >
        {languages.map((lang) => (
          <LanguageOptionRow
            key={lang.code}
            lang={lang}
            active={lang.code === current}
            onSelect={() => setCurrent(lang.code)}
            variant="dropdown"
            showFlag={showFlag}
          />
        ))}
      </div>
    </div>
  );
}
LanguageSwitcherDropdown.displayName = "LanguageSwitcherDropdown";