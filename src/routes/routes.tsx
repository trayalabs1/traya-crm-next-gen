import { RouteObject } from "react-router-dom";
import Maker from "@components/CMS/Maker";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Home from "@components/Home/Home";
import Login from "@components/Login/Login";
import NotFound from "@components/NotFound/NotFound";
import { useAuth } from "src/context/useAuth";
import ForgotPasswordPage from "@components/ForgetPassword/ForgetPassword";

const AppRoutesConfig = (): RouteObject[] => {
  const { isAuthenticated } = useAuth();

  return [
    {
      path: "/",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "/cms",
      children: [
        {
          path: "maker",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Maker />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <GuestRoute isAuthenticated={isAuthenticated}>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: "/forget-password",
      element: (
        <GuestRoute isAuthenticated={isAuthenticated}>
          <ForgotPasswordPage />
        </GuestRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
};

export default AppRoutesConfig;
