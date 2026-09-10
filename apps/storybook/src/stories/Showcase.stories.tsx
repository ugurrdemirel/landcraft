import type { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navbar,
  Hero,
  MegaMenu,
  LogoCloud,
  FeatureGrid,
  FeatureCard,
  Stats,
  Pricing,
  Testimonials,
  TestimonialCard,
  Newsletter,
  FAQ,
  CTA,
  Footer,
  Button,
  Section,
  Badge,
  Card,
  CardTitle,
  BlogCard,
  BlogSection,
  Prose,
  LanguageSwitcher,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  X,
  Menu,
  ChevronDown,
  Star,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  Code,
  Smartphone,
  Box,
  Terminal,
  Sliders,
  Lock,
  Send,
  Quote,
  Globe,
  Mail,
  Clock,
  Gauge,
  BarChart,
  Users,
  Rocket,
  cn,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Intro/Showcase",
  tags: ["autodocs"],
};

export default meta;

const LandcraftMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden>
    <rect width="32" height="32" rx="8" fill="rgb(var(--color-primary))" />
    <rect x="8" y="8.5" width="16" height="3.6" rx="1.8" fill="rgb(var(--color-on-primary))" />
    <rect x="8" y="14.2" width="11" height="3.6" rx="1.8" fill="rgb(var(--color-on-primary))" opacity="0.72" />
    <rect x="8" y="19.9" width="6" height="3.6" rx="1.8" fill="rgb(var(--color-on-primary))" opacity="0.45" />
  </svg>
);

const Brand = () => (
  <span className="flex items-center gap-2.5">
    <LandcraftMark />
    <span className="font-display text-[17px] font-bold tracking-tight">Landcraft</span>
  </span>
);

const ProductWindow = () => (
  <div className="relative">
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(55%_55%_at_60%_10%,rgb(var(--color-primary)/0.22),transparent_70%)] blur-2xl"
    />
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay">
      <div className="flex items-center gap-2 border-b border-border bg-surface-strong/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="ml-3 flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3" /> landcraft.dev
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div className="rounded-xl border border-border bg-background p-5">
          <Badge variant="soft" size="sm">New · v0.1.18</Badge>
          <p className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
            Launch pages that convert.
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Hero, pricing, testimonials — composed from tokens, contrast included.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
              Start free
            </Button>
            <Button size="sm" variant="outline">
              Live demo
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Pro</span>
              <Badge variant="soft" size="sm">Popular</Badge>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              $29
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] text-muted-foreground">
              {["Unlimited projects", "Priority support", "Advanced analytics"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary" /> {item}
                </li>
              ))}
            </ul>
            <Button size="sm" fullWidth className="mt-4">
              Choose Pro
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-surface-strong/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              This month
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-4">
              {[
                { value: "12K+", label: "Active users" },
                { value: "98%", label: "Satisfaction", accent: true },
                { value: "1.8ms", label: "Median latency" },
                { value: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className={cn(
                      "font-display text-xl font-semibold tracking-tight",
                      s.accent ? "text-primary" : "text-foreground",
                    )}
                  >
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="dark">Dark</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
            <Button size="sm" customColor="#059669">customColor</Button>
            <span className="mx-1 h-5 w-px bg-border" />
            <Badge variant="soft" size="sm">Soft</Badge>
            <Badge variant="solid" size="sm">Solid</Badge>
            <Badge variant="outline" size="sm">Outline</Badge>
            <Badge variant="dot" size="sm">Dot</Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Specimen = ({
  label,
  options,
  className,
  children,
}: {
  label: string;
  options?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}>
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {options ? (
        <span className="truncate text-[11px] text-muted-foreground/70">{options}</span>
      ) : null}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export const Overview: StoryObj = {
  name: "Overview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div data-shot="preview">
        <Navbar
          variant="classic"
          brand={undefined}
          logo={<Brand />}
          brandHref="#"
          links={[
            { label: "Components", href: "#components" },
            { label: "Templates", href: "#templates" },
            { label: "Theming", href: "#theming" },
            { label: "Docs", href: "#docs" },
          ]}
          actions={
            <Button variant="ghost" size="sm">
              GitHub
            </Button>
          }
          cta={
            <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
              Get started
            </Button>
          }
        />

        <Hero
          variant="split"
          eyebrow="React 18+ · Tailwind CSS v4 · SSR / RSC ready"
          title={
            <>
              Landing pages,
              <br />
              <span className="text-primary">assembled.</span>
            </>
          }
          description="Landcraft is a React component library for marketing sites. Twenty-plus accessible sections, token-based theming, and contrast handled automatically — compose a polished page in an afternoon."
          primaryAction={
            <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Explore components
            </Button>
          }
          secondaryAction={
            <Button size="lg" variant="outline" iconLeft={<Star className="h-4 w-4" />}>
              Star on GitHub
            </Button>
          }
          meta={[
            { label: "WCAG AA contrast", icon: <ShieldCheck className="h-4 w-4" /> },
            { label: "20+ sections", icon: <Layers className="h-4 w-4" /> },
            { label: "SSR / RSC ready", icon: <Code className="h-4 w-4" /> },
          ]}
          media={<ProductWindow />}
        />
      </div>

      <Section size="sm">
        <LogoCloud
          option="quiet"
          title="Fits the stack you already use"
          logos={[
            { name: "React" },
            { name: "Next.js" },
            { name: "Vite" },
            { name: "TypeScript" },
            { name: "Tailwind CSS" },
            { name: "Storybook" },
          ]}
        />
      </Section>

      <Section
        size="md"
        eyebrowStyle="soft"
        eyebrow="Why Landcraft"
        title="Designed to be handed off"
        description="One consistent design language, re-skinnable from the outside — so the page stays coherent as the brand evolves."
      >
        <FeatureGrid
          option="bento"
          features={[
            {
              icon: <Layers className="h-5 w-5" />,
              title: "One API, many looks",
              description: "Every section ships multiple options — switch the entire look with a single prop.",
            },
            {
              icon: <Palette className="h-5 w-5" />,
              title: "Theme from outside",
              description: "Color, type and shape live in CSS tokens. Re-skin without touching a component.",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              title: "Contrast by default",
              description: "Paired on-* tokens and native contrast-color() keep text readable in every palette.",
            },
            {
              icon: <Code className="h-5 w-5" />,
              title: "SSR & RSC ready",
              description: "A preserve-modules build keeps \"use client\" at the leaves, so bundles stay small.",
            },
            {
              icon: <Smartphone className="h-5 w-5" />,
              title: "Fully responsive",
              description: "Flawless from 375px phones to 4K displays, with mobile navigation included.",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              title: "Zero runtime",
              description: "No JS contrast helpers and no heavy dependencies — just clsx and tailwind-merge.",
            },
          ]}
        />
      </Section>

      <Section
        size="md"
        id="components"
        eyebrowStyle="caps"
        eyebrow="Components"
        title="The whole kit, ready to drop in"
        description="Real components from the library — same tokens, same design language, every option available."
      >
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Specimen label="FeatureGrid" options="columns · bento · editorialRows">
            <FeatureGrid
              option="columns"
              columns={3}
              features={[
                { icon: <Zap className="h-5 w-5" />, title: "Fast setup", description: "Zero config." },
                { icon: <Palette className="h-5 w-5" />, title: "Token theming", description: "Re-skin in CSS." },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Accessible", description: "AA contrast." },
              ]}
            />
          </Specimen>

          <Specimen label="Stats" options="editorial · hairline · cells · ticker">
            <Stats
              option="hairline"
              columns={3}
              stats={[
                { value: "20+", label: "Components" },
                { value: "40+", label: "Variants", accent: true },
                { value: "100%", label: "Typed" },
              ]}
            />
          </Specimen>

          <Specimen label="Pricing" options="cards · bento · compact" className="lg:col-span-2">
            <Pricing
              option="compact"
              plans={[
                {
                  name: "Starter",
                  monthly: 9,
                  yearly: 90,
                  features: ["1 project", "Community support"],
                  cta: "Get started",
                },
                {
                  name: "Professional",
                  monthly: 29,
                  yearly: 290,
                  highlighted: true,
                  features: ["Unlimited projects", "Priority support", "Advanced analytics"],
                  cta: "Go Pro",
                },
                {
                  name: "Enterprise",
                  monthly: null,
                  yearly: null,
                  features: ["SLA", "SSO & audit log", "Dedicated manager"],
                  cta: "Contact us",
                },
              ]}
            />
          </Specimen>

          <Specimen label="Testimonials" options="grid · carousel · marquee" className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <TestimonialCard
                testimonial={{
                  quote: "Hours of layout work dropped to fifteen minutes. I changed the palette and contrast held everywhere.",
                  author: "Ayşe Yıldız",
                  role: "Founder",
                  company: "Lumina",
                  rating: 5,
                }}
              />
              <TestimonialCard
                testimonial={{
                  quote: "We shipped a polished marketing page for our first product in a single evening.",
                  author: "Mehmet Demir",
                  role: "CTO",
                  company: "Nova Labs",
                  rating: 5,
                }}
              />
              <TestimonialCard
                testimonial={{
                  quote: "Without a designer, every brand stays consistent and accessible.",
                  author: "Zeynep Kaya",
                  role: "Product Manager",
                  company: "Vertex",
                  rating: 5,
                }}
              />
            </div>
          </Specimen>

          <Specimen label="Newsletter" options="inline · card · underline">
            <Newsletter
              option="card"
              note="No spam. Unsubscribe anytime."
              onSubmit={() => undefined}
            />
          </Specimen>

          <Specimen label="FAQ" options="accordion · split · cards">
            <FAQ
              option="accordion"
              items={[
                {
                  question: "How long does setup take?",
                  answer: "Install the package, import styles.css, override a few tokens. About a minute.",
                },
                {
                  question: "Can I use my own fonts?",
                  answer: "Point --font-display and --font-sans at your fonts — no build config needed.",
                },
                {
                  question: "Does it work with Next.js?",
                  answer: "Yes. The build preserves \"use client\" directives so it runs in RSC and SSR.",
                },
              ]}
            />
          </Specimen>
        </div>
      </Section>

      <Section size="sm">
        <Stats
          option="cells"
          columns={4}
          stats={[
            { value: "20+", label: "Components", icon: <Box className="h-5 w-5" /> },
            { value: "40+", label: "Visual options", icon: <Sliders className="h-5 w-5" />, accent: true },
            { value: "100%", label: "TypeScript", icon: <Code className="h-5 w-5" /> },
            { value: "0", label: "Config required", icon: <Zap className="h-5 w-5" /> },
          ]}
        />
      </Section>

      <Section size="sm" id="theming">
        <CTA
          option="inverse"
          title="Ship your next landing page tonight"
          description="One install, one import, and a handful of tokens. Everything else is already designed."
          action={
            <Button
              size="lg"
              className="bg-surface text-foreground hover:bg-surface-strong"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Get started
            </Button>
          }
          secondaryAction={
            <Button
              variant="outline"
              className="border-white/25 text-current hover:bg-white/10"
              iconLeft={<Terminal className="h-4 w-4" />}
            >
              pnpm add @ugurdemirel/landcraft
            </Button>
          }
        />
      </Section>

      <Footer
        option="classic"
        brand={undefined}
        logo={<Brand />}
        description="A React + Tailwind component library for landing and marketing pages. Token-based theming, automatic contrast."
        columns={[
          {
            title: "Components",
            links: [
              { label: "Hero", href: "#components" },
              { label: "Features", href: "#components" },
              { label: "Pricing", href: "#components" },
              { label: "Testimonials", href: "#components" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Storybook", href: "#" },
              { label: "Theming", href: "#theming" },
              { label: "Changelog", href: "#" },
            ],
          },
          {
            title: "Project",
            links: [
              { label: "GitHub", href: "#" },
              { label: "npm", href: "#" },
              { label: "License", href: "#" },
            ],
          },
        ]}
        socials={
          <>
            {[
              { label: "GitHub", icon: <Code className="h-4 w-4" /> },
              { label: "npm", icon: <Box className="h-4 w-4" /> },
              { label: "X", icon: <Send className="h-4 w-4" /> },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground"
              >
                {s.icon}
              </a>
            ))}
          </>
        }
        bottom={
          <span className="flex items-center gap-2">
            <LandcraftMark className="h-4 w-4" /> Built with @ugurdemirel/landcraft
          </span>
        }
      />
    </div>
  ),
};

const iconSet: ComponentType<{ className?: string }>[] = [
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  X,
  Menu,
  ChevronDown,
  Zap,
  ShieldCheck,
  Layers,
  Smartphone,
  Gauge,
  BarChart,
  Users,
  Star,
  Quote,
  Globe,
  Mail,
  Lock,
  Clock,
  Code,
  Terminal,
  Send,
  Rocket,
];

export const ComponentBoard: StoryObj = {
  name: "Component board",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div data-shot="board" className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <LandcraftMark />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Landcraft
            </span>
            <span className="ml-1 rounded-full bg-primary-soft px-2.5 py-0.5 font-mono text-[11px] font-medium text-primary">
              @ugurdemirel/landcraft
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            React · Tailwind CSS v4 · AA contrast
          </span>
        </div>

        <div className="grid grid-cols-12 items-start gap-4">
          <Specimen label="Button" options="5 variants · 3 sizes" className="col-span-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="dark">Dark</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
                <Button size="sm" variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" iconLeft={<Plus className="h-4 w-4" />}>New</Button>
                <Button size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>Next</Button>
                <Button size="sm" customColor="#059669">customColor</Button>
                <Button size="sm" disabled>Disabled</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>Large</Button>
              </div>
            </div>
          </Specimen>

          <Specimen label="Badge" options="soft · solid · outline · dot" className="col-span-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="soft" size="sm">Soft</Badge>
                <Badge variant="solid" size="sm">Solid</Badge>
                <Badge variant="outline" size="sm">Outline</Badge>
                <Badge variant="dot" size="sm">Dot</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm" icon={<Zap className="h-3.5 w-3.5" />}>With icon</Badge>
                <Badge size="sm" customColor="#059669">customColor</Badge>
                <Badge size="sm" customColor="#eab308">Contrast</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="soft">Default</Badge>
                <Badge variant="solid">Solid</Badge>
              </div>
            </div>
          </Specimen>

          <Specimen label="Icons" options="24×24 stroke" className="col-span-3">
            <div className="grid grid-cols-6 gap-1.5">
              {iconSet.map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 place-items-center rounded-lg border border-border text-muted-foreground"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </Specimen>

          <Specimen label="Card" options="outlined · elevated · inset" className="col-span-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {(["outlined", "elevated", "inset"] as const).map((variant) => (
                <Card key={variant} variant={variant} className="p-3.5">
                  <CardTitle className="text-sm capitalize">{variant}</CardTitle>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Card body copy.</p>
                </Card>
              ))}
            </div>
          </Specimen>

          <Specimen label="Newsletter" options="inline · card · underline" className="col-span-4">
            <Newsletter option="card" note="No spam. Unsubscribe anytime." onSubmit={() => undefined} />
          </Specimen>

          <Specimen label="LanguageSwitcher" options="dropdown · modal" className="col-span-4">
            <LanguageSwitcher
              languages={[
                { code: "en", label: "English" },
                { code: "tr", label: "Türkçe" },
                { code: "de", label: "Deutsch" },
                { code: "fr", label: "Français" },
              ]}
              showFlag
            />
          </Specimen>

          <Specimen label="Modal" options="sm · md · lg" className="col-span-4">
            <div className="rounded-xl border border-border bg-surface p-4 shadow-overlay">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                    Confirm your choice
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
                <X className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button size="sm" variant="outline">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </div>
            </div>
          </Specimen>

          <Specimen label="Stats" options="cells" className="col-span-4">
            <Stats
              option="cells"
              columns={2}
              stats={[
                { value: "12K+", label: "Active users" },
                { value: "98%", label: "Satisfaction", accent: true },
              ]}
            />
          </Specimen>

          <Specimen label="Stats" options="editorial · hairline · ticker" className="col-span-4">
            <Stats
              option="editorial"
              columns={2}
              stats={[
                { value: "20+", label: "Components" },
                { value: "40+", label: "Variants", accent: true },
              ]}
            />
          </Specimen>

          <Specimen label="FeatureGrid" options="columns · bento · editorialRows" className="col-span-6">
            <FeatureGrid
              option="columns"
              columns={3}
              features={[
                { icon: <Zap className="h-5 w-5" />, title: "Fast", description: "Zero config." },
                { icon: <Palette className="h-5 w-5" />, title: "Themed", description: "Token driven." },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Accessible", description: "AA contrast." },
              ]}
            />
          </Specimen>

          <Specimen label="FeatureCard" options="default · accent · large" className="col-span-3">
            <FeatureCard
              icon={<Rocket className="h-5 w-5" />}
              title="Ship faster"
              description="Compose sections into a complete page in minutes."
            />
          </Specimen>

          <Specimen label="Testimonial" className="col-span-3">
            <TestimonialCard
              testimonial={{
                quote: "Changed the palette and contrast held everywhere.",
                author: "Ayşe Yıldız",
                role: "Founder",
                company: "Lumina",
                rating: 5,
              }}
            />
          </Specimen>

          <Specimen label="Pricing" options="cards · bento · compact" className="col-span-8">
            <Pricing
              option="compact"
              plans={[
                {
                  name: "Starter",
                  monthly: 9,
                  yearly: 90,
                  features: ["1 project", "Community support"],
                  cta: "Get started",
                },
                {
                  name: "Professional",
                  monthly: 29,
                  yearly: 290,
                  highlighted: true,
                  features: ["Unlimited projects", "Priority support", "Advanced analytics"],
                  cta: "Go Pro",
                },
                {
                  name: "Enterprise",
                  monthly: null,
                  yearly: null,
                  features: ["SLA", "SSO & audit log", "Dedicated manager"],
                  cta: "Contact us",
                },
              ]}
            />
          </Specimen>

          <Specimen label="FAQ" options="accordion · split · cards" className="col-span-4">
            <FAQ
              option="accordion"
              items={[
                {
                  question: "How long does setup take?",
                  answer: "Install the package, import styles.css, override a few tokens. About a minute.",
                },
                {
                  question: "Can I use my own fonts?",
                  answer: "Point --font-display and --font-sans at your fonts — no build config needed.",
                },
                {
                  question: "Does it work with Next.js?",
                  answer: "Yes. The build preserves \"use client\" directives so it runs in RSC and SSR.",
                },
              ]}
            />
          </Specimen>

          <Specimen label="BlogCard" options="card · row" className="col-span-6">
            <div className="divide-y divide-border border-t border-border">
              <BlogCard
                option="row"
                post={{
                  title: "Token-based theming",
                  excerpt: "One file to re-skin the whole library, contrast included.",
                  date: "12 Aug 2026",
                  readTime: "5 min",
                  category: "Strategy",
                  author: { name: "Aylin Demir" },
                  accent: "#4f46e5",
                }}
              />
              <BlogCard
                option="row"
                post={{
                  title: "An emoji-free icon system",
                  excerpt: "One 24×24 stroke vocabulary for brand consistency.",
                  date: "28 Jul 2026",
                  readTime: "4 min",
                  category: "Design",
                  author: { name: "Mehmet Can" },
                }}
              />
            </div>
          </Specimen>

          <Specimen label="Prose" options="sm → 2xl" className="col-span-6">
            <Prose size="sm">
              <h2>Writing with tokens</h2>
              <p>
                Headings, lists and code inherit the same palette as every component, so an
                article reads like the rest of the page.
              </p>
              <ul>
                <li>Token-driven colors</li>
                <li>Display + body type scale</li>
              </ul>
            </Prose>
          </Specimen>
        </div>
      </div>
    </div>
  ),
};

const Frame = ({
  label,
  className,
  z = 1,
  children,
}: {
  label: string;
  className?: string;
  z?: number;
  children: React.ReactNode;
}) => (
  <div className={cn("relative overflow-hidden rounded-xl border border-border bg-surface", className)}>
    <span className="pointer-events-none absolute left-2 top-1.5 z-10 rounded-full bg-foreground/[0.06] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </span>
    <div className="pt-6">
      <div style={{ zoom: z, width: "100%" }}>{children}</div>
    </div>
  </div>
);

const boardLogos = [
  { name: "Acme" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Soylent" },
  { name: "Umbrella" },
  { name: "Wayne" },
];

const boardTestimonials = [
  {
    quote: "Hours of layout work dropped to fifteen minutes. I changed the palette and contrast held everywhere.",
    author: "Ayşe Yıldız",
    role: "Founder",
    company: "Lumina",
    rating: 5,
  },
  {
    quote: "We shipped a polished marketing page for our first product in a single evening.",
    author: "Mehmet Demir",
    role: "CTO",
    company: "Nova Labs",
    rating: 5,
  },
  {
    quote: "Without a designer, every brand stays consistent and accessible.",
    author: "Zeynep Kaya",
    role: "Product Manager",
    company: "Vertex",
    rating: 5,
  },
];

const boardPosts = [
  {
    title: "Token-based theming, a contrast-free future",
    excerpt: "Move every design decision into CSS variables and re-skin the library from one file.",
    date: "12 Aug 2026",
    readTime: "5 min",
    category: "Strategy",
    author: { name: "Aylin Demir" },
    accent: "#4f46e5",
  },
  {
    title: "Building an emoji-free icon system",
    excerpt: "A single 24×24 stroke vocabulary for brand consistency across every section.",
    date: "28 Jul 2026",
    readTime: "4 min",
    category: "Design",
    author: { name: "Mehmet Can" },
  },
  {
    title: "Doubling contrast distance in dark mode",
    excerpt: "Dark surfaces blend together; transitions need twice the separation.",
    date: "30 Jun 2026",
    readTime: "6 min",
    category: "Accessibility",
    author: { name: "Ayşe Yıldız" },
    accent: "#0d9488",
  },
];

export const Preview16x9: StoryObj = {
  name: "Preview 16:9",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      data-shot="preview169"
      className="relative h-[900px] w-[1600px] overflow-hidden bg-background px-4 py-3"
    >
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <LandcraftMark />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">Landcraft</span>
          <span className="ml-1 rounded-full bg-primary-soft px-2.5 py-0.5 font-mono text-[11px] font-medium text-primary">
            @ugurdemirel/landcraft
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          React · Tailwind CSS v4 · AA contrast
        </span>
      </div>

      <Frame label="MegaMenu · floating" className="mb-3" z={1.15}>
        <MegaMenu
          variant="floating"
          brand="Acurio"
          sticky={false}
          items={[
            {
              label: "Product",
              badge: "New",
              columns: [
                {
                  title: "Build",
                  links: [
                    { label: "API Platform", description: "REST + GraphQL, type-safe.", href: "#" },
                    { label: "Workflows", description: "Visual automation.", href: "#" },
                    { label: "Integrations", description: "140+ connectors.", href: "#" },
                  ],
                },
                {
                  title: "Explore",
                  links: [
                    { label: "Messaging", description: "Email, SMS and push.", href: "#" },
                    { label: "Analytics", description: "Real-time dashboards.", href: "#" },
                    { label: "Automations", description: "Rules for every event.", href: "#" },
                  ],
                },
              ],
            },
            { label: "Solutions", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Docs", href: "#" },
          ]}
          actions={<Button variant="ghost" size="sm">Log in</Button>}
          cta={
            <Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
              Start for free
            </Button>
          }
        />
      </Frame>

      <div className="grid grid-cols-12 items-start gap-3">
        <div className="col-span-4 space-y-3">
          <Frame label="Pricing · cards" z={0.38}>
            <Pricing
              option="cards"
              plans={[
                {
                  name: "Starter",
                  description: "Small projects",
                  monthly: 9,
                  yearly: 90,
                  features: ["1 project", "5 pages", "Community support"],
                  cta: "Get started",
                },
                {
                  name: "Professional",
                  description: "Growing startups",
                  monthly: 29,
                  yearly: 290,
                  highlighted: true,
                  features: ["Unlimited projects", "Priority support", "Advanced analytics"],
                  cta: "Go Pro",
                },
                {
                  name: "Enterprise",
                  description: "For scale",
                  monthly: null,
                  yearly: null,
                  features: ["SLA", "SSO & audit log", "Dedicated manager"],
                  cta: "Contact us",
                },
              ]}
            />
          </Frame>

          <Frame label="Testimonials · carousel" z={0.48}>
            <Testimonials option="carousel" items={boardTestimonials} />
          </Frame>

          <Frame label="Footer · classic (inverse)" z={0.34}>
            <Footer
              option="classic"
              brand="Acurio"
              description="Ready-made, token-based marketing components for startups."
              columns={[
                {
                  title: "Product",
                  links: [
                    { label: "Features", href: "#" },
                    { label: "Pricing", href: "#" },
                    { label: "Integrations", href: "#" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { label: "About", href: "#" },
                    { label: "Blog", href: "#" },
                    { label: "Careers", href: "#" },
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    { label: "Privacy", href: "#" },
                    { label: "Terms", href: "#" },
                  ],
                },
              ]}
              bottom="Made with @ugurdemirel/landcraft"
            />
          </Frame>
        </div>

        <div className="col-span-4 space-y-3">
          <Frame label="Blog · section card grid 3" z={0.4}>
            <BlogSection
              option="card"
              columns={3}
              limit={3}
              eyebrow="Blog"
              title="Latest posts"
              description="Regular writing on product, design and startups."
              showAllLabel="All posts"
              showAllHref="#"
              posts={boardPosts}
            />
          </Frame>

          <Frame label="Testimonials · marquee" z={0.5}>
            <Testimonials option="marquee" items={boardTestimonials} />
          </Frame>

          <Frame label="FAQ · accordion · multiple open" z={0.5}>
            <FAQ
              option="accordion"
              allowMultiple
              defaultOpen={[0, 1]}
              items={[
                {
                  question: "How long does setup take?",
                  answer: "Install the package, import styles.css, override a few tokens. About a minute.",
                },
                {
                  question: "Can I use my own fonts?",
                  answer: "Point --font-display and --font-sans at your fonts — no build config needed.",
                },
                {
                  question: "Does it work with Next.js?",
                  answer: "Yes. The build preserves \"use client\" directives so it runs in RSC and SSR.",
                },
              ]}
            />
          </Frame>
        </div>

        <div className="col-span-4 space-y-3">
          <Frame label="Badges" z={0.95}>
            <div className="flex flex-wrap items-center gap-2 p-4">
              <Badge variant="soft" size="sm">Soft</Badge>
              <Badge variant="solid" size="sm">Solid</Badge>
              <Badge variant="outline" size="sm">Outline</Badge>
              <Badge variant="dot" size="sm">Dot</Badge>
              <Badge size="sm" icon={<Zap className="h-3.5 w-3.5" />}>With icon</Badge>
              <Badge size="sm" customColor="#059669">customColor</Badge>
              <Badge size="sm" customColor="#eab308">Contrast</Badge>
              <Badge variant="soft">Default</Badge>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="dot">Dot</Badge>
            </div>
          </Frame>

          <Frame label="CTA · panel (gradient)" z={0.45}>
            <CTA
              option="panel"
              title="Ship your next landing page tonight"
              description="One install, one import, and a handful of tokens."
              action={
                <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                  Get started
                </Button>
              }
              secondaryAction={<Button size="sm" variant="outline" className="border-white/25 text-current hover:bg-white/10">See pricing</Button>}
            />
          </Frame>

          <Frame label="LogoCloud · quiet" z={0.72}>
            <LogoCloud option="quiet" title="Teams that trust us" logos={boardLogos} />
          </Frame>

          <Frame label="LogoCloud · marquee" z={0.72}>
            <LogoCloud option="marquee" logos={boardLogos} />
          </Frame>

          <Frame label="LogoCloud · strip" z={0.72}>
            <LogoCloud option="strip" logos={boardLogos.slice(0, 5)} />
          </Frame>
        </div>
      </div>
    </div>
  ),
};
