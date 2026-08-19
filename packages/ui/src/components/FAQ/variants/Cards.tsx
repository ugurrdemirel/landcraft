import { cn } from "../../../utils/cn";
import { FaqEyebrow } from "../parts";
import type { FAQProps } from "../types";

interface CardsProps extends FAQProps {}

export const FaqCards = ({
  className,
  items,
  eyebrow,
  title,
  description,
  option,
  ...props
}: CardsProps) => (
  <div className={cn("w-full", className)} {...props}>
    {eyebrow ? <div className="mb-10"><FaqEyebrow label={String(eyebrow)} /></div> : null}
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
FaqCards.displayName = "FaqCards";