import type { FAQProps } from "./types";
import { FaqCards } from "./variants/Cards";
import { FaqAccordion } from "./variants/Accordion";
import { FaqSplit } from "./variants/Split";

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
  if (option === "cards") {
    return <FaqCards className={className} items={items} eyebrow={eyebrow} {...props} />;
  }

  if (option === "split") {
    return (
      <FaqSplit
        className={className}
        items={items}
        allowMultiple={allowMultiple}
        defaultOpen={defaultOpen}
        eyebrow={eyebrow}
        title={title}
        description={description}
        {...props}
      />
    );
  }

  // accordion
  return (
    <div className="mx-auto w-full max-w-3xl">
      <FaqAccordion
        className={className}
        items={items}
        allowMultiple={allowMultiple}
        defaultOpen={defaultOpen}
      />
    </div>
  );
};
FAQ.displayName = "FAQ";