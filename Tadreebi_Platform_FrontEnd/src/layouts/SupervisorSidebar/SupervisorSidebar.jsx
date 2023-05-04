import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPerson,
  faClipboard,
  faInfoCircle,
  faSignOut,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { useAuth } from "../../auth/useContext";

const SupervisorSidebar = () => {
    const auth = useAuth();

    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
      useProSidebar();
  
  return (
    <>
      <aside className="SideBarContainer">
        <Sidebar customBreakPoint={"1399px"} className="Sidebar" rtl>
          <div className="platformContainer">
            <span className="Platform">تدريبي</span>
            <span className="Name">{`${auth.user.name}`}</span>
            <hr className="hLine" />
          </div>
          <Menu
            transitionDuration={750}
            renderExpandIcon={({ open }) => <span>{open ? "-" : "+"}</span>}
          >
            <NavLink to={"/supervisor"} end>
              {({ isActive }) => (
                <MenuItem
                  className={
                    isActive ? "activeMenu MenuItem" : "MenuItem notActive"
                  }
                  icon={<FontAwesomeIcon icon={faHome} />}
                >
                  الرئيسية
                </MenuItem>
              )}
            </NavLink>
            <NavLink to={"/supervisor/manage-applications"} end>
              {({ isActive }) => (
                <MenuItem
                  className={
                    isActive ? "activeMenu MenuItem" : "MenuItem notActive"
                  }
                  icon={<FontAwesomeIcon icon={faClipboard} />}
                >
                  ادارة الطلبات
                </MenuItem>
              )}
            </NavLink>
            <NavLink to={"/supervisor/all-students"} end>
              {({ isActive }) => (
                <MenuItem
                  className={
                    isActive ? "activeMenu MenuItem" : "MenuItem notActive"
                  }
                  icon={<FontAwesomeIcon icon={faPerson} />}
                >
                  {" "}
                  ادارة الطلاب{" "}
                </MenuItem>
              )}
            </NavLink>

            <NavLink to={"/supervisor/profile"} end>
              {({ isActive }) => (
                <MenuItem
                  className={
                    isActive ? "activeMenu MenuItem" : "MenuItem notActive"
                  }
                  icon={<FontAwesomeIcon icon={faInfoCircle} />}
                >
                  {" "}
                  الملف الشخصي{" "}
                </MenuItem>
              )}
            </NavLink>
            <NavLink onClick={() => auth.logout()} end>
              {
                <MenuItem
                  className={"MenuItem notActive"}
                  icon={<FontAwesomeIcon icon={faSignOut} />}
                >
                  {" "}
                  تسجيل خروج{" "}
                </MenuItem>
              }
            </NavLink>
          </Menu>
        </Sidebar>
      </aside>
      <main className="barsMain">
        <div className="barsDiv">
          <Button
            type="text"
            className="sb-button"
            onClick={() => toggleSidebar()}
          >
            <FontAwesomeIcon className="fa-xl" icon={faBars} />
          </Button>
        </div>
      </main>
    </>
  )
}

export default SupervisorSidebar