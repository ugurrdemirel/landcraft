import { cn } from "../../../utils/cn";
import { FaqEyebrow } from "../parts";
import { FaqAccordion } from "./Accordion";
import type { FAQProps } from "../types";

interface SplitProps extends FAQProps {
  allowMultiple?: boolean;
  defaultOpen?: number[];
}

export const FaqSplit = ({
  className,
  items,
  allowMultiple = false,
  defaultOpen = [],
  eyebrow,
  title,
  description,
  option,
  ...props
}: SplitProps) => (
  <div className={cn("grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20", className)} {...props}>
    <div className="lg:sticky lg:top-24 lg:self-start">
      {eyebrow ? <FaqEyebrow label={String(eyebrow)} /> : null}
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
      <FaqAccordion
        items={items}
        allowMultiple={allowMultiple}
        defaultOpen={defaultOpen}
        bare
      />
    </div>
  </div>
);
FaqSplit.displayName = "FaqSplit";