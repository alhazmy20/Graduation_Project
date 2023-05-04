import React from "react";
import Container from "./Container/Container";
import { Navigate, Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useAuth } from '../auth/useContext';
import SupervisorSidebar from "./SupervisorSidebar/SupervisorSidebar";

const SupervisorLayout = () => {
  return (
    <ProSidebarProvider>
    <div className="admin-layout" style={{ display: "flex" }}>
          <SupervisorSidebar/>
          <Container colLg={24}>
            <Outlet />
          </Container>
        </div>
        </ProSidebarProvider>
  )
}

export default SupervisorLayout;