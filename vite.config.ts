import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    reactRouter(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [{ src: "public/_redirects", dest: "." }],
    }),
  ],

  // build output for Render
  build: {
    outDir: "build/client",
  },

  // local dev proxy only (ignored on Render)
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000",
      "/uploads": "http://127.0.0.1:3000",
    },
  },
});
