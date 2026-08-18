import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Plus } from "../icons";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FAQProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  items: FaqItem[];
  option?: "accordion" | "split" | "cards";
  allowMultiple?: boolean;
  defaultOpen?: number[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export const FAQ = ({
  className,
  items,
  option = "accordion",
  allowMultiple = false,
  defaultOpen = [],
  eyebrow,
  title,
  description,
  ...props
}: FAQProps) => {
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

  const headerRow = (label: string) => (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{label}</p>
  );

  /** cards — always-open pairs in a quiet hairline grid. */
  if (option === "cards") {
    return (
      <div className={cn("w-full", className)} {...props}>
        {eyebrow ? <div className="mb-10">{headerRow(String(eyebrow))}</div> : null}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={item.question}
              className="flex flex-col rounded-xl border border-border bg-surface p-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold tabular-nums text-foreground/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {item.question}
                </h3>
              </div>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /** accordion — single-column, hairline divided. */
  const accordion = (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item, index) => {
        const open = openSet.has(index);
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-foreground transition-colors duration-150 hover:bg-surface-strong/60 focus-visible:outline-none"
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
              <p className="px-6 pb-6 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  if (option === "split") {
    return (
      <div className={cn("grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20", className)} {...props}>
        <div className="lg:sticky lg:top-24 lg:self-start">
          {eyebrow ? headerRow(String(eyebrow)) : null}
          {title ? (
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="divide-y divide-border">
          {items.map((item, index) => {
            const open = openSet.has(index);
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => toggle(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground transition-colors duration-150 focus-visible:outline-none"
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
                {open ? <p className="pb-6 text-sm leading-7 text-muted-foreground">{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)} {...props}>
      {accordion}
    </div>
  );
};
FAQ.displayName = "FAQ";