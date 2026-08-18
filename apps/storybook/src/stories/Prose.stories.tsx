import type { Meta, StoryObj } from "@storybook/react";
import { Prose, ProseLead } from "@marketing-ui/core";

const meta = {
  title: "Components/Prose",
  component: Prose,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
    wide: { control: "boolean" },
  },
  args: {
    size: "lg",
  },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogArticle: Story = {
  args: {
    children: (
      <>
        <h1>Rewriting the library for the 4th time this year (and why I don't regret it)</h1>
        <figure>
          <div className="h-56 w-full rounded-xl bg-surface-strong" />
          <figcaption>Caption: the skeleton set — paper, ink, and a single accent.</figcaption>
        </figure>
        <ProseLead>
          Writing landing pages from scratch for every startup was exhausting. In this post
          I explain why I moved to a token-based component kit built around a single
          design language — and why contrast was never an issue.
        </ProseLead>
        <p>
          In the early versions, every project carried a different color, a different
          button style, a different philosophy. The faster we wanted to <a href="#">make it fast</a>, the slower
          we got: the card list was being rediscovered in every repo. The fix was doing
          <strong>design management from outside</strong>: every decision moved into CSS variables.
        </p>
        <blockquote>
          When the theme changes, the text color should follow automatically. Every
          team that tunes contrast by hand eventually ships an unreadable button.
        </blockquote>
        <p>
          To make this work, the <code>getContrastText</code> function reads the
          background's brightness with the WCAG formula and returns the most readable
          foreground color.
        </p>
        <h2>Why only one language?</h2>
        <p>
          More than one language means inconsistency. The whole library follows a single
          grammar:
        </p>
        <ul>
          <li>Paper surface, ink text, a single accent.</li>
          <li>Hairline borders, no aggressive shadows.</li>
          <li>Emoji-free, 24×24 stroke icon vocabulary.</li>
          <li>The same <code>option</code> contract on every component.</li>
        </ul>
        <h3>Code block</h3>
        <pre><code>{`import { Button } from "@marketing-ui/core";
import "@marketing-ui/core/styles.css";

// Single-line theme override:
// --color-primary: 79 70 229;`}</code></pre>
        <p>
          Tables, quotes, and code blocks use the same tokens too — switch
          to a dark palette and even <code>pre</code> blocks adapt automatically.
        </p>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--color-secondary</code></td>
              <td>Ink surfaces</td>
            </tr>
            <tr>
              <td><code>--font-display</code></td>
              <td>Heading font</td>
            </tr>
            <tr>
              <td><code>--radius-xl</code></td>
              <td>Code and input corners</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>
          The result: launching a new startup is just coloring <em>a single file</em>.
          The rest is the library.
        </p>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A complete blog post: lead, headings, quote, code, list, table.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-4xl px-5 py-12">
        <Story />
      </div>
    ),
  ],
};

export const RawHtml: Story = {
  name: "Raw HTML (CMS)",
  args: {
    html: `
      <h2>The <code>html</code> prop for CMS output</h2>
      <p>You can render a string from Markdown or a CMS directly:
      <a href="#">links</a>, <strong>bold</strong> and <em>italic</em> styles are ready.</p>
      <blockquote>Since it uses dangerouslySetInnerHTML, only source content you trust.</blockquote>
      <pre><code>const html = await fetchArticle(id);</code></pre>
    `,
  },
  parameters: {
    layout: "padded",
  },
};