"use client";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { Plus } from "../../icons";
import type { FaqItem } from "./types";

export function useFaqState(allowMultiple: boolean, defaultOpen: number[]) {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(allowMultiple ? defaultOpen : defaultOpen.slice(0, 1)),
  );

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return { openSet, toggle, isOpen: (i: number) => openSet.has(i) };
}

export function FaqItemRow({
  item,
  open,
  onToggle,
  style,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  style: "boxed" | "bare";
}) {
  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className={
            style === "boxed"
              ? "flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-foreground transition-colors duration-150 hover:bg-surface-strong/60 focus-visible:outline-none"
              : "flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground transition-colors duration-150 focus-visible:outline-none"
          }
        >
          {item.question}
          <Plus
            className={cn(
              "h-4.5 w-4.5 shrink-0 text-foreground/45 transition-transform duration-200 sm:h-5 sm:w-5",
              open && "rotate-45 text-primary",
            )}
          />
        </button>
      </h3>
      {open ? (
        <p className={style === "boxed" ? "px-6 pb-6 text-sm leading-7 text-muted-foreground" : "pb-6 text-sm leading-7 text-muted-foreground"}>
          {item.answer}
        </p>
      ) : null}
    </div>
  );
}

export function FaqEyebrow({ label }: { label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{label}</p>
  );
}