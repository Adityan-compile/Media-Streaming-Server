import { Navigate } from "react-router-dom";

export const RouteGuard = ({ children, user }) => {
  if (user.authenticated === true) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const AuthGuard = ({ children, user }) => {
  if (user.authenticated === true) {
    return <Navigate to={"/dashboard"} />;
  }
  return children;
};
