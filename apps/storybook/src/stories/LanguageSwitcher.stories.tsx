import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageSwitcher, Navbar, Footer, Button } from "@ugurdemirel/landcraft";

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

const meta = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  argTypes: {
    option: { control: "radio", options: ["dropdown", "modal"] },
    align: { control: "radio", options: ["start", "end"] },
    inverse: { control: "boolean" },
  },
  args: {
    languages,
    defaultValue: "tr",
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Globe trigger with a dropdown list — the navbar favorite. */
export const Dropdown: Story = {
  args: { defaultValue: "tr" },
  decorators: [
    (Story) => (
      <div className="flex min-h-[14rem] justify-end p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "A globe + current-language trigger opening a bordered listbox with a check on the active language.",
      },
    },
  },
};

/** Dark-surface adaptation for the inverse Navbar / classic Footer. */
export const Inverse: Story = {
  args: { inverse: true },
  decorators: [
    (Story) => (
      <div className="flex min-h-[16rem] justify-end bg-[#101010] p-6">
        <Story />
      </div>
    ),
  ],
};

/** Same trigger, but opens a full dialog through the Modal component. */
export const ModalOption: Story = {
  name: "Option 2 · Modal",
  args: { option: "modal", modalTitle: "Select language" },
  parameters: {
    docs: {
      description: {
        story:
          "The same compact trigger now opens a `Modal` dialog listing the languages as full-width rows. Pass `modalTitle` to show a heading.",
      },
    },
  },
};

/** Flags from the language codes instead of the globe icon. */
export const Flags: Story = {
  name: "Flags (showFlag)",
  args: { showFlag: true },
  parameters: {
    docs: {
      description: {
        story:
          "The globe icon is swapped for the active language's flag emoji; every option also shows its flag on the left.",
      },
    },
  },
};

const links = [
  { label: "Product", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQ", href: "#" },
];

/** Floating nav with the switcher on the right — classic/light. */
export const InNavbar: Story = {
  name: "In Navbar",
  render: () => (
    <div className="min-h-[20rem]">
      <Navbar
        brand="Acurio"
        links={links}
languageSwitcher={<LanguageSwitcher languages={languages} />}
        cta={
          <Button size="sm">
            Start for free
          </Button>
        }
      />
    </div>
  ),
};

/** Inverse (dark) navbar — pass `inverse` so the trigger picks up dark-surface colors. */
export const InInverseNavbar: Story = {
  name: "In Navbar (inverse)",
  render: () => (
    <div className="min-h-[22rem]">
      <Navbar
        variant="inverse"
        brand="Acurio"
        links={links}
languageSwitcher={<LanguageSwitcher languages={languages} inverse />}
        cta={
          <Button size="sm">
            Start for free
          </Button>
        }
      />
    </div>
  ),
};

/** Classic (dark) footer with the switcher in its bottom bar. */
export const InClassicFooter: Story = {
  name: "In Footer (classic)",
  render: () => (
    <Footer
      brand="Acurio"
      description="Ready-made, token-based, accessible marketing components for startups."
      columns={[
        { title: "Product", links: links },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Contact", href: "#" }] },
        { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
      ]}
      bottom="© 2026 Acurio"
      languageSwitcher={<LanguageSwitcher languages={languages} inverse />}
    />
  ),
};

/** Minimal (light) footer with the switcher in its bottom bar. */
export const InMinimalFooter: Story = {
  name: "In Footer (minimal)",
  render: () => (
    <Footer
      option="minimal"
      brand="Acurio"
      columns={[{ title: "Product", links: links }]}
      bottom="© 2026 Acurio"
      languageSwitcher={<LanguageSwitcher languages={languages} />}
    />
  ),
};