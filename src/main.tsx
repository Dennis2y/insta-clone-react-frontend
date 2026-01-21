import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../react-router.config";

const container = document.getElementById("root")!;

if (container.innerHTML === "") {
  createRoot(container).render(<RouterProvider router={router} />);
} else {
  hydrateRoot(container, <RouterProvider router={router} />);
}
