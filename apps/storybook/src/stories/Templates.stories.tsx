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
  Play,
  Zap,
  Palette,
  Smartphone,
  ShieldCheck,
  Layers,
  Gauge,
  Star,
  Users,
  Rocket,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Launch · Dark",
  tags: ["autodocs"],
};

export default meta;

/**
 * Composition: combining sections into a single atmospheric launch page.
 * Change the palette and everything (surfaces, buttons, hero, pricing) re-syncs together.
 */
export const LaunchDark: StoryObj = {
  name: "Launch — Inverse",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="inverse"
        brand="Acurio"
        links={[
          { label: "Product", href: "#" },
          { label: "Features", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Testimonials", href: "#" },
          { label: "FAQ", href: "#" },
        ]}
        cta={<Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>Start for free</Button>}
      />

      <div className="bg-secondary text-on-secondary">
        <Hero
          variant="statement"
          eyebrow="Acurio · AI marketing"
          title={
            <>
              Set up your page. <br />
              Go live. <span style={{ fontStyle: "italic", color: "rgb(var(--color-on-secondary))" }}>Scale.</span>
            </>
          }
          description="Hand your landing page worries to the component library. Token-based theming, automatic contrast, zero tech debt."
          primaryAction={
            <Button size="lg" className="bg-surface text-foreground hover:bg-surface-strong" iconRight={<ArrowRight className="h-4 w-4" />}>
              Get started
            </Button>
          }
          secondaryAction={
            <Button size="lg" variant="outline" className="border-white/25 text-current hover:bg-white/10" iconLeft={<Play className="h-4 w-4" />}>
              Watch demo
            </Button>
          }
          meta={[
            { label: "4.9/5 rating", icon: <Star className="h-4 w-4" /> },
            { label: "12K+ users", icon: <Users className="h-4 w-4" /> },
            { label: "60s setup", icon: <Rocket className="h-4 w-4" /> },
          ]}
        />
      </div>

      <Section size="sm">
        <LogoCloud option="marquee" title="Teams that trust us" logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Soylent" }, { name: "Umbrella" }, { name: "Wayne" }]} />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Features" title="What it's for" description="Ship in seconds with section templates.">
        <FeatureGrid
          option="bento"
          features={[
            { icon: <Zap className="h-5 w-5" />, title: "Lightning-fast setup", description: "Zero config. Build, deploy, done. It won't take you half an hour to go live." },
            { icon: <Palette className="h-5 w-5" />, title: "Token-based theming", description: "Change colors from one place; text, surfaces, and accents update together." },
            { icon: <Smartphone className="h-5 w-5" />, title: "Mobile-first", description: "Flawless from 375px to 4K screens." },
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Accessible", description: "ARIA, focus rings, and WCAG contrast on by default." },
            { icon: <Layers className="h-5 w-5" />, title: "Composable", description: "Build new pages by copy-pasting sections." },
            { icon: <Gauge className="h-5 w-5" />, title: "Conversion-focused", description: "Every section has a CTA hierarchy." },
          ]}
        />
      </Section>

      <Section size="sm">
        <Stats option="cells" stats={[{ value: "12K+", label: "Active users" }, { value: "98%", label: "Satisfaction" }, { value: "4.9", label: "Average rating", accent: true }, { value: "24/7", label: "Support" }]} />
      </Section>

      <Section size="md" eyebrowStyle="caps" eyebrow="Pricing" title="Plans for every size" description="No credit card required. Cancel anytime.">
        <Pricing
          option="cards"
          plans={[
            { name: "Starter", description: "Small projects", monthly: 9, yearly: 90, features: ["1 project", "5 pages", "Community support", "Basic analytics"], cta: "Get started" },
            { name: "Professional", description: "Growing startups", monthly: 29, yearly: 290, highlighted: true, features: ["Unlimited projects", "Unlimited pages", "Priority support", "Advanced analytics", "API access"], cta: "Go Professional" },
            { name: "Enterprise", description: "For scale", monthly: null, yearly: null, features: ["SLA", "Custom integrations", "Dedicated account manager"], cta: "Contact us" },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Testimonials" title="What the team says" >
        <Testimonials
          option="grid"
          items={[
            { quote: "Hours of work dropped to 15 minutes. I changed the colors and contrast held.", author: "Ayşe Yıldız", role: "Founder", company: "Lumina", rating: 5 },
            { quote: "We had a ready marketing page up for our first product in one evening.", author: "Mehmet Demir", role: "CTO", company: "Nova Labs", rating: 5 },
            { quote: "Without a designer, we keep every brand consistent and accessible.", author: "Zeynep Kaya", role: "Product Manager", company: "Vertex" },
          ]}
        />
      </Section>

      <Section size="sm">
        <FAQ
          option="split"
          eyebrow="FAQ"
          title="Common questions"
          description="If you can't find what you're looking for, the support team is always here."
          items={[
            { question: "How long does setup take?", answer: "`pnpm add` + importing styles.css + a one-line token override. About 60 seconds on average." },
            { question: "Will I run into contrast problems?", answer: "No, thanks to matched token pairs and runtime luminance calculation." },
            { question: "Guide: can I use custom fonts?", answer: "Point the `--font-display` and `--font-sans` variables at your own fonts." },
          ]}
        />
      </Section>

      <section>
        <CTA
          option="inverse"
          title="Live by tomorrow"
          description="14 days free. No credit card required."
          action={
            <Button size="lg" className="bg-surface text-foreground hover:bg-surface-strong" iconRight={<ArrowRight className="h-4 w-4" />}>
              Get started
            </Button>
          }
          secondaryAction={
            <Button variant="outline" className="border-white/25 text-current hover:bg-white/10">
              See pricing
            </Button>
          }
        />
      </section>

      <Footer
        option="classic"
        brand="Acurio"
        description="Ready-made, token-based marketing components for startups."
        columns={[
          { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }, { label: "Integrations", href: "#" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }] },
          { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
        ]}
        bottom="Made with @ugurdemirel/landcraft"
      />
    </div>
  ),
};