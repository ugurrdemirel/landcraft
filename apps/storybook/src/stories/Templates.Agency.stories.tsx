import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navbar,
  Hero,
  LogoCloud,
  FeatureGrid,
  Stats,
  Testimonials,
  CTA,
  Footer,
  Button,
  Section,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Star,
  Users,
  Globe,
  Mail,
  Quote,
  Zap,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Agency · Editorial",
  tags: ["autodocs"],
};

export default meta;

const WorkList = () => {
  const works = [
    { no: "01", title: "Meridyen — Fintech brand", year: "2026", service: "Brand + Site" },
    { no: "02", title: "Kanyon — Architecture portfolio", year: "2026", service: "Art direction" },
    { no: "03", title: "Havale — E-commerce scaling", year: "2025", service: "Product + SEO" },
    { no: "04", title: "Papirüs — Subscription platform", year: "2025", service: "Design system" },
  ];
  return (
    <div className="divide-y divide-border border-t border-border">
      {works.map((work) => (
        <a
          key={work.no}
          href="#"
          className="group flex cursor-pointer items-baseline gap-6 py-6 transition-colors duration-150 hover:bg-surface-strong sm:gap-10"
        >
          <span className="w-8 text-sm tabular-nums text-muted-foreground/60">{work.no}</span>
          <span className="flex-1 font-display text-xl font-semibold tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-2 sm:text-3xl">
            {work.title}
          </span>
          <span className="hidden text-sm text-muted-foreground sm:block">{work.service}</span>
          <span className="hidden text-sm tabular-nums text-muted-foreground md:block">{work.year}</span>
          <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-colors duration-200 group-hover:text-foreground" />
        </a>
      ))}
    </div>
  );
};

export const AgencyPage: StoryObj = {
  name: "Agency — Editorial light",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="classic"
        brand="Studio Acurio"
        links={[
          { label: "Work", href: "#" },
          { label: "Services", href: "#" },
          { label: "Studio", href: "#" },
          { label: "Contact", href: "#" },
        ]}
        actions={<Button variant="ghost" size="sm">New project →</Button>}
        cta={<Button size="sm" variant="dark" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>Get in touch</Button>}
      />

      <Hero
        variant="split"
        eyebrow="İstanbul · Worldwide · est. 2020"
        title={
          <>
            We write less.
            <br />
            <span style={{ fontStyle: "italic" }}>We hit harder.</span>
          </>
        }
        description="Digital brand, site, and design system. Big type, little play, plenty of work."
        primaryAction={
          <Button size="lg" variant="dark" iconRight={<ArrowDown className="h-4 w-4" />}>
            See the work
          </Button>
        }
        secondaryAction={
          <Button size="lg" variant="link">
            How we work → <ArrowUpRight className="h-4 w-4" />
          </Button>
        }
        meta={[
          { label: "40+ projects", icon: <Zap className="h-4 w-4" /> },
          { label: "17 countries", icon: <Globe className="h-4 w-4" /> },
          { label: "6 awards", icon: <Star className="h-4 w-4" /> },
        ]}
        media={
          <figure className="group relative overflow-hidden rounded-2xl">
            <div className="aspect-[4/5] w-full bg-surface-strong" />
            <div className="grid h-full w-full place-content-center border border-border bg-surface p-10 text-center">
              <Quote className="mx-auto mb-5 h-8 w-8 text-primary/30" />
              <p className="max-w-xs font-display text-lg font-medium leading-relaxed tracking-tight text-foreground">
                "Good design is invisible; good work is unforgettable."
              </p>
              <figcaption className="mt-4 text-sm text-muted-foreground">— The Acurio manifesto</figcaption>
            </div>
            <figcaption className="mt-3 flex items-center justify-between px-1 text-xs uppercase tracking-wider text-muted-foreground">
              <span>Fig. 01 — Manifesto</span>
              <span>2026</span>
            </figcaption>
          </figure>
        }
      />

      <Section size="sm">
        <LogoCloud option="quiet" title="Brands we've worked with" logos={[{ name: "Mercy" }, { name: "Talkspace" }, { name: "Monzo" }, { name: "Figma" }, { name: "Notion" }]} />
      </Section>

      <Section size="md" eyebrowStyle="caps" eyebrow="Selected work" title="Selected work" align="left">
        <WorkList />
      </Section>

      <Section size="sm">
        <Stats
          option="editorial"
          stats={[
            { value: "6", label: "Design awards", accent: true },
            { value: "48", label: "Product launches" },
            { value: "94%", label: "Repeat work" },
            { value: "26", label: "Industries" },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="caps" eyebrow="Services" title="Four acts" description="A clear framework from strategy to launch." align="left">
        <FeatureGrid
          option="editorialRows"
          features={[
            { title: "Strategy & Positioning", description: "Market research, message architecture, and a differentiation map." },
            { title: "Brand identity", description: "Logo, typography, voice, and visual language." },
            { title: "Product & web design", description: "From landing pages to end-to-end design systems." },
            { title: "Technical launch", description: "Performance-driven development and monthly maintenance." },
          ]}
        />
      </Section>

      <Section size="md" eyebrowStyle="soft" eyebrow="References" title="Our clients speak">
        <Testimonials
          option="carousel"
          items={[
            { quote: "Brand + site in one week. Not a single email was needed during the process.", author: "Nur Uçar", role: "Founder", company: "Mercy", rating: 5 },
            { quote: "Their voice was very clear: they're genuinely good at making less do more.", author: "Emre Aydın", role: "CMO", company: "Papirüs", rating: 5 },
            { quote: "They're better at design systems than Baker.", author: "Kenan Yalçın", role: "CTO", company: "Kanyon", rating: 5 },
          ]}
        />
      </Section>

      <CTA
        option="surface"
        title="Do you have a project?"
        description="The first call is 30 minutes, free, and non-binding."
        action={
          <Button size="lg" variant="dark" iconRight={<ArrowUpRight className="h-4 w-4" />}>
            Contact the studio
          </Button>
        }
        secondaryAction={
          <Button size="lg" variant="link">
            <Mail className="h-4 w-4" /> hello@studioacurio.com
          </Button>
        }
      />

      <Footer
        option="editorial"
        brand="Studio Acurio"
        description="Independent digital studio. Istanbul — Bergamo — online."
        columns={[
          { title: "Index", links: [{ label: "Work", href: "#" }, { label: "Services", href: "#" }, { label: "Studio", href: "#" }, { label: "Journal", href: "#" }] },
          { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "Dribbble", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "X", href: "#" }] },
          { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Cookies", href: "#" }] },
        ]}
        socials={
          <>
            {["IG", "Dr", "Li", "X"].map((label) => (
              <a key={label} href="#" aria-label={`Social ${label}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground">
                {label}
              </a>
            ))}
          </>
        }
        bottom={
          <>
            <span>
              <Users className="mr-1.5 inline h-4 w-4 align-[-0.125em]" /> STUDIO ACURIO
            </span>
          </>
        }
      />
    </div>
  ),
};