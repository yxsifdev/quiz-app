import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import InfoPage from "./pages/Info.jsx";
import Games from "@pages/games/Games.jsx";
import FrontEndQuiz from "@pages/games/FrontEndQuiz.jsx";
import BackEndQuiz from "@pages/games/BackEndQuiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/info",
    element: <InfoPage />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/frontend",
    element: <FrontEndQuiz />,
  },
  {
    path: "/games/backend",
    element: <BackEndQuiz />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
