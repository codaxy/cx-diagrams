// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import cxjs from "./src/integrations/cxjs";

// https://astro.build/config
export default defineConfig({
  integrations: [cxjs(), react(), mdx(), tailwind()],
  prefetch: {
    defaultStrategy: "hover",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },
  vite: {
    esbuild: {
      loader: "tsx",
      include: /.*\.(js|tsx)$/,
      jsx: "automatic",
      jsxImportSource: "cx",
    },
    optimizeDeps: {
      include: ["route-parser", "cx-react"],
      exclude: ["cx", "cx-diagrams"],
      esbuildOptions: {
        loader: {
          ".js": "jsx",
          ".tsx": "tsx",
        },
        jsx: "automatic",
        jsxImportSource: "cx",
      },
    },
    ssr: {
      external: ["route-parser"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: [
            "legacy-js-api",
            "import",
            "global-builtin",
            "slash-div",
          ],
        },
      },
    },
    build: {
      rollupOptions: {
        output: { manualChunks: undefined }, // merge all JS/CSS
      },
    },
  },
});
