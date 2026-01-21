import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../react-router.config";

const root = document.getElementById("root")!;
createRoot(root).render(<RouterProvider router={router} />);
