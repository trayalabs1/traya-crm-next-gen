import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface GuestRouteProps extends PropsWithChildren {
  isAuthenticated: boolean;
}

const GuestRoute: React.FC<GuestRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default GuestRoute;
