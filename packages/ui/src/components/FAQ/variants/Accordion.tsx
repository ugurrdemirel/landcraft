"use client";
import { cn } from "../../../utils/cn";
import { useFaqState, FaqItemRow } from "../parts";
import type { FAQProps } from "../types";

interface AccordionProps extends FAQProps {
  allowMultiple?: boolean;
  defaultOpen?: number[];
  bare?: boolean;
}

export const FaqAccordion = ({
  className,
  items,
  allowMultiple = false,
  defaultOpen = [],
  bare = false,
  option,
  title,
  eyebrow,
  description,
  ...props
}: AccordionProps) => {
  const { isOpen, toggle } = useFaqState(allowMultiple, defaultOpen);

  return (
    <div
      className={cn(
        !bare && "divide-y divide-border rounded-2xl border border-border bg-surface",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <FaqItemRow
          key={item.question}
          item={item}
          open={isOpen(index)}
          onToggle={() => toggle(index)}
          style={bare ? "bare" : "boxed"}
        />
      ))}
    </div>
  );
};
FaqAccordion.displayName = "FaqAccordion";