import type { Meta, StoryObj } from "@storybook/react";
import {
  Navbar,
  Hero,
  LogoCloud,
  FeatureGrid,
  Stats,
  Pricing,
  Testimonials,
  CTA,
  Footer,
  Button,
  Section,
  ArrowRight,
  Play,
  Zap,
  ShieldCheck,
  Layers,
  Gauge,
  Globe,
  Lock,
  Database,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Enterprise SaaS",
  tags: ["autodocs"],
};

export default meta;

const ProductWindow = () => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-raised">
    <div className="flex items-center gap-1.5 px-3 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="ml-3 text-xs text-muted-foreground">app.acurio.com/dashboard</span>
    </div>
    <div className="grid aspect-[16/10] place-items-center rounded-xl bg-surface-strong">
      <div className="grid w-full max-w-xs grid-cols-3 gap-3 p-6">
        {[6, 4, 5, 3, 4, 2, 5, 3, 6].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h * 8}px` }}
            className={i % 3 === 1 ? "rounded-t-lg bg-primary/70" : "rounded-t-lg bg-foreground/15"}
          />
        ))}
      </div>
    </div>
  </div>
);

export const EnterpriseSaaS: StoryObj = {
  name: "Enterprise SaaS — Light",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="floating"
        brand="Acurio"
        links={[
          { label: "Product", href: "#" },
          { label: "Features", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Enterprise", href: "#" },
          { label: "FAQ", href: "#" },
        ]}
        actions={<Button variant="ghost" size="sm">Log in</Button>}
        cta={<Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>Request demo</Button>}
      />

      <div className="pt-8">
        <Hero
          variant="split"
          eyebrow="SSO · SLA · Custom integrations"
          title={
            <>
              Analytics that fit your <br className="hidden sm:block" />
              <span className="text-primary">enterprise infrastructure.</span>
            </>
          }
          description="Acurio keeps your data in your own infrastructure, connects to your identity provider, and handles your team's external data agreements."
          primaryAction={
            <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Request a demo
            </Button>
          }
          secondaryAction={
            <Button size="lg" variant="outline" iconLeft={<Play className="h-4 w-4" />}>
              Product tour (4 min)
            </Button>
          }
          meta={[
            { label: "SOC2 Type 2", icon: <ShieldCheck className="h-4 w-4" /> },
            { label: "GDPR compliant", icon: <Globe className="h-4 w-4" /> },
            { label: "99.99% SLA", icon: <Gauge className="h-4 w-4" /> },
          ]}
          media={<ProductWindow />}
        />
      </div>

      <Section size="sm">
        <LogoCloud option="marquee" title="These companies trust us" logos={[{ name: "IBM" }, { name: "Mercedes" }, { name: "Nike" }, { name: "Sony" }, { name: "Siemens" }, { name: "Vodafone" }]} />
      </Section>

      <Section
        size="md"
        eyebrowStyle="soft"
        eyebrow="Platform"
        title="One infrastructure, all operations"
        description="Data pipelines, authentication, and access management in one panel."
      >
        <FeatureGrid
          option="bento"
          features={[
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Enterprise security", description: "SOC2, SSO/SAML, and granular role-based access control out of the box." },
            { icon: <Database className="h-5 w-5" />, title: "Data sovereignty", description: "Keep your data in your own region, in your own VPC." },
            { icon: <Layers className="h-5 w-5" />, title: "Integrations", description: "Ready-made connections to 100+ systems: Salesforce, Slack, SAP, Snowflake." },
            { icon: <Lock className="h-5 w-5" />, title: "Audit logs", description: "A traceable, exportable record of every action." },
            { icon: <Zap className="h-5 w-5" />, title: "Automation", description: "Automate approval flows and notifications with the rules engine." },
            { icon: <Gauge className="h-5 w-5" />, title: "Performance", description: "Low latency and high availability over a global edge network." },
          ]}
        />
      </Section>

      <Section size="sm">
        <Stats
          option="editorial"
          stats={[
            { value: "$2.4M/mo", label: "Average customer savings" },
            { value: "4.2x", label: "Transaction speedup" },
            { value: "98.4%", label: "Compliance rate" },
            { value: "100+", label: "Integrations" },
            { value: "12.000", label: "Enterprise users", accent: true },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="caps" eyebrow="Pricing" title="Start, then scale" description="Start small and grow with your procurement process.">
        <Pricing
          option="cards"
          plans={[
            { name: "Team", description: "Small teams", monthly: 39, yearly: 390, features: ["5 users", "Basic analytics", "Email support"], cta: "Get started" },
            { name: "Business", description: "Growing organizations", monthly: 99, yearly: 990, highlighted: true, features: ["25 users", "Advanced analytics", "SSO", "Priority support", "API"], cta: "Try for free" },
            { name: "Enterprise", description: "Full control", monthly: null, yearly: null, features: ["Unlimited users", "VPC / private cloud", "Dedicated engineer", "SLA"], cta: "Contact sales" },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="Customers" title="The choice of enterprise teams">
        <Testimonials
          option="grid"
          items={[
            { quote: "We never experienced any downtime during migration. SSO and audit logs moved our audit up a week.", author: "Lena Fischer", role: "CISO", company: "Mercedes Digital", rating: 5 },
            { quote: "Our teams in every region see the same data under the same security rules. Very easy to manage.", author: "Kenji Sato", role: "CTO", company: "Sony Cloud", rating: 5 },
            { quote: "The integration catalog is a real timesaver. We connected 30 systems in the first month.", author: "Sofia Rossi", role: "Data Lead", company: "Vodafone Analytics" },
          ]}
        />
      </Section>

      <CTA
        option="panel"
        title="Schedule an enterprise demo"
        description="A private 30-minute session with our engineers. A sample scenario for your infrastructure."
        action={
          <Button size="lg" style={{ backgroundColor: "rgb(var(--color-on-primary))", borderColor: "rgb(var(--color-on-primary))", color: "rgb(var(--color-primary))" }} iconRight={<ArrowRight className="h-4 w-4" />}>
            Request demo
          </Button>
        }
        secondaryAction={
          <Button variant="outline" className="border-white/30 text-current hover:bg-white/10">
            Technical docs
          </Button>
        }
      />

      <Footer
        option="editorial"
        brand="Acurio"
        description="A compliant, scalable, and secure analytics platform for enterprise teams."
        columns={[
          { title: "Product", links: [{ label: "Analytics", href: "#" }, { label: "Integrations", href: "#" }, { label: "Security", href: "#" }, { label: "Pricing", href: "#" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }, { label: "Press", href: "#" }] },
          { title: "Resources", links: [{ label: "Documentation", href: "#" }, { label: "Status", href: "#" }, { label: "Community", href: "#" }] },
        ]}
        socials={
          <>
            {["X", "in", "gh"].map((label) => (
              <a key={label} href="#" aria-label={`Social ${label}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground">
                {label}
              </a>
            ))}
          </>
        }
        bottom="Made with @ugurdemirel/landcraft"
      />
    </div>
  ),
};

export const EnterpriseMetrics: StoryObj = {
  name: "KPI band (subsection)",
  parameters: { layout: "padded" },
  render: () => (
    <div>
      <Section size="sm" eyebrowStyle="caps" eyebrow="Dashboard preview" title="Live metrics">
        <Stats
          option="cells"
          stats={[
            { value: "1.4M", label: "Daily events", accent: true },
            { value: "212ms", label: "P95 latency" },
            { value: "99.99%", label: "Uptime" },
            { value: "38", label: "Connected systems" },
          ]}
        />
      </Section>
      <Section size="sm">
        <Testimonials
          option="carousel"
          items={[
            { quote: "Managing a three-region deployment from one console used to be a weekly job. Now it's the default.", author: "Lena Fischer", role: "CISO", company: "Mercedes Digital", rating: 5 },
            { quote: "Auditing has always been easy: logs, reports, all complete.", author: "Kenji Sato", role: "CTO", company: "Sony Cloud" },
            { quote: "We track our SLA commitments in real time on the dashboard.", author: "Sofia Rossi", role: "Data Lead", company: "Vodafone Analytics" },
          ]}
        />
      </Section>
    </div>
  ),
};