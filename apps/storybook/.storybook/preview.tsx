import React, { useEffect } from "react";
import type { Preview } from "@storybook/react-vite";
// App-level utilities first, core styles LAST so the library's responsive
// rules (md:flex, md:hidden, …) win the cascade.
import "../src/index.css";
import "@ugurdemirel/landcraft/styles.css";
import { palettes, type Palette } from "../src/palettes";

function findPalette(name: string | undefined): Palette {
  return palettes.find((p) => p.name === name) ?? palettes[0];
}

/**
 * Applies the selected palette by setting `--color-*` tokens on <html>.
 * The library reads all colors from those tokens at runtime, and dynamic
 * text colors (gradients, customColor) are recomputed automatically.
 */
const withPalette = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const palette = findPalette(context.globals.theme);

  useEffect(() => {
    const root = document.documentElement;
    const previous: Record<string, string> = {};
    for (const name of Object.keys(palette.properties)) {
      previous[name] = root.style.getPropertyValue(name);
    }
    for (const [name, value] of Object.entries(palette.properties)) {
      root.style.setProperty(name, value);
    }
    return () => {
      for (const [name, value] of Object.entries(previous)) {
        if (value) root.style.setProperty(name, value);
        else root.style.removeProperty(name);
      }
    };
  }, [palette]);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ["Intro", "Components", "Templates"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Color palette (applied at runtime via CSS tokens)",
      toolbar: {
        title: "Palet",
        icon: "paintbrush",
        items: palettes.map((p) => ({ value: p.name, title: p.name })),
        dynamicTitle: true,
      },
      defaultValue: "indigo (default)",
    },
  },
  decorators: [withPalette],
};

export default preview;