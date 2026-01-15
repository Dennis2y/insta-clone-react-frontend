import axios from "axios";

// React Router loaders run on the server (Node) during dev/SSR,
// so we must use an absolute URL there.
// In the browser we can use Vite's proxy via "/api".
const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: isServer ? "http://127.0.0.1:3000" : "/api",
});
