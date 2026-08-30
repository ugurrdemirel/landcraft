import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navbar,
  Hero,
  LogoCloud,
  FeatureGrid,
  Stats,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
  Button,
  Section,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Code,
  Cpu,
  Send,
  Box,
  Sliders,
  Zap,
  ShieldCheck,
  Gauge,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Developer Tools",
  tags: ["autodocs"],
};

export default meta;

const TerminalWindow = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-[#0f0f10] shadow-raised">
    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="ml-3 font-mono text-xs text-white/40">~ acurio init --deploy</span>
    </div>
    <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-6">
      <p className="text-white/30">$ pnpm add @ugurdemirel/landcraft</p>
      <p className="text-white/70">
        <span className="text-emerald-400">✓</span> added 1 package in 412ms
      </p>
      <p className="text-white/30">$ import <span className="text-sky-300">"@ugurdemirel/landcraft/styles.css"</span></p>
      <p className="text-white/70">
        <span className="text-emerald-400">✓</span> tokens loaded · font-display + font-sans
      </p>
      <p className="text-white/30">$ acurio deploy --env prod</p>
      <p className="text-white/70">
        <span className="text-emerald-400">▲</span> deploy complete · <span className="text-emerald-400">48 files</span> · 1.2s
      </p>
      <p className="text-white/30">→ <span className="text-sky-300">https://acurio.app</span> 🎉</p>
    </div>
  </div>
);

export const DeveloperTools: StoryObj = {
  name: "Developer Tools — Light",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="classic"
        brand="Acurio ⌘"
        logo={
          <span className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
              <rect width="32" height="32" rx="7" fill="currentColor" />
              <path
                d="m9 23 7-14 7 14M11.5 18.5h9"
                stroke="rgb(var(--color-on-secondary))"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="font-display text-[16px] font-bold tracking-tight">acurio</span>
          </span>
        }
        links={[
          { label: "Documentation", href: "#" },
          { label: "API", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Playground", href: "#" },
        ]}
        cta={<Button size="sm" variant="dark" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>Open console</Button>}
      />

      <Hero
        variant="split"
        eyebrow="v4.0 is now live"
        title={
          <>
            Deploys for the <br className="hidden sm:block" />
            <span className="text-primary">builders.</span>
          </>
        }
        description="Monorepo design system, token-based theming, and automatic contrast. Start on the command line, ship in minutes."
        primaryAction={
          <Button size="lg" variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>
            Install now
          </Button>
        }
        secondaryAction={
          <Button size="lg" variant="outline" iconLeft={<Terminal className="h-4 w-4" />}>
            CLI guide
          </Button>
        }
        meta={[
          { label: "Zero-config", icon: <Zap className="h-4 w-4" /> },
          { label: "TypeScript-first", icon: <Code className="h-4 w-4" /> },
          { label: "MIT license", icon: <ShieldCheck className="h-4 w-4" /> },
        ]}
        media={<TerminalWindow />}
      />

      <Section size="sm">
        <LogoCloud option="quiet" title="Open-source ecosystem" logos={[{ name: "Vercel" }, { name: "Turborepo" }, { name: "pnpm" }, { name: "Tailwind" }, { name: "Storybook" }, { name: "Vite" }]} />
      </Section>

      <Section size="md" eyebrowStyle="caps" eyebrow="Why Acurio" title="Developer experience comes first" description="Speed in every touchpoint, from install to release notes.">
        <FeatureGrid
          option="editorialRows"
          features={[
            { icon: <Terminal className="h-5 w-5" />, title: "Every component type-safe", description: "Autocomplete, type inference, and documentation built into every UI component." },
            { icon: <Code className="h-5 w-5" />, title: "Zero-config theming", description: "--color-primary in one line. Palette, font, and corner radius change at runtime." },
            { icon: <Cpu className="h-5 w-5" />, title: "Tree-shakeable", description: "Only the components you use end up in the bundle." },
            { icon: <Sliders className="h-5 w-5" />, title: "Craft control", description: "Every component can be customized piece by piece, along with its subcomponents." },
            { icon: <Box className="h-5 w-5" />, title: "Monorepo from the start", description: "Workspaces, build order, and type sharing out of the box." },
            { icon: <Send className="h-5 w-5" />, title: "Fast loop", description: "Live preview that hot-reloads on Storybook in seconds." },
          ]}
        />
      </Section>

      <Section size="sm">
        <Stats
          option="cells"
          stats={[
            { value: "18ms", label: "Average bundle time" },
            { value: "0", label: "Dependency bloat", accent: true },
            { value: "99.5%", label: "Test coverage" },
            { value: "2.1k", label: "GitHub stars" },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Pricing" title="Open source, private scale" description="Free from the first use. When you scale, a single contract is enough.">
        <Pricing
          option="compact"
          plans={[
            { name: "Community", description: "For OSS", monthly: 0, yearly: 0, features: ["Unlimited components", "Community support"], cta: "Get started" },
            { name: "Pro", description: "Solo founders", monthly: 19, yearly: 190, highlighted: true, features: ["Unlimited projects", "Priority support", "Color diagnostics"], cta: "Go Pro" },
            { name: "Org", description: "Teams", monthly: 49, yearly: 490, features: ["SSO", "Audit logs", "Dedicated engineer"], cta: "Contact sales" },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Community" title="What developers say">
        <Testimonials
          option="grid"
          items={[
            { quote: "I ran the CLI and the first demo was up in 11 minutes. Impressive.", author: "Mert Can", role: "Founder", company: "Fieldwork", rating: 5 },
            { quote: "The type definitions are perfect — autocomplete says it all.", author: "Selin Arat", role: "Frontend Lead", company: "Forge", rating: 5 },
            { quote: "New team members finish onboarding without reading any code.", author: "Tomas Kepler", role: "CTO", company: "shipfast", rating: 5 },
          ]}
        />
      </Section>

      <Section size="sm">
        <FAQ
          option="split"
          eyebrow="FAQ"
          title="Developer FAQ"
          description="Can't find the answer? Open an issue on GitHub — usually answered within 24 hours."
          items={[
            { question: "Does it work with Next.js?", answer: "Yes — works with React 18+ and any Vite-based setup." },
            { question: "Can I get the CSS tokens as JSON?", answer: "Yes — the `@ugurdemirel/landcraft/tokens` export exists." },
            { question: "Can I use my own icon set?", answer: "Icons are fully swappable; the default set is emoji-free and stroke-based." },
          ]}
        />
      </Section>

      <CTA
        option="inverse"
        title="From your terminal in 60 seconds."
        description="Start with npm i. Not a single step more until launch."
        action={
          <Button size="lg" className="bg-surface text-foreground hover:bg-surface-strong" iconRight={<ArrowRight className="h-4 w-4" />}>
            Developer guide
          </Button>
        }
      />

      <Footer
        option="classic"
        brand="Acurio ⌘"
        description="Token-based, contrast-guaranteed marketing components for developers."
        columns={[
          { title: "Product", links: [{ label: "CLI", href: "#" }, { label: "Library", href: "#" }, { label: "Pricing", href: "#" }, { label: "Changelog", href: "#" }] },
          { title: "Developers", links: [{ label: "Documentation", href: "#" }, { label: "API reference", href: "#" }, { label: "Color Hub", href: "#" }, { label: "Status", href: "#" }] },
          { title: "Community", links: [{ label: "GitHub", href: "#" }, { label: "Discord", href: "#" }, { label: "X", href: "#" }, { label: "Mastodon", href: "#" }] },
        ]}
        socials={
          <>
            {["gh", "D", "𝕏"].map((label) => (
              <a key={label} href="#" aria-label={`Social ${label}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-xs font-semibold text-on-secondary/70 transition-colors duration-150 hover:border-white/30 hover:text-on-secondary">
                {label}
              </a>
            ))}
          </>
        }
        bottom="MIT © 2026 Acurio"
      />
    </div>
  ),
};

export const ApiReference: StoryObj = {
  name: "Signature cards (subsection)",
  parameters: { layout: "padded" },
  render: () => (
    <div>
      <Section size="sm" eyebrowStyle="caps" eyebrow="API reference" title="Most-used functions">
        <div className="space-y-3">
          {[
            { sig: "color: contrast-color(bg)", desc: "CSS picks the most readable text color for a surface automatically." },
            { sig: "contrast-color(rgb(var(--color-primary)))", desc: "Binds contrast to a live --color-* token — re-themes instantly." },
            { sig: "<Navbar variant='floating' … />", desc: "Three navbar options: floating, blurred, and fully token-based." },
            { sig: "import('@ugurdemirel/landcraft/theme.css')", desc: "A tone, font, and radius theme (Tailwind v4 CSS) for your own project." },
          ].map((item) => (
            <div key={item.sig} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-3 bg-surface-strong px-5 py-3.5">
                <Gauge className="h-4 w-4 shrink-0 text-primary" />
                <code className="font-mono text-[13px] text-foreground">{item.sig}</code>
              </div>
              <p className="px-5 py-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section size="sm">
        <Stats option="editorial" stats={[{ value: "24", label: "Endpoints" }, { value: "99.9%", label: "SLA" }, { value: "12ms", label: "P95" }, { value: "4", label: "Regions" }]} />
      </Section>
    </div>
  ),
};