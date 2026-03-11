import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;