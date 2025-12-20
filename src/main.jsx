import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Calculator from "./pages/interest-calculator/Calculator.jsx";
import Error from "./pages/errorPage/Error.jsx";
import CardsProvider from "./pages/contex/CardsContex.jsx";

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
        path: "calculator",
        element: <Calculator />,
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
