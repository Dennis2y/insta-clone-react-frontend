import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "../react-router.config";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!)
  .render(<RouterProvider router={router} />);
