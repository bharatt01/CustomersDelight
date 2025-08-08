import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children, requireSuperadmin = false }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/superadmin-login" />;

  if (requireSuperadmin && user.email !== "bharatsharma@gmail.com") {
    return <Navigate to="/superadmin-login" />;
  }

  return children;
};

export default ProtectedRoute;
