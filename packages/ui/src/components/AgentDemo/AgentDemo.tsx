import { forwardRef } from "react";
import type { AgentDemoProps } from "./types";
import { AgentDemoPlayer } from "./Player";
import { DemoWindow, EmptyState, FinishedStep, DemoFooter } from "./parts";

/**
 * Scripted agentic-chat demo for marketing pages.
 *
 * `player` (default) auto-plays the `script` — user messages type out, the
 * agent "thinks", tool calls run and resolve, answers stream in — with
 * pause/replay controls. `transcript` renders the whole script instantly
 * (also used automatically under `prefers-reduced-motion`).
 */
export const AgentDemo = forwardRef<HTMLDivElement, AgentDemoProps>(
  (
    {
      option = "player",
      script,
      title,
      subtitle,
      logo,
      logoSrc,
      logoAlt,
      logoClassName,
      height,
      autoplay,
      paused,
      loop,
      speed,
      showControls,
      showSteps,
      onDone,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    if (option === "transcript") {
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
            footer={<DemoFooter />}
          >
            {script.length === 0 ? (
              <EmptyState />
            ) : (
              script.map((step, i) => <FinishedStep key={i} step={step} />)
            )}
          </DemoWindow>
        </div>
      );
    }
    return (
      <AgentDemoPlayer
        ref={ref}
        script={script}
        title={title}
        subtitle={subtitle}
        logo={logo}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        logoClassName={logoClassName}
        height={height}
        autoplay={autoplay}
        paused={paused}
        loop={loop}
        speed={speed}
        showControls={showControls}
        showSteps={showSteps}
        onDone={onDone}
        className={className}
        aria-label={ariaLabel}
        {...props}
      />
    );
  },
);
AgentDemo.displayName = "AgentDemo";
