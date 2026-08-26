"use client";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "../../icons";
import type { AccordionShowcaseProps } from "./types";

export const AccordionShowcase = ({
  className,
  items,
  defaultActive = 0,
  ...props
}: AccordionShowcaseProps) => {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={cn("grid w-full gap-x-16 gap-y-12 lg:grid-cols-2 lg:items-center lg:gap-y-0", className)} {...props}>
      {/* Interactive list */}
      <div className="divide-y divide-border">
        {items.map((item, index) => {
          const open = index === active;
          return (
            <div key={item.title}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(index)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="font-display text-[1.375rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.625rem]">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-foreground/40 transition-transform duration-300 sm:h-6 sm:w-6",
                      open && "rotate-180 text-foreground",
                    )}
                  />
                </button>
              </h3>
              {open && item.description ? (
                <div className="pb-8 pr-10">
                  <p className="max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                    {item.description}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Swapping visual */}
      <div className="relative">
        {items.map((item, index) => (
          <div key={item.title} className={cn(index === active ? "block" : "hidden")}>
            {item.visual}
          </div>
        ))}
      </div>
    </div>
  );
};
AccordionShowcase.displayName = "AccordionShowcase";
