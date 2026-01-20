import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        { src: "public/_redirects", dest: "." }
      ]
    }),
  ],
  build: {
    outDir: "build/client",
  },
});
