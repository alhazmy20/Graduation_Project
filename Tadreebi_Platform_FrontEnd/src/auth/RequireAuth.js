import React from "react";
import { useAuth } from "./useContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ children,allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }


  const isAuthorized = allowedRoles.includes(auth.user.role);

return (
  isAuthorized
  ? <Outlet/>
  : auth.user ? <Navigate to="/unauthorized" state={{ path: location.pathname }} />
  : <Navigate to="/" state={{ path: location.pathname }}/>
)


  // return children;
}

export default RequireAuth;
