import { ContentLayout } from "@components/Layout/ContentLayout";
import AdminPanelLayout from "@components/Layout/Layout";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps extends PropsWithChildren {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">{children}</ContentLayout>
    </AdminPanelLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
