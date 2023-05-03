import React from 'react'
import { useAuth } from '../auth/useContext';
import { Navigate, Outlet } from 'react-router-dom';

const InstitutionLayout = () => {
    const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  
  if (auth.user?.role !== "Institution") {
    return <Navigate to="/" />;
  }
  
  return (
    <div>
    <Outlet />
    </div>
  )
}

export default InstitutionLayout