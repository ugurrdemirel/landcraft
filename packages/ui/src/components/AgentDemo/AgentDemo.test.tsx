import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import { AgentDemo } from "./AgentDemo";
import type { AgentScriptStep } from "./types";

const script: AgentScriptStep[] = [
  { type: "user", text: "Find our Q3 revenue drivers" },
  { type: "thinking", label: "Analyzing request" },
  {
    type: "tool",
    name: "search_docs",
    args: '{"query": "Q3 revenue"}',
    result: "3 docs found",
    status: "success",
  },
  { type: "assistant", text: "Revenue grew 18%, driven by Nova." },
];

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

function advance(ms: number) {
  // Step in small chunks so React effects flush between timer sweeps:
  // each step of the playback chain (typing -> thinking -> tool) schedules
  // its timers from an effect, which only runs after the previous act().
  const step = 200;
  for (let t = 0; t < ms; t += step) {
    act(() => {
      vi.advanceTimersByTime(Math.min(step, ms - t));
    });
  }
}

describe("AgentDemo", () => {
  it("renders no badge, title, or subtitle unless provided", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.queryByText("Scripted demo")).not.toBeInTheDocument();
    expect(screen.queryByText("Acme Agent")).not.toBeInTheDocument();
    expect(screen.queryByText("Live demo — scripted")).not.toBeInTheDocument();
    const header = screen.getByRole("log").parentElement?.firstElementChild;
    expect(header?.querySelector("p")).not.toBeInTheDocument();
  });

  it("renders the window chrome with title and subtitle", () => {
    render(
      <AgentDemo script={script} title="Acme Agent" subtitle="Watch Nova work" autoplay={false} />,
    );
    expect(screen.getByText("Acme Agent")).toBeInTheDocument();
    expect(screen.getByText("Watch Nova work")).toBeInTheDocument();
  });

  it("renders the transcript option with every step instantly", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.getByText("Find our Q3 revenue drivers")).toBeInTheDocument();
    expect(screen.getByText("Analyzing request")).toBeInTheDocument();
    expect(screen.getByText("search_docs")).toBeInTheDocument();
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /pause|play|replay/i })).not.toBeInTheDocument();
  });

  it("exposes the transcript as a polite live log region", () => {
    render(<AgentDemo script={script} option="transcript" aria-label="Agent walkthrough" />);
    const log = screen.getByRole("log", { name: "Agent walkthrough" });
    expect(log).toHaveAttribute("aria-live", "polite");
  });

  it("renders the full script instantly when autoplay is off", () => {
    render(<AgentDemo script={script} autoplay={false} />);
    expect(screen.getByText("Find our Q3 revenue drivers")).toBeInTheDocument();
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pause demo" })).not.toBeInTheDocument();
  });

  it("plays the script step by step when autoplay is on", () => {
    render(<AgentDemo script={script} autoplay />);
    // Typing has just started: the full user text is not there yet.
    expect(screen.queryByText("Find our Q3 revenue drivers")).not.toBeInTheDocument();

    advance(1_200);
    expect(screen.getByText("Find our Q3 revenue drivers")).toBeInTheDocument();
    expect(screen.getByText("Analyzing request")).toBeInTheDocument();

    advance(30_000);
    expect(screen.getByText("search_docs")).toBeInTheDocument();
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(screen.getByText("Demo complete")).toBeInTheDocument();
  });

  it("shows a running tool call before it resolves", () => {
    render(<AgentDemo script={script} autoplay />);
    advance(3_000);
    expect(screen.getByText("search_docs")).toBeInTheDocument();
    expect(screen.getByText(/running/i)).toBeInTheDocument();
    advance(30_000);
    expect(screen.getByText(/done/i)).toBeInTheDocument();
  });

  it("pauses and resumes playback", () => {
    render(<AgentDemo script={script} autoplay />);
    advance(200);
    fireEvent.click(screen.getByRole("button", { name: "Pause demo" }));
    advance(10_000);
    // Still typing the first message: nothing new appeared while paused.
    expect(screen.queryByText("Find our Q3 revenue drivers")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play demo" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play demo" }));
    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
  });

  it("replays the demo from the start", () => {
    const onDone = vi.fn();
    render(<AgentDemo script={script} autoplay onDone={onDone} />);
    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(onDone).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Replay demo" }));
    expect(screen.queryByText("Revenue grew 18%, driven by Nova.")).not.toBeInTheDocument();

    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(onDone).toHaveBeenCalledTimes(2);
  });

  it("renders finished thinking steps without animation", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.getByText("Analyzing request")).toBeInTheDocument();
    const log = screen.getByRole("log");
    expect(log.querySelector(".animate-bounce, .animate-pulse")).not.toBeInTheDocument();
  });

  it("renders a custom brand logo next to the title", () => {
    render(
      <AgentDemo script={script} option="transcript" logo={<span data-testid="brand-logo" />} />,
    );
    expect(screen.getByTestId("brand-logo")).toBeInTheDocument();
  });

  it("renders a logo image with an accessible name", () => {
    render(
      <AgentDemo
        script={script}
        option="transcript"
        title="Nova Agent"
        logoSrc="/nova-logo.png"
      />,
    );
    expect(screen.getByRole("img", { name: "Nova Agent" })).toHaveAttribute("src", "/nova-logo.png");
  });

  it("renders no logo by default", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("hides the playback buttons when showControls is false", () => {
    render(<AgentDemo script={script} autoplay showControls={false} />);
    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pause demo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Replay demo" })).not.toBeInTheDocument();
    expect(screen.getByText("Demo complete")).toBeInTheDocument();
  });

  it("hides the step progress when showSteps is false", () => {
    render(<AgentDemo script={script} autoplay showSteps={false} />);
    expect(screen.getByRole("button", { name: "Pause demo" })).toBeInTheDocument();
    expect(screen.queryByText(/step \d+ of \d+/i)).not.toBeInTheDocument();
    advance(30_000);
    expect(screen.queryByText("Demo complete")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Replay demo" })).toBeInTheDocument();
  });

  it("hides the whole meta row when controls and steps are both hidden", () => {
    render(<AgentDemo script={script} autoplay showControls={false} showSteps={false} />);
    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    const footer = screen.getByText("Ask anything…").closest("div")?.parentElement;
    expect(footer?.children).toHaveLength(1);
  });

  it("waits while paused and starts when unpaused", () => {
    const { rerender } = render(<AgentDemo script={script} autoplay paused />);
    advance(5_000);
    expect(screen.queryByText("Find our Q3 revenue drivers")).not.toBeInTheDocument();
    expect(screen.queryByText("Analyzing request")).not.toBeInTheDocument();

    rerender(<AgentDemo script={script} autoplay paused={false} />);
    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
  });

  it("renders message bubbles with primary color tokens", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.getByText("Find our Q3 revenue drivers")).toHaveClass(
      "bg-primary",
      "text-on-primary",
    );
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toHaveClass("bg-primary-soft");
  });

  it("renders a 70dvh window with an internally scrolling log by default", () => {
    render(<AgentDemo script={script} option="transcript" />);
    const log = screen.getByRole("log");
    expect(log.parentElement).toHaveStyle({ height: "70dvh" });
    expect(log).toHaveClass("overflow-y-auto");
  });

  it.each(["420px", "28rem", "60dvh"])("applies a custom window height (%s)", (height) => {
    render(<AgentDemo script={script} option="transcript" height={height} />);
    // Read the authored inline value: jsdom resolves rem to px in computed styles.
    expect((screen.getByRole("log").parentElement as HTMLElement).style.height).toBe(height);
  });

  it("keeps the newest step in view while playing", () => {
    render(<AgentDemo script={script} autoplay />);
    const log = screen.getByRole("log") as HTMLDivElement;
    Object.defineProperty(log, "scrollHeight", { value: 1200, configurable: true });
    advance(5_000);
    expect(log.scrollTop).toBe(1200);
  });

  it("shows a blocked cursor on the mock input so it is not mistaken for interactive", () => {
    render(<AgentDemo script={script} option="transcript" />);
    const input = screen.getByText("Ask anything…").closest("div");
    expect(input).toHaveClass("cursor-not-allowed");
  });

  it("types user messages in the input box and mounts the bubble once sent", () => {
    render(<AgentDemo script={script} autoplay />);
    // Mid-typing: the draft lives in the footer input, not in the log.
    advance(200);
    const log = screen.getByRole("log");
    expect(within(log).queryByText(/Find our/)).not.toBeInTheDocument();
    expect(screen.getByText(/Find our/)).toBeInTheDocument();

    // Once sent, the full bubble appears in the log.
    advance(30_000);
    expect(within(log).getByText("Find our Q3 revenue drivers")).toBeInTheDocument();
  });

  it("animates the thinking row only while the step is in progress", () => {
    render(<AgentDemo script={script} autoplay />);
    advance(1_200);
    const log = screen.getByRole("log");
    expect(screen.getByText("Analyzing request")).toBeInTheDocument();
    expect(log.querySelector(".animate-bounce")).toBeInTheDocument();

    advance(30_000);
    expect(screen.getByText("Revenue grew 18%, driven by Nova.")).toBeInTheDocument();
    expect(log.querySelector(".animate-bounce, .animate-pulse")).not.toBeInTheDocument();
  });

  it("expands the tool card to reveal args and result", () => {
    render(<AgentDemo script={script} option="transcript" />);
    expect(screen.queryByText('{"query": "Q3 revenue"}')).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /search_docs details/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText('{"query": "Q3 revenue"}')).toBeInTheDocument();
    expect(screen.getByText("3 docs found")).toBeInTheDocument();
  });

  it("renders an error tool status", () => {
    render(
      <AgentDemo
        script={[{ type: "tool", name: "query_db", result: "Timed out", status: "error" }]}
        option="transcript"
      />,
    );
    expect(screen.queryByText("search_docs")).not.toBeInTheDocument();
    expect(screen.getByText("query_db")).toBeInTheDocument();
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it("renders an empty state when the script has no steps", () => {
    render(<AgentDemo script={[]} autoplay={false} />);
    expect(screen.getByText(/no steps/i)).toBeInTheDocument();
  });
});
