import { useEffect, useId, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { iso2ToFlagEmoji } from "../utils/iso2Flag";
import { Modal } from "./Modal";
import { Check, ChevronDown, Globe } from "../icons";

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

export const LanguageSwitcher = ({
  className,
  languages,
  option = "dropdown",
  value,
  defaultValue,
  onChange,
  align = "end",
  modalTitle,
  showFlag = false,
  inverse = false,
  ...props
}: LanguageSwitcherProps) => {
  const listboxId = useId();
  const anchorName = `--ls-${listboxId.replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? languages[0]?.code ?? "");
  const current = value ?? internal;
  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  const select = (code: string) => {
    setInternal(code);
    setOpen(false);
    onChange?.(code);
  };

  const renderFlagOrGlobe = (
    code: string,
    { size = "text-sm", globeClass = "text-muted-foreground" }: { size?: string; globeClass?: string } = {},
  ) => {
    const flag = iso2ToFlagEmoji(code);
    return flag ? (
      <span aria-hidden className={cn(size, "leading-none")}>
        {flag}
      </span>
    ) : (
      <Globe className={cn("h-4 w-4 shrink-0", globeClass)} />
    );
  };

  useEffect(() => {
    if (!open || option !== "dropdown") return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, option]);

  if (languages.length === 0) return null;

  const trigger = (
    <button
      type="button"
      aria-haspopup={option === "dropdown" ? "listbox" : "dialog"}
      aria-expanded={open}
      aria-controls={option === "dropdown" ? listboxId : undefined}
      onClick={() => setOpen((o) => !o)}
      style={{ anchorName } as CSSProperties}
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

  if (option === "modal") {
    return (
      <>
        <div ref={rootRef} className={cn("relative inline-flex", className)} {...props}>
          {trigger}
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title={modalTitle} size="sm">
          <div role="listbox" aria-label="Select language" className="grid min-w-[19rem] gap-1.5">
            {languages.map((lang) => {
              const active = lang.code === current;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(lang.code)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-primary/40 bg-primary-soft text-foreground"
                      : "border-border text-foreground hover:bg-surface-strong",
                  )}
                >
                  <span className="flex items-center gap-3">
                    {showFlag ? renderFlagOrGlobe(lang.code, { size: "text-base" }) : null}
                    <span className="text-sm font-medium">{lang.label}</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {lang.code}
                    {active ? <Check className="h-4 w-4 text-primary" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)} {...props}>
      {trigger}

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
        {languages.map((lang) => {
          const active = lang.code === current;
          return (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => select(lang.code)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-surface-strong text-foreground"
                  : "text-muted-foreground hover:bg-surface-strong hover:text-foreground",
              )}
            >
              <span className="flex items-center gap-2.5">
                {showFlag ? renderFlagOrGlobe(lang.code) : null}
                {lang.label}
              </span>
              {active ? <Check className="h-3.5 w-3.5 text-primary" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
LanguageSwitcher.displayName = "LanguageSwitcher";