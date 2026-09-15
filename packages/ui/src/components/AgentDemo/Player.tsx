"use client";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "../../icons";
import type { AgentDemoProps } from "./types";
import { ToolCard } from "./ToolCard";
import {
  AssistantMessage,
  ControlButton,
  DemoFooter,
  DemoWindow,
  EmptyState,
  FinishedStep,
  StepProgress,
  ThinkingRow,
} from "./parts";

const TICK = 24;
const GAP = 350;
const THINKING_MS = 1000;
const TOOL_MS = 1100;
const LOOP_PAUSE = 2600;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
  }, []);
  return reduced;
}

export const AgentDemoPlayer = forwardRef<HTMLDivElement, AgentDemoProps>(function AgentDemoPlayer(
  {
    script,
    title,
    subtitle,
    logo,
    logoSrc,
    logoAlt,
    logoClassName,
    height,
    autoplay = true,
    paused = false,
    loop = false,
    speed = 1,
    showControls = true,
    showSteps = true,
    onDone,
    className,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const reduceMotion = usePrefersReducedMotion();
  const staticRender = !autoplay || reduceMotion;
  const rate = speed && speed > 0 ? speed : 1;

  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(autoplay && !paused);
  const [completed, setCompleted] = useState(0);
  const [partial, setPartial] = useState("");
  const [toolRunning, setToolRunning] = useState(false);

  const logRef = useRef<HTMLDivElement | null>(null);
  const partialRef = useRef("");
  const progressRef = useRef(0);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const total = script.length;
  const done = total > 0 && completed >= total;

  const setPartialBoth = (value: string) => {
    partialRef.current = value;
    setPartial(value);
  };

  const replay = () => {
    progressRef.current = 0;
    setPartialBoth("");
    setToolRunning(false);
    setCompleted(0);
    setPlaying(true);
    setRunId((id) => id + 1);
  };

  // Reset when the script changes.
  useEffect(() => {
    progressRef.current = 0;
    setPartialBoth("");
    setToolRunning(false);
    setCompleted(0);
    setPlaying(autoplay && !paused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script, autoplay, paused]);

  // Follow the `paused` prop (explicit Play/Pause clicks always win locally).
  useEffect(() => {
    if (paused) {
      setPlaying(false);
    } else if (autoplay) {
      setPlaying(true);
    }
  }, [paused, autoplay]);

  // Core playback loop: one effect per in-progress step.
  useEffect(() => {
    if (staticRender || !playing || completed >= total) return;
    const step = script[completed];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let interval: ReturnType<typeof setInterval> | undefined;
    // Resume typing where it paused instead of restarting the message.
    progressRef.current = partialRef.current.length;

    const finish = () => {
      timers.push(
        setTimeout(() => {
          setPartialBoth("");
          setToolRunning(false);
          progressRef.current = 0;
          setCompleted((c) => c + 1);
        }, GAP / rate),
      );
    };

    if (step.type === "user" || step.type === "assistant") {
      const full = step.text;
      const chunk = Math.max(1, Math.ceil(full.length / 36));
      interval = setInterval(() => {
        progressRef.current += chunk;
        const next = full.slice(0, progressRef.current);
        setPartialBoth(next);
        if (next.length >= full.length) {
          if (interval) clearInterval(interval);
          finish();
        }
      }, TICK / rate);
    } else if (step.type === "thinking") {
      timers.push(setTimeout(finish, THINKING_MS / rate));
    } else {
      setToolRunning(true);
      timers.push(
        setTimeout(() => {
          setToolRunning(false);
          finish();
        }, TOOL_MS / rate),
      );
    }

    return () => {
      if (interval) clearInterval(interval);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticRender, playing, completed, runId, script, rate, total]);

  // Completion: notify once per run, then loop if asked.
  useEffect(() => {
    if (staticRender || !done) return;
    onDoneRef.current?.();
    if (!loop) return;
    const timer = setTimeout(replay, LOOP_PAUSE);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticRender, done, loop, runId]);

  // Keep the newest step in view while playing.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [completed, partial, toolRunning]);

  if (total === 0) {
    return (
      <div ref={ref} className={className} {...props}>
        <DemoWindow
          title={title}
          subtitle={subtitle}
          logo={logo}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
          logoClassName={logoClassName}
          logLabel={ariaLabel ?? "Scripted agent demo"}
          height={height}
          logRef={logRef}
        >
          <EmptyState />
        </DemoWindow>
      </div>
    );
  }

  if (staticRender) {
    return (
      <div ref={ref} className={className} {...props}>
        <DemoWindow
          title={title}
          subtitle={subtitle}
          logo={logo}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
          logoClassName={logoClassName}
          logLabel={ariaLabel ?? "Scripted agent demo"}
          height={height}
          logRef={logRef}
          footer={<DemoFooter />}
        >
          {script.map((step, i) => (
            <FinishedStep key={i} step={step} />
          ))}
        </DemoWindow>
      </div>
    );
  }

  const current = script[Math.min(completed, total - 1)];
  // The user "types" in the input box; the bubble only mounts once sent.
  const composing = !done && current.type === "user" ? partial : undefined;

  return (
    <div ref={ref} className={className} {...props}>
      <DemoWindow
        title={title}
        subtitle={subtitle}
        logo={logo}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        logoClassName={logoClassName}
        logLabel={ariaLabel ?? "Scripted agent demo"}
        height={height}
        logRef={logRef}
        footer={
          <DemoFooter
            composing={composing}
            controls={
              showControls ? (
                <>
                  {playing && !done ? (
                    <ControlButton onClick={() => setPlaying(false)} aria-label="Pause demo">
                      <Pause className="h-3.5 w-3.5" aria-hidden />
                      Pause
                    </ControlButton>
                  ) : !done ? (
                    <ControlButton onClick={() => setPlaying(true)} aria-label="Play demo">
                      <Play className="h-3.5 w-3.5" aria-hidden />
                      Play
                    </ControlButton>
                  ) : null}
                  <ControlButton onClick={replay} aria-label="Replay demo">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Replay
                  </ControlButton>
                </>
              ) : undefined
            }
            progress={
              showSteps ? (
                <span className="ml-auto">
                  <StepProgress current={completed + 1} total={total} done={done} />
                </span>
              ) : undefined
            }
          />
        }
      >
        {script.slice(0, completed).map((step, i) => (
          <FinishedStep key={i} step={step} />
        ))}
        {!done && current.type === "assistant" ? (
          <AssistantMessage text={partial} partial />
        ) : null}
        {!done && current.type === "thinking" ? (
          <ThinkingRow label={current.label ?? "Thinking…"} />
        ) : null}
        {!done && current.type === "tool" ? (
          <ToolCard
            name={current.name}
            args={current.args}
            result={current.result}
            status={
              toolRunning ? "running" : current.status === "error" ? "error" : "success"
            }
          />
        ) : null}
      </DemoWindow>
    </div>
  );
});
AgentDemoPlayer.displayName = "AgentDemoPlayer";
