import authRoles from "src/auth/authRoles";
import SignInPage from "./SignInPage";

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        footer: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "sign-in",
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
