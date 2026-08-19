import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function CTAActions({
  action,
  secondaryAction,
  align,
  actionClassName = "flex flex-wrap items-center gap-4",
}: {
  action?: ReactNode;
  secondaryAction?: ReactNode;
  align?: "left" | "center";
  actionClassName?: string;
}) {
  return (
    <div
      className={cn(
        actionClassName,
        align === "center" && "justify-center",
      )}
    >
      {action}
      {secondaryAction}
    </div>
  );
}