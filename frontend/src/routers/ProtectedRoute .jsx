// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user doesn't have the required role, redirect to the home page (or any other page)
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the child component
  return children;
};

// Ensure this is exported as default
export default ProtectedRoute;
