import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

function preserveClientDirectives(): Plugin {
  const clientModules = new Set<string>();
  return {
    name: "landcraft:preserve-client-directives",
    transform(code, id) {
      if (/^\s*["']use client["']/.test(code)) {
        clientModules.add(id);
      }
      return null;
    },
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk.type !== "chunk") continue;
        if (chunk.facadeModuleId && clientModules.has(chunk.facadeModuleId)) {
          chunk.code = `"use client";\n${chunk.code}`;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    preserveClientDirectives(),
    dts({
      include: ["src"],
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
    },
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: [
        {
          format: "es",
          dir: "dist/es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          assetFileNames: "index.css",
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          exports: "named",
        },
      ],
    },
  },
});
