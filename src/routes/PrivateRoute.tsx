import { ContentLayout } from "@components/Layout/ContentLayout";
import AdminPanelLayout from "@components/Layout/Layout";
import { LOGIN_URL } from "@config/config";
import React, { PropsWithChildren, useEffect } from "react";

interface PrivateRouteProps extends PropsWithChildren {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.replace(LOGIN_URL);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">{children}</ContentLayout>
    </AdminPanelLayout>
  );
};

export default PrivateRoute;
