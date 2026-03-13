import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Error from "./pages/errorPage/Error.jsx";
import CardsProvider from "./pages/contex/CardsContex.jsx";
import Simulation from "./pages/interest-calculator/Simulation.jsx";
import Converter from "./pages/converter/Converter.jsx";
import Login from "./pages/loginPage/Login.jsx";
import UserProvider from "./pages/contex/UserContext.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "converter",
            element: <Converter />,
          },
        ],
      },
      {
        path: "simulation",
        element: <Simulation />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <CardsProvider>
          <RouterProvider router={router} />
        </CardsProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
