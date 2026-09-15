import type { Meta, StoryObj } from "@storybook/react-vite";
import { AgentDemo, type AgentScriptStep } from "@ugurdemirel/landcraft";

const revenueScript: AgentScriptStep[] = [
  { type: "user", text: "Why did revenue spike in Q3?" },
  { type: "thinking", label: "Planning analysis" },
  {
    type: "tool",
    name: "query_warehouse",
    args: '{"table": "revenue", "quarter": "Q3"}',
    result: "4,182 rows scanned in 1.2s",
  },
  { type: "thinking", label: "Reading docs" },
  {
    type: "tool",
    name: "search_docs",
    args: '{"query": "Q3 launch Nova pricing"}',
    result: "3 docs found",
  },
  {
    type: "assistant",
    text: "Revenue grew 18% in Q3, driven by the Nova launch and the new usage-based pricing. I linked the top 3 docs below.",
  },
];

const meta = {
  title: "Components/AgentDemo",
  component: AgentDemo,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["player", "transcript"] },
    autoplay: { control: "boolean" },
    loop: { control: "boolean" },
    showControls: { control: "boolean" },
    showSteps: { control: "boolean" },
    speed: { control: { type: "range", min: 0.5, max: 3, step: 0.5 } },
  },
  args: {
    script: revenueScript,
    title: "Nova Agent",
    subtitle: "Live demo — scripted",
    logo: (
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background"
      >
        N
      </span>
    ),
  },
} satisfies Meta<typeof AgentDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Player: Story = {
  name: "Player · autoplay with tool calls",
  args: { option: "player", autoplay: true },
};

export const LoopingKiosk: Story = {
  name: "Player · looping kiosk",
  args: { option: "player", autoplay: true, loop: true, speed: 1.5, showControls: false },
};

export const Transcript: Story = {
  name: "Transcript · static, no animation",
  args: { option: "transcript" },
};

export const FailedTool: Story = {
  name: "Transcript · failed tool call",
  args: {
    option: "transcript",
    script: [
      { type: "user", text: "Sync the CRM contacts" },
      { type: "thinking", label: "Connecting" },
      {
        type: "tool",
        name: "sync_crm",
        args: '{"object": "contacts"}',
        result: "Request timed out after 10s",
        status: "error",
      },
      { type: "assistant", text: "The CRM sync failed — I kept your local changes and will retry automatically." },
    ],
  },
};
