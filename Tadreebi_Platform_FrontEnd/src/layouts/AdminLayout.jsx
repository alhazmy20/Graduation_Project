import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Container from "./Container/Container";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <AdminSidebar />
      <Container colLg={24}>
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminLayout;
