import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite config for React Router Dev.
 * Keep ONE default export only.
 *
 * We do NOT rely on a Vite proxy because our axios baseURL is absolute:
 *   http://127.0.0.1:3000/api
 */
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
});
