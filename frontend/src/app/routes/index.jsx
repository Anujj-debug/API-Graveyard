import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import APIDetailsPage from "@/pages/api-details-page";
import LoginPage from "@/pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "apis/:id",
        element: <APIDetailsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
