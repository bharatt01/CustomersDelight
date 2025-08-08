// components/BlogAdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const BlogAdminProtectedRoute = ({ children }) => {
  const isBlogAdmin = localStorage.getItem("blogAdmin") === "true";
  return isBlogAdmin ? children : <Navigate to="/blog-admin/login" />;
};

export default BlogAdminProtectedRoute;

