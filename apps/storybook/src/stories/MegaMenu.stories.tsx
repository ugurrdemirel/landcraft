import type { Meta, StoryObj } from "@storybook/react-vite";
import { MegaMenu, Button, ArrowUpRight, LanguageSwitcher } from "@ugurdemirel/landcraft";

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

const meta = {
  title: "Components/MegaMenu",
  component: MegaMenu,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["classic", "floating", "inverse"] },
    sticky: { control: "boolean" },
  },
  args: {
    variant: "classic",
    brand: "Acurio",
    items: [
      {
        label: "Product",
        badge: "New",
        columns: [
          {
            title: "Build",
            links: [
              {
                label: "API Platform",
                description: "REST + GraphQL with type-safe clients.",
                href: "#",
              },
              {
                label: "Workflows",
                description: "Visual automation for repeatable processes.",
                href: "#",
              },
              {
                label: "Integrations",
                description: "140+ native connectors out of the box.",
                href: "#",
              },
            ],
          },
          {
            title: "Explore",
            links: [
              {
                label: "Messaging",
                description: "Email, SMS and push from one API.",
                href: "#",
              },
              {
                label: "Analytics",
                description: "Real-time dashboards and funnels.",
                href: "#",
              },
              {
                label: "Automations",
                description: "Rules that react to every event.",
                href: "#",
              },
            ],
          },
          {
            title: "Platform",
            links: [
              {
                label: "Security",
                description: "SOC 2 Type II, encryption at rest.",
                href: "#",
              },
              {
                label: "Reliability",
                description: "99.99% uptime SLA on every plan.",
                href: "#",
              },
              {
                label: "Pricing",
                description: "Transparent usage-based billing.",
                href: "#",
              },
            ],
          },
        ],
        featured: {
          title: "Ship your first campaign in under 10 minutes",
          description:
            "Follow our guided walkthrough and send a real message to a real inbox.",
          cta: "Get started",
          href: "#",
        },
      },
      {
        label: "Solutions",
        columns: [
          {
            title: "By team",
            links: [
              { label: "Engineering", href: "#" },
              { label: "Growth", href: "#" },
              { label: "Marketing", href: "#" },
              { label: "Customer support", href: "#" },
            ],
          },
          {
            title: "By industry",
            links: [
              { label: "E-commerce", href: "#" },
              { label: "SaaS", href: "#" },
              { label: "Fintech", href: "#" },
              { label: "Healthcare", href: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Case studies", href: "#" },
              { label: "Guides", href: "#" },
              { label: "Webinars", href: "#" },
              { label: "Community", href: "#" },
            ],
          },
        ],
      },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Docs", href: "#" },
    ],
    cta: (
      <Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
        Start for free
      </Button>
    ),
    actions: <Button variant="ghost" size="sm">Log in</Button>,
  },
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Classic hairline bar with full-width mega panel. */
export const Option1_Classic: Story = {
  name: "Option 1 · Classic",
  args: { variant: "classic" },
  parameters: {
    docs: {
      description: {
        story:
          "The default, most restrained option. A full-width mega panel drops below the bar on hover or on trigger click.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[26rem]">
        <Story />
      </div>
    ),
  ],
};

/** Floating pill — modern inset bar, panel matched to its width. */
export const Option2_Floating: Story = {
  name: "Option 2 · Floating",
  args: { variant: "floating" },
  parameters: {
    docs: {
      description: {
        story: "A floating bar inset from the page. The panel inherits its width and soft shadow.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[26rem]">
        <Story />
      </div>
    ),
  ],
};

/** Floating bar with a language switcher on the right. */
export const WithLanguageSwitcher: Story = {
  name: "With language switcher (floating)",
  args: {
    variant: "floating",
    languageSwitcher: <LanguageSwitcher languages={languages} showFlag />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `languageSwitcher` slot renders on desktop next to the actions; below desktop it moves inside the hamburger menu — the opened panel matches the floating bar's width.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[26rem]">
        <Story />
      </div>
    ),
  ],
};

/** Inverse — ink bar for dark/statement sites. */
export const Option3_Inverse: Story = {
  name: "Option 3 · Inverse",
  args: { variant: "inverse" },
  parameters: {
    docs: {
      description: {
        story: "Ink-black surface; panel flips to a dark card and tokens from `--color-on-secondary`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[26rem]">
        <Story />
      </div>
    ),
  ],
};

/** No featured card, plain two-column panel. */
export const TwoColumnPanel: Story = {
  name: "Two-column panel (no featured)",
  args: {
    variant: "classic",
    items: [
      {
        label: "Developers",
        columns: [
          {
            title: "Get started",
            links: [
              { label: "Quickstart", href: "#" },
              { label: "Tutorials", href: "#" },
              { label: "SDKs & Tools", href: "#" },
              { label: "Changelog", href: "#" },
            ],
          },
          {
            title: "API reference",
            links: [
              { label: "REST API", href: "#" },
              { label: "GraphQL API", href: "#" },
              { label: "Webhooks", href: "#" },
              { label: "Status codes", href: "#" },
            ],
          },
        ],
      },
      {
        label: "Company",
        columns: [
          {
            title: "About",
            links: [
              { label: "Our story", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Press kit", href: "#" },
            ],
          },
          {
            title: "Community",
            links: [
              { label: "Discord", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "X / Twitter", href: "#" },
            ],
          },
        ],
      },
      { label: "Pricing", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="min-h-[24rem]">
        <Story />
      </div>
    ),
  ],
};

/** Trigger with icons only inside a simple popover-style card. */
export const IconFeaturePanel: Story = {
  name: "Icon feature panel",
  args: {
    variant: "classic",
    items: [
      {
        label: "Features",
        columns: [
          {
            title: "Speed",
            links: [
              {
                label: "Real-time sync",
                description: "Live updates across every workspace.",
                href: "#",
              },
              {
                label: "Edge delivery",
                description: "Serve from 30+ global regions.",
                href: "#",
              },
            ],
          },
          {
            title: "Intelligence",
            links: [
              {
                label: "AI assistant",
                description: "Ask questions in plain language.",
                href: "#",
              },
              {
                label: "Forecasting",
                description: "Predict trends before they happen.",
                href: "#",
              },
            ],
          },
          {
            title: "Platform",
            links: [
              {
                label: "Security audits",
                description: "Continuous pen-testing & SOC 2.",
                href: "#",
              },
              {
                label: "Private cloud",
                description: "VPC / on-prem deployments.",
                href: "#",
              },
            ],
          },
        ],
        featured: {
          title: "Everything runs on our edge network",
          description: "99.99% uptime, sub-50ms median latency.",
          cta: "Read the platform overview",
          href: "#",
        },
      },
      {
        label: "Pricing", href: "#",
      },
      {
        label: "Docs", href: "#",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="min-h-[24rem]">
        <Story />
      </div>
    ),
  ],
};

/** Links marked `external: true` open in a new tab. */
export const ExternalLinks: Story = {
  name: "External links (new tab)",
  args: {
    variant: "classic",
    items: [
      {
        label: "Developers",
        columns: [
          {
            title: "Docs",
            links: [
              { label: "API reference", href: "https://docs.example.com/api", external: true },
              { label: "Changelog", href: "https://github.com/example/releases", external: true },
              { label: "Status", href: "#" },
            ],
          },
        ],
        featured: {
          title: "Read the platform overview",
          description: "Architecture, security and uptime details.",
          cta: "Open docs",
          href: "https://docs.example.com/overview",
          external: true,
        },
      },
      { label: "Pricing", href: "#" },
      { label: "GitHub", href: "https://github.com/example", external: true },
    ],
  },
  decorators: [
    (Story) => (
      <div className="min-h-[24rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Mark a column link, the featured card or a plain top-level link with `external: true` to open it in a new tab (`target="_blank"` with `rel="noopener noreferrer"`).',
      },
    },
  },
};

/**
 * Logo swap — a brand mark instead of a wordmark, plus a non-sticky bar.
 */
export const WithLogo: Story = {
  name: "Logo swap (brand mark)",
  args: {
    variant: "classic",
    brand: undefined,
    sticky: false,
    items: [
      {
        label: "Product",
        columns: [
          {
            title: "Starred",
            links: [
              { label: "Apps & plugins", href: "#" },
              { label: "Templates", href: "#" },
            ],
          },
          {
            title: "Recent",
            links: [
              { label: "Design system", href: "#" },
              { label: "Analytics", href: "#" },
            ],
          },
        ],
      },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
    ],
    logo: (
      <span className="flex items-center gap-2.5">
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path
            d="M10 22 22 10M13 10h6.5A2.5 2.5 0 0 1 22 12.5V19"
            stroke="rgb(var(--color-on-primary))"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="font-display text-[17px] font-bold tracking-tight">Acurio</span>
      </span>
    ),
  },
  decorators: [
    (Story) => (
      <div className="min-h-[20rem]">
        <Story />
      </div>
    ),
  ],
};

/** Interactive version to play with the hover/click/escape behavior. */
export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "classic",
    items: [
      {
        label: "Product",
        columns: [
          {
            title: "Capabilities",
            links: [
              { label: "Campaigns", description: "Design and send at scale.", href: "#" },
              { label: "Automations", description: "Trigger journeys on events.", href: "#" },
              { label: "Segments", description: "Target precisely, in real time.", href: "#" },
            ],
          },
          {
            title: "Industries",
            links: [
              { label: "Retail & e-commerce", href: "#" },
              { label: "Financial services", href: "#" },
              { label: "Media & publishing", href: "#" },
            ],
          },
        ],
        featured: {
          title: "Explore the product tour",
          description: "See how teams ship campaigns 3× faster.",
          cta: "Watch the tour",
          href: "#",
        },
      },
      {
        label: "Developers",
        columns: [
          {
            title: "Get started",
            links: [
              { label: "Quickstart guide", href: "#" },
              { label: "API reference", href: "#" },
              { label: "Webhooks", href: "#" },
            ],
          },
          {
            title: "Community",
            links: [
              { label: "GitHub", href: "#" },
              { label: "Discord", href: "#" },
              { label: "Office hours", href: "#" },
            ],
          },
        ],
      },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
    ],
    cta: (
      <Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
        Start for free
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div className="min-h-[26rem]">
        <Story />
      </div>
    ),
  ],
};