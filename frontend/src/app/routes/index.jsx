import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import APIDetailsPage from "@/pages/api-details-page";
import LoginPage from "@/pages/login-page";
import SubmitAPIPage from "@/pages/submit-api-page";
import ProfilePage from "@/pages/profile-page";
import RegisterPage from "@/pages/register-page";
import NotFoundPage from "@/pages/not-found-page";
import ErrorPage from "@/pages/error-page";
import APIsPage from "@/pages/apis-page";
import ProtectedRoute from "@/features/auth/components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "apis",
        element: <APIsPage />,
      },
      {
        path: "apis/:id",
        element: <APIDetailsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "submit-api",
        element: (
          <ProtectedRoute>
            <SubmitAPIPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
