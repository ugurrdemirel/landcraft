import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "../../utils/cn";
import { Send } from "../../icons";
import type { AgentScriptStep } from "./types";
import { ToolCard } from "./ToolCard";

export function DemoWindow({
  title,
  subtitle,
  logo,
  logoSrc,
  logoAlt,
  logoClassName,
  footer,
  logLabel,
  logRef,
  height = "70dvh",
  children,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  logo?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  footer?: ReactNode;
  logLabel: string;
  logRef?: Ref<HTMLDivElement>;
  height?: string;
  children: ReactNode;
}) {
  const logoNode =
    logo ??
    (logoSrc ? (
      <img
        src={logoSrc}
        alt={logoAlt ?? (typeof title === "string" ? title : "Logo")}
        className={cn("h-8 w-8 rounded-lg object-cover", logoClassName)}
      />
    ) : undefined);
  return (
    <div
      style={{ height }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-overlay"
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        {logoNode ? <span className="flex shrink-0 items-center">{logoNode}</span> : null}
        {title ?? subtitle ? (
          <div className="min-w-0">
            {title ? (
              <p className="truncate text-sm font-semibold tracking-tight">{title}</p>
            ) : null}
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        role="log"
        ref={logRef}
        aria-live="polite"
        aria-label={logLabel}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5"
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>

      {footer}
    </div>
  );
}

export function DemoFooter({
  controls,
  progress,
  composing,
}: {
  controls?: ReactNode;
  progress?: ReactNode;
  composing?: string;
}) {
  const hasMeta = controls ?? progress;
  return (
    <div className="shrink-0 border-t border-border px-4 py-3 sm:px-5">
      {hasMeta ? (
        <div className="mb-3 flex items-center gap-2">
          {controls}
          {progress}
        </div>
      ) : null}
      <div
        aria-hidden
        className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-surface-strong/40 px-3.5 py-2.5 text-sm text-muted-foreground select-none"
      >
        {composing !== undefined ? (
          <span className="flex-1 truncate text-foreground">
            {composing}
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-foreground" />
          </span>
        ) : (
          <span className="flex-1 truncate">Ask anything…</span>
        )}
        <Send
          className={cn("h-4 w-4 shrink-0", composing ? "text-foreground" : undefined)}
        />
      </div>
    </div>
  );
}

export function UserMessage({ text, partial = false }: { text: string; partial?: boolean }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-6 text-on-primary">
        {text}
        {partial ? (
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-on-primary" />
        ) : null}
      </p>
    </div>
  );
}

export function AssistantMessage({ text, partial = false }: { text: string; partial?: boolean }) {
  return (
    <div className="flex justify-start">
      <p className="max-w-[90%] rounded-2xl rounded-bl-md bg-primary-soft px-3.5 py-2.5 text-sm leading-6 text-foreground">
        {text}
        {partial ? (
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-foreground" />
        ) : null}
      </p>
    </div>
  );
}

export function ThinkingRow({ label, active = true }: { label: string; active?: boolean }) {
  const dots = ["[animation-delay:-0.3s]", "[animation-delay:-0.15s]", ""];
  return (
    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
      <span className="flex gap-1" aria-hidden>
        {dots.map((delay, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-current",
              active && "animate-bounce",
              active && delay,
            )}
          />
        ))}
      </span>
      <span className={active ? "animate-pulse" : undefined}>{label}</span>
    </div>
  );
}

export function EmptyState() {
  return (
    <p className="py-10 text-center text-sm text-muted-foreground">
      This demo has no steps yet.
    </p>
  );
}

export function StepProgress({ current, total, done }: { current: number; total: number; done: boolean }) {
  return (
    <span className="text-xs tabular-nums text-muted-foreground">
      {done ? "Demo complete" : `Step ${Math.min(current, total)} of ${total}`}
    </span>
  );
}

/** Render one script step in its finished state (used by the transcript and completed player steps). */
export function FinishedStep({ step }: { step: AgentScriptStep }) {
  if (step.type === "user") return <UserMessage text={step.text} />;
  if (step.type === "assistant") return <AssistantMessage text={step.text} />;
  if (step.type === "thinking") return <ThinkingRow label={step.label ?? "Thinking…"} active={false} />;
  return (
    <ToolCard
      name={step.name}
      args={step.args}
      result={step.result}
      status={step.status === "error" ? "error" : "success"}
    />
  );
}

export function ControlButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold text-foreground transition-colors duration-150 hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
