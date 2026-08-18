import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navbar,
  Button,
  Prose,
  ProseLead,
  CTA,
  Footer,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Star,
} from "@ugurdemirel/landcraft";

const meta: Meta = {
  title: "Templates/Article",
  tags: ["autodocs"],
};

export default meta;

const metaRow = [
  { label: "5 min read", icon: <Clock className="h-4 w-4" /> },
  { label: "August 3, 2026", icon: undefined },
  { label: "4.8/5", icon: <Star className="h-4 w-4" /> },
];

export const ArticlePage: StoryObj = {
  name: "Article — Blog post",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div>
      <Navbar
        variant="classic"
        brand="Acurio"
        links={[
          { label: "Product", href: "#" },
          { label: "Features", href: "#" },
          { label: "Blog", href: "#" },
        ]}
        actions={<Button variant="ghost" size="sm">Search</Button>}
        cta={<Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>Start for free</Button>}
      />

      <section>
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Strategy · 2026</p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
              Token-based theming, a contrast-free future
            </h1>
            <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-border pt-5">
              {metaRow.map((m) => (
                <li key={m.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {m.icon ? <span className="text-foreground/35">{m.icon}</span> : null}
                  {m.label}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                By: <strong className="font-medium text-foreground">Aylin Demir</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Prose className="mx-auto">
            <ProseLead>
              Writing landing pages from scratch for every startup was exhausting. On the
              second project came a new button style, on the third a new hero… Design never
              felt "done." The fix was moving every decision into a single
              externally managed system.
            </ProseLead>
            <h2>The problem: every project its own universe</h2>
            <p>
              Colors, fonts, corner radii... everything was being carried over with a
              <strong>copy-edit</strong>{""}{" "}
              approach. After a while, no one could say which version was "current." A
              token-based library reduced that clutter to a single set of variables:
              <code>--color-primary</code> changes and everything follows.
            </p>
            <blockquote>
              Contrast isn't a feature bolted onto a button; it's a contract between
              surface and text that lives together.
            </blockquote>
            <h3>Automatic text for dynamic surfaces</h3>
            <p>
              Some surfaces don't come from a token — a <code>customColor</code> prop,
              a gradient CTA panel, a highlighted pricing card. For these cases the
              library reads the background's <em>brightness</em> and picks the most readable
              foreground color with the WCAG formula:
            </p>
            <pre><code>{`getContrastText("#eab308");
// → dark: #111111 (high-luminance surface)*`}</code></pre>
            <p>
              So whether the theme is light or dark, you never have to adjust text by hand.
              Setting up a new project is as simple as importing a <a href="#">styles.css</a> and writing
              a few tokens.
            </p>
            <h2>What about component bloat?</h2>
            <p>
              Big libraries can get bloated. Our answer is the <em>options</em> contract:
              every component offers 2–4 visual variants, all using the same grammar.
              Choosing a <a href="#">hero as <code>statement</code></a> in one project and{" "}
              <code>split</code> in another doesn't mean the design falls apart.
            </p>
            <ul>
              <li>Paper surface, ink text, a single accent.</li>
              <li>Hairline borders; shadows only when needed.</li>
              <li>Emoji-free, 24×24 stroke icons.</li>
              <li>The same <code>option</code> contract on every component.</li>
            </ul>
            <figure>
              <div className="h-56 w-full rounded-xl bg-surface-strong" />
              <figcaption>Figure 1 — A comparison showing the single grammar across options.</figcaption>
            </figure>
            <p>
              Every heading you'll find, like this section itself, is a real piece of content.
              <a href="#">Six months from now</a> we'll still be writing this page with this library.
            </p>
          </Prose>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
                AD
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Aylin Demir</p>
                <p className="text-xs text-muted-foreground">Product + design · set up in 60s</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Aylin is a product founder who builds tools for founders. On this blog
              she writes about shipping speed and design discipline.
            </p>
          </div>
        </div>
      </section>

      <CTA
        option="surface"
        title="The next post is yours."
        description="Try the library that produces these articles — free for 14 days."
        action={
          <Button size="lg" variant="dark" iconRight={<ArrowRight className="h-4 w-4" />}>
            Try for free
          </Button>
        }
        secondaryAction={<Button size="lg" variant="outline">All posts</Button>}
      />

      <Footer
        option="minimal"
        brand="Acurio"
        columns={[
          { title: "", links: [{ label: "Blog", href: "#" }, { label: "Documentation", href: "#" }, { label: "Release notes", href: "#" }] },
        ]}
        bottom="© 2026 Acurio"
      />
    </div>
  ),
};