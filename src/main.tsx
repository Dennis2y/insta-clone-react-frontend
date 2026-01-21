import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "../react-router.config";

const router = createBrowserRouter(routes as any);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(<RouterProvider router={router} />);
