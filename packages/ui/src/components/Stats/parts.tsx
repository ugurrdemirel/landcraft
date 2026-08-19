import { cn } from "../../utils/cn";
import { ArrowUp, ArrowDown } from "../../icons";

export const valueBase =
  "font-display font-semibold tabular-nums tracking-[-0.02em] text-foreground";

export const suffixBase = "ml-1 font-sans text-sm font-normal tracking-normal text-muted-foreground";

export const gridCols: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function DeltaBadge({ delta }: { delta: number }) {
  const isUp = delta >= 0;
  const Icon = isUp ? ArrowUp : ArrowDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
        isUp ? "bg-accent/10 text-accent" : "bg-danger-soft text-danger",
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}%
    </span>
  );
}