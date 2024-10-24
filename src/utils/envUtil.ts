import { VITE_APP_ENV } from "@config/config";

type Environment = "development" | "production";

export const getEnvironment = (): Environment => {
  if (import.meta.env.DEV) {
    return "development";
  }

  if (
    import.meta.env.VITE_APP_ENV === "development" ||
    VITE_APP_ENV === "development"
  ) {
    return "development";
  }

  return "production";
};

export const isDevelopment = () => getEnvironment() === "development";
export const isProduction = () => getEnvironment() === "production";
