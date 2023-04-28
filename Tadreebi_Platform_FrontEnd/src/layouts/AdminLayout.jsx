import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Container from "./Container/Container";
import { Navigate, Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useAuth } from '../auth/useContext';

const AdminLayout = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  if (auth.user?.role !== "Admin" && auth.user?.role !== "SuperAdmin") {
    return <Navigate to="/" />;
  }

  return (
    <ProSidebarProvider>
<div className="admin-layout" style={{ display: "flex" }}>
      <AdminSidebar />
      <Container colLg={24}>
        <Outlet />
      </Container>
    </div>
    </ProSidebarProvider>
  );
};

export default AdminLayout;
