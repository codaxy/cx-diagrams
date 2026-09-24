// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import cxjs from "./src/integrations/cxjs";
import llmsTxt from "./src/integrations/llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://diagrams.cxjs.io",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    cxjs(),
    react(),
    mdx(),
    tailwind(),
    llmsTxt({
      title: "CxJS Diagrams",
      description:
        "CxJS Diagrams (cx-diagrams) is a CxJS library for building interactive diagrams — flowcharts, network topologies, org charts — from shapes laid out on a grid and connected with lines.",
      site: "https://diagrams.cxjs.io",
    }),
  ],
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
