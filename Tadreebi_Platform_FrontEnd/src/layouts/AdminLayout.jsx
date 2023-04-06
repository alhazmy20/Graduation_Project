import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Container from "./Container/Container";
import { Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';

const AdminLayout = () => {
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
