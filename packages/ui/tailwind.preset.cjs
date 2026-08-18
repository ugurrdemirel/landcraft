/**
 * Tailwind preset for @ugurdemirel/landcraft.
 *
 * Every design decision (color, type, radius, shadow) is driven by CSS custom
 * properties so consumers can re-skin the whole library from outside without
 * touching a single component.
 *
 * Colors store space-separated RGB channels so Tailwind's `<alpha-value>`
 * opacity syntax keeps working (e.g. `text-primary/60`).
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--color-primary-hover) / <alpha-value>)",
        "primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",
        "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-hover": "rgb(var(--color-secondary-hover) / <alpha-value>)",
        "on-secondary": "rgb(var(--color-on-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "on-accent": "rgb(var(--color-on-accent) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "muted-foreground": "rgb(var(--color-muted-foreground) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-strong": "rgb(var(--color-surface-strong) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        "danger-soft": "rgb(var(--color-danger-soft) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "9999px",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        raised: "var(--shadow-raised)",
        overlay: "var(--shadow-overlay)",
      },
      borderColor: {
        DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
      },
      ringColor: {
        DEFAULT: "rgb(var(--color-ring) / <alpha-value>)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--color-foreground))",
            "--tw-prose-headings": "rgb(var(--color-foreground))",
            "--tw-prose-lead": "rgb(var(--color-muted-foreground))",
            "--tw-prose-links": "rgb(var(--color-primary))",
            "--tw-prose-bold": "rgb(var(--color-foreground))",
            "--tw-prose-counters": "rgb(var(--color-muted-foreground))",
            "--tw-prose-bullets": "rgb(var(--color-muted-foreground))",
            "--tw-prose-hr": "rgb(var(--color-border))",
            "--tw-prose-quotes": "rgb(var(--color-foreground))",
            "--tw-prose-quote-borders": "rgb(var(--color-primary))",
            "--tw-prose-captions": "rgb(var(--color-muted-foreground))",
            "--tw-prose-code": "rgb(var(--color-foreground))",
            "--tw-prose-pre-code": "rgb(var(--color-on-secondary))",
            "--tw-prose-pre-bg": "rgb(var(--color-secondary))",
            "--tw-prose-th-borders": "rgb(var(--color-border))",
            "--tw-prose-td-borders": "rgb(var(--color-border))",
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "var(--font-display)",
              fontWeight: "600",
              letterSpacing: "-0.02em",
            },
            a: {
              textDecorationThickness: "1px",
              textUnderlineOffset: "3px",
              fontWeight: "500",
            },
            blockquote: {
              fontStyle: "normal",
            },
            "figure figcaption": {
              fontStyle: "normal",
            },
            "pre": {
              border: "1px solid rgb(var(--color-border))",
              borderRadius: "var(--radius-xl)",
              backgroundColor: "rgb(var(--color-secondary))",
              color: "rgb(var(--color-on-secondary))",
            },
            code: {
              backgroundColor: "rgb(var(--color-surface-strong))",
              borderRadius: "var(--radius-md)",
              padding: "0.125rem 0.3125rem",
              fontWeight: "500",
              "&::before, &::after": {
                content: "none",
              },
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};