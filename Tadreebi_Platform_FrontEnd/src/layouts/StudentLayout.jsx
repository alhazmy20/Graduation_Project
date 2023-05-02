import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useContext";

const StudentLayout = () => {
  const auth = useAuth();
  const location = useLocation();
//   console.log('location', location);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (auth.user?.role !== "Student") {
    return <Navigate to="/" state={{prevUrl: location.pathname}}/>;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default StudentLayout;
