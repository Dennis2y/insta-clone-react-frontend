/**
 * Axios client used by React Router loaders + browser.
 *
 * IMPORTANT:
 * - React Router loaders can run server-side in dev.
 * - Therefore baseURL MUST be absolute.
 * - Backend API is served at: http://127.0.0.1:3000/api
 *
 * Usage:
 *   api.get("/reels/grid")  -> http://127.0.0.1:3000/api/reels/grid
 *   api.get("/tagged/grid") -> http://127.0.0.1:3000/api/tagged/grid
 */

import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  headers: { Accept: "application/json" },
});
