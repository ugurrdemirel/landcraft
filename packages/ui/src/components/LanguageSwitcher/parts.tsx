"use client";
import { useEffect } from "react";
import { cn } from "../../utils/cn";
import { iso2ToFlagEmoji } from "../../utils/iso2Flag";
import { Check, ChevronDown, Globe } from "../../icons";
import type { LanguageOption } from "./types";

export function useOutsideClose(
  open: boolean,
  rootRef: { current: HTMLDivElement | null },
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, rootRef, onClose]);
}

export function renderFlagOrGlobe(
  code: string,
  { size = "text-sm", globeClass = "text-muted-foreground" }: { size?: string; globeClass?: string } = {},
) {
  const flag = iso2ToFlagEmoji(code);
  return flag ? (
    <span aria-hidden className={cn(size, "leading-none")}>
      {flag}
    </span>
  ) : (
    <Globe className={cn("h-4 w-4 shrink-0", globeClass)} />
  );
}

export function LanguageTrigger({
  inverse,
  open,
  showFlag,
  currentLang,
  onClick,
  ariaProps,
}: {
  inverse?: boolean;
  open: boolean;
  showFlag?: boolean;
  currentLang: LanguageOption;
  onClick: () => void;
  ariaProps: {
    haspopup: "listbox" | "dialog";
    expanded: boolean;
    controls?: string;
  };
}) {
  return (
    <button
      type="button"
      aria-haspopup={ariaProps.haspopup}
      aria-expanded={ariaProps.expanded}
      aria-controls={ariaProps.controls}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        inverse
          ? "border-white/10 text-on-secondary hover:bg-white/10"
          : "border-border text-foreground hover:bg-surface",
      )}
    >
      {showFlag ? (
        renderFlagOrGlobe(currentLang.code, { globeClass: inverse ? "opacity-70" : "text-muted-foreground" })
      ) : (
        <Globe
          className={cn("h-4 w-4", inverse ? "opacity-70" : "text-muted-foreground")}
        />
      )}
      <span className="tracking-tight">{currentLang.label}</span>
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-150",
          open && "rotate-180",
          inverse ? "opacity-70" : "text-muted-foreground",
        )}
      />
    </button>
  );
}

export function LanguageOptionRow({
  lang,
  active,
  onSelect,
  variant,
  showFlag,
}: {
  lang: LanguageOption;
  active: boolean;
  onSelect: () => void;
  variant: "dropdown" | "modal";
  showFlag?: boolean;
}) {
  return (
    <button
      key={lang.code}
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={
        variant === "modal"
          ? cn(
              "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-primary/40 bg-primary-soft text-foreground"
                : "border-border text-foreground hover:bg-surface-strong",
            )
          : cn(
              "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-surface-strong text-foreground"
                : "text-muted-foreground hover:bg-surface-strong hover:text-foreground",
            )
      }
    >
      <span className={variant === "modal" ? "flex items-center gap-3" : "flex items-center gap-2.5"}>
        {showFlag ? renderFlagOrGlobe(lang.code, variant === "modal" ? { size: "text-base" } : {}) : null}
        <span className="text-sm font-medium">{lang.label}</span>
      </span>
      <span className={variant === "modal" ? "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground" : undefined}>
        {variant === "modal" ? lang.code : null}
        {active ? <Check className={variant === "modal" ? "h-4 w-4 text-primary" : "h-3.5 w-3.5 text-primary"} /> : null}
      </span>
    </button>
  );
}