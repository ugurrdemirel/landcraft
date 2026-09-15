import type { HTMLAttributes, ReactNode } from "react";

export type AgentDemoOption = "player" | "transcript";

export type AgentScriptStep =
  | { type: "user"; text: string }
  | { type: "thinking"; label?: string }
  | {
      type: "tool";
      /** Function/tool name, e.g. `search_docs`. */
      name: string;
      /** JSON-encoded arguments shown when the card is expanded. */
      args?: string;
      /** Short result summary shown when the card is expanded. */
      result?: string;
      status?: "running" | "success" | "error";
    }
  | { type: "assistant"; text: string };

export interface AgentDemoProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** `player` auto-plays the script with typing + thinking + tool effects; `transcript` renders every step instantly. Defaults to `player`. */
  option?: AgentDemoOption;
  /** The scripted demo, played top to bottom. No backend — all content is static. */
  script: AgentScriptStep[];
  /** Window height as any CSS length (`px`, `rem`, `dvh`, …). Defaults to `70dvh`. */
  height?: string;
  /** Window header title. Rendered only when present. */
  title?: ReactNode;
  /** Custom brand logo node rendered next to the title. */
  logo?: ReactNode;
  /** Quick brand logo image source. */
  logoSrc?: string;
  logoAlt?: string;
  /** Size tuning for logo images. Defaults to `h-8 w-8 rounded-lg`. */
  logoClassName?: string;
  /** Window header subtitle. Rendered only when present. */
  subtitle?: ReactNode;
  /** Start playing on mount. When `false`, the full script renders instantly. Defaults to `true`. */
  autoplay?: boolean;
  /** Hold the first frame instead of playing (e.g. resume on a keypress or on scroll into view). Defaults to `false`. */
  paused?: boolean;
  /** Restart automatically after finishing. Defaults to `false`. */
  loop?: boolean;
  /** Playback speed multiplier. Defaults to `1`. */
  speed?: number;
  /** Show the pause / play / replay buttons. Defaults to `true`. */
  showControls?: boolean;
  /** Show the step progress ("Step X of N"). Defaults to `true`. */
  showSteps?: boolean;
  /** Called once each time playback reaches the end. */
  onDone?: () => void;
}
