import { lazy } from "react";

const Maker = lazy(() => import("./Maker"));

const CmsConfig = {
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
  auth: null,
  routes: [
    {
      path: "sign-out",
      element: Maker,
    },
  ],
};

export default CmsConfig;
