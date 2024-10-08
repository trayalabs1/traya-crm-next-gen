import { lazy } from "react";
import { useAuth } from "src/context/useAuth";
import { RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Login from "@components/Login/Login";
import NotFound from "@components/NotFound/NotFound";
import ForgotPasswordPage from "@components/ForgetPassword/ForgetPassword";
import OtpVerification from "@components/Login/OTPVerification";
const SegmentManager = lazy(
  () => import("@components/CMS/Segment/SegmentManager"),
);
const ComponentManager = lazy(
  () => import("@components/CMS/Component/ComponentManager"),
);
const CreateContentLayout = lazy(
  () => import("@components/CMS/Content/CreateContentLayout"),
);
const CreateComponentLayout = lazy(
  () => import("@components/CMS/Component/CreateComponentLayout"),
);
const CreateSegmentLayout = lazy(
  () => import("@components/CMS/Segment/CreateSegmentLayout"),
);
const SegmentComponents = lazy(
  () => import("@components/CMS/Segment/SegmentComponents"),
);
const ComponentContents = lazy(
  () => import("@components/CMS/Component/ComponentContents"),
);
const RenderComponents = lazy(
  () => import("@components/MobileLayout/RenderMobileComponents"),
);
const AccountPage = lazy(() => import("@components/Account/Account"));
const Users = lazy(() => import("@components/Users/Users"));
const UserForm = lazy(() => import("@components/Users/UserForm"));
const MediaManager = lazy(
  () => import("@components/CMS/MediaManager/MediaManager"),
);
const ContentManager = lazy(
  () => import("@components/CMS/Content/ContentManager"),
);
const MediaCreate = lazy(
  () => import("@components/CMS/MediaManager/MediaCreate"),
);

const AppRoutesConfig = (): RouteObject[] => {
  const { isAuthenticated } = useAuth();

  return [
    {
      path: "/",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <RenderComponents />
        </PrivateRoute>
      ),
    },
    {
      path: "/account",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <AccountPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/users",
      children: [
        {
          index: true,
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Users />
            </PrivateRoute>
          ),
        },
        {
          path: ":type",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserForm />
            </PrivateRoute>
          ),
        },
      ],
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
      path: "/media-manager",
      children: [
        {
          index: true,
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MediaManager />
            </PrivateRoute>
          ),
        },
        {
          path: "create",
          element: (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MediaCreate />
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
      path: "/verify-account",
      element: (
        <GuestRoute isAuthenticated={isAuthenticated}>
          <OtpVerification />
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
