"use client";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { Check, ChevronDown, Cpu, Terminal, X } from "../../icons";

export type ToolStatus = "running" | "success" | "error";

const statusLabel: Record<ToolStatus, string> = {
  running: "Running",
  success: "Done",
  error: "Failed",
};

export function ToolCard({
  name,
  args,
  result,
  status = "success",
}: {
  name: string;
  args?: string;
  result?: string;
  status?: ToolStatus;
}) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(args ?? result);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface-strong/40",
        status === "error" && "border-red-500/40",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${name} details, ${statusLabel[status].toLowerCase()}`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span
          className={cn(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
            status === "error" ? "bg-red-500/15 text-red-500" : "bg-foreground/8 text-foreground",
          )}
        >
          {status === "running" ? (
            <span
              aria-hidden
              className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
            />
          ) : status === "error" ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
        </span>
        <Terminal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="truncate font-mono text-[13px] font-medium">{name}</span>
        <span
          className={cn(
            "ml-auto flex shrink-0 items-center gap-1.5 text-xs",
            status === "running"
              ? "text-muted-foreground"
              : status === "error"
                ? "text-red-500"
                : "text-emerald-600 dark:text-emerald-400",
          )}
        >
          {status === "running" ? (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden />
          ) : null}
          {statusLabel[status]}
        </span>
        {hasDetails ? (
          <ChevronDown
            aria-hidden
            className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        ) : null}
      </button>
      {open && hasDetails ? (
        <div className="space-y-2 border-t border-border px-3.5 py-3">
          {args ? (
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Cpu className="h-3 w-3" aria-hidden /> Arguments
              </p>
              <pre className="overflow-x-auto rounded-lg bg-background/60 p-2.5 font-mono text-xs leading-5">
                {args}
              </pre>
            </div>
          ) : null}
          {result ? (
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Result
              </p>
              <p className="rounded-lg bg-background/60 p-2.5 font-mono text-xs leading-5">{result}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
