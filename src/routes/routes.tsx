import { lazy } from "react";
import { RouteObject } from "react-router-dom";
// import Maker from "@components/CMS/Maker";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Home from "@components/Home/Home";
import Login from "@components/Login/Login";
import NotFound from "@components/NotFound/NotFound";
import { useAuth } from "src/context/useAuth";
import ForgotPasswordPage from "@components/ForgetPassword/ForgetPassword";
// import ApprovalLogUI from "@components/CMS/ApprovalLogs";
const SegmentManager = lazy(() => import("@components/CMS/Segment/SegmentManager"));
const ComponentManager = lazy(
  () => import("@components/CMS/Component/ComponentManager"),
);
import CreateContentLayout from "@components/CMS/Content/CreateContentLayout";
import CreateComponentLayout from "@components/CMS/Component/CreateComponentLayout";
import CreateSegmentLayout from "@components/CMS/Segment/CreateSegmentLayout";
import SegmentComponents from "@components/CMS/Segment/SegmentComponents";
import ComponentContents from "@components/CMS/Component/ComponentContents";
const ContentManager = lazy(() => import("@components/CMS/Content/ContentManager"));

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
          path: "segments",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <SegmentManager />
            </PrivateRoute>
          ),
        },
        {
          path: "segments/:id",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreateSegmentLayout />
            </PrivateRoute>
          ),
        },
        {
          path: "segments/:segmentId/components",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <SegmentComponents />
            </PrivateRoute>
          ),
        },
        {
          path: "components",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ComponentManager />
            </PrivateRoute>
          ),
        },
        {
          path: "components/:id",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreateComponentLayout />
            </PrivateRoute>
          ),
        },
        {
          path: "components/:componentId/contents",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ComponentContents />
            </PrivateRoute>
          ),
        },
        {
          path: "contents",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ContentManager />
            </PrivateRoute>
          ),
        },
        {
          path: "contents/:id",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreateContentLayout />
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
