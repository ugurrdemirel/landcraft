import type { Meta, StoryObj } from "@storybook/react";
import {
  Navbar,
  Hero,
  Newsletter,
  LogoCloud,
  Stats,
  Testimonials,
  FAQ,
  Footer,
  Button,
  Section,
  Badge,
  Rocket,
  Users,
  Star,
  Clock,
  Mail,
  Zap,
  Palette,
  ShieldCheck,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Waitlist",
  tags: ["autodocs"],
};

export default meta;

/** A fractal pattern representing the product screen (kept flat to avoid clashing). */
const LaunchCard = () => (
  <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-soft">
    <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
      <Rocket className="h-6 w-6" />
    </span>
    <p className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
      Doors open in 21 days
    </p>
    <div className="mt-6 grid grid-cols-3 gap-3">
      {[
        ["21", "Days"],
        ["14", "Hours"],
        ["32", "Minutes"],
      ].map(([value, unit]) => (
        <div key={unit} className="rounded-xl bg-surface-strong py-4">
          <div className="font-display text-2xl font-semibold tabular-nums text-foreground">{value}</div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{unit}</div>
        </div>
      ))}
    </div>
  </div>
);

const AvatarCluster = () => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2.5">
      {["AK", "SD", "ME", "ZT"].map((initials, i) => (
        <span
          key={initials}
          className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-surface-strong text-[11px] font-bold text-foreground"
          style={{ zIndex: 4 - i }}
        >
          {initials}
        </span>
      ))}
      <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-primary text-[11px] font-bold text-on-primary">
        2K+
      </span>
    </div>
    <div className="text-left">
      <div className="flex items-center gap-1 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5" />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">2,400+ members in line</p>
    </div>
  </div>
);

export const WaitingRoom: StoryObj = {
  name: "Waitlist — Dark statement",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="inverse"
        brand="Acurio"
        links={[
          { label: "Product", href: "#" },
          { label: "Features", href: "#" },
          { label: "FAQ", href: "#" },
        ]}
        cta={<Button size="sm" iconLeft={<Mail className="h-3.5 w-3.5" />}>Join the waitlist</Button>}
      />

      <div className="bg-secondary text-on-secondary">
        <Hero
          variant="statement"
          eyebrow="Coming soon"
          title={
            <>
              Your to-do list.
              <br />
              <span style={{ fontStyle: "italic" }}>With AI.</span>
            </>
          }
          description="The first AI assistant that manages your tasks for you. Early access is open — limited to 1,000 people."
          primaryAction={
            <div className="w-full max-w-md">
              <Newsletter
                option="card"
                buttonLabel="Join the waitlist"
                placeholder="example@email.com"
                note="The list closes once the cap is reached. You can leave anytime."
              />
            </div>
          }
          meta={[
            { label: "2,400+ members", icon: <Users className="h-4 w-4" /> },
            { label: "4.9/5 expectations", icon: <Star className="h-4 w-4" /> },
            { label: "Opens in 21 days", icon: <Clock className="h-4 w-4" /> },
          ]}
        />
      </div>

      <Section size="sm">
        <div className="flex flex-col items-center gap-6">
          <AvatarCluster />
        </div>
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Why wait?" title="One task. One second." description="Define your tasks; let AI write the plan, priorities, and deliverables.">
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: <Zap className="h-5 w-5" />, title: "Zero setup", desc: "Start in minutes. The data structure is ready for you." },
            { icon: <Palette className="h-5 w-5" />, title: "Adapts to you", desc: "Your own colors, your own fields, your own rules." },
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Your data stays yours", desc: "SOC2-compliant infrastructure. Export anytime." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                {f.icon}
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
        <LaunchCard />
      </Section>

      <Section size="sm">
        <Stats
          option="editorial"
          columns={4}
          stats={[
            { value: "2,4K", label: "People in line" },
            { value: "1,000", label: "Early-access slots" },
            { value: "0", label: "We never take money upfront", accent: true },
            { value: "21", label: "Days left" },
          ]}
        />
      </Section>

      <Section size="sm">
        <LogoCloud option="quiet" title="Build partners" logos={[{ name: "Vercel" }, { name: "Supabase" }, { name: "Stripe" }, { name: "Algolia" }, { name: "Resend" }]} />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Early reviews" title="Buzz before the official launch">
        <Testimonials
          option="marquee"
          items={[
            { quote: "When my beta invite arrived, this was the first product I showed around.", author: "Tomas Kepler", role: "Indie Hacker", company: "shipfast", rating: 5 },
            { quote: "It looks set to completely eliminate planning work.", author: "Aylin Demir", role: "PM", company: "Bundan", rating: 5 },
            { quote: "We set up our own flow within an hour.", author: "Omar Haddad", role: "CTO", company: "Rialto" },
            { quote: "Can a UI really be this clean? I can't wait.", author: "Selin Arat", role: "Designer", company: "Forge", rating: 5 },
          ]}
        />
      </Section>

      <Section size="sm">
        <FAQ
          option="accordion"
          items={[
            { question: "Is early access paid?", answer: "No. The first 1,000 people get six months free." },
            { question: "Can I export my data?", answer: "Yes — CSV, JSON, and API export are on by default." },
            { question: "What platforms will it run on?", answer: "Web, iOS, and Android. A macOS desktop app is also coming in the first release." },
            { question: "How do I move up in line?", answer: "Each friend you refer moves you up 5 spots in line." },
          ]}
        />
      </Section>

      <Section size="sm">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Are you as ready as Aylin and friends?
          </p>
          <Badge variant="soft" icon={<Rocket className="h-3.5 w-3.5" />}>Join the waitlist</Badge>
        </div>
      </Section>

      <Footer
        option="minimal"
        brand="Acurio"
        columns={[{ title: "", links: [{ label: "Twitter", href: "#" }, { label: "GitHub", href: "#" }, { label: "Documentation", href: "#" }] }]}
        bottom="© 2026 Acurio"
      />
    </div>
  ),
};

export const CompetitionCountdown: StoryObj = {
  name: "Real counter (demo)",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-md">
      <Newsletter option="card" buttonLabel="Join" placeholder="example@email.com" note="Limited spots. We won't spam you." />
    </div>
  ),
};