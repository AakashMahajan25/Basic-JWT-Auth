import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/store";

interface ProtectedRoutePropsInterface {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRoutePropsInterface> = ({
  children,
}) => {
  const { user } = useAuthStore();

  if (!user || !user.accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
