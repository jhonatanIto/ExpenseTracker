import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Error from "./pages/errorPage/Error.jsx";
import CardsProvider from "./pages/contex/CardsContex.jsx";
import Simulation from "./pages/interest-calculator/Simulation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "simulation",
        element: <Simulation />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CardsProvider>
      <RouterProvider router={router} />
    </CardsProvider>
  </StrictMode>
);
