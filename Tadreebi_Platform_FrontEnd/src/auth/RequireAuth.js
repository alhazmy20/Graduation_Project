import React from "react";
import { useAuth } from "./useContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    if(window.location.pathname === "/admin")
    return <Navigate to="/admin/login" state={{path: location}} replace/>
    else return <Navigate to="/login"  state={{ path: location}} replace/>;
  }


  const isAuthorized = allowedRoles.includes(auth?.user?.role);

return (
  isAuthorized
  ? <Outlet/>
  : auth.user ? <Navigate to="/unauthorized" state={{ path: location}} replace/>
  : <Navigate to="/" state={{ path: location }} replace/>
)


  // return children;
}

export default RequireAuth;
