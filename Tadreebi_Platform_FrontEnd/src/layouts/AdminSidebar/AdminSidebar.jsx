import React from "react";
import "./AdminSidebar.scss";
import { NavLink, Link } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  return (
    <div className="SideBarContainer">
      <Sidebar className="Sidebar" rtl>
        <div className="platformContainer">
          <span className="Platform">تدريبي</span>
          <span className="Name">عبدالمحسن الحازمي</span>
          <hr className="hLine" />
        </div>
        <Menu
          transitionDuration={750}
          renderExpandIcon={({ open }) => <span>{open ? "-" : "+"}</span>}
        >
          <NavLink to={"/admin"} end>
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
          <NavLink
            className={() =>
              window.location.pathname === "/admin/studentstable" ||
              window.location.pathname === "/admin/manage-institution" ||
              window.location.pathname === "/admin/manage-admin"
                ? "MenuItem"
                : "MenuItem notActive"
            }
          >
            <SubMenu
              defaultOpen={
                window.location.pathname === "/admin/studentstable" ||
                window.location.pathname === "/admin/manage-institution" ||
                window.location.pathname === "/admin/manage-admin"
                  ? true
                  : false
              }
              className="MenuItem"
              label="ادارة المستخدمين"
              icon={<FontAwesomeIcon icon={faPerson} />}
            >
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                  }
                  to={"/admin/manage-institution"}
                  end
                >
                  <MenuItem> ادارة المؤسسات </MenuItem>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                  }
                  to={`/admin/studentstable`}
                  end
                >
                  <MenuItem> ادارة الطلاب </MenuItem>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                  }
                  to={"/admin/manage-admin"}
                  end
                >
                  <MenuItem> ادارة المشرفين </MenuItem>
                </NavLink>
              </>
            </SubMenu>
          </NavLink>

          <NavLink
            className={() =>
              window.location.pathname === "/admin/manage-news" ||
              window.location.pathname === "/admin/manage-posts"
                ? "MenuItem"
                : "MenuItem notActive"
            }
          >
            <SubMenu
              defaultOpen={
                window.location.pathname === "/admin/manage-news" ||
                window.location.pathname === "/admin/manage-posts"
                  ? true
                  : false
              }
              className="MenuItem"
              label="ادارة المحتوى"
              icon={<FontAwesomeIcon icon={faClipboard} />}
            >
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                  }
                  to={"/admin/manage-posts"}
                  end
                >
                  <MenuItem>ادارة فرص التدريب</MenuItem>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                  }
                  to={"/admin/manage-news"}
                  end
                >
                  <MenuItem>ادارة اخبار التدريب</MenuItem>
                </NavLink>
              </>
            </SubMenu>
          </NavLink>
          <NavLink to={"/admin/profile"} end>
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
          <NavLink to={"/admin/logout"} end>
            {({ isActive }) => (
              <MenuItem
                className={
                  isActive ? "activeMenu MenuItem" : "MenuItem notActive"
                }
                icon={<FontAwesomeIcon icon={faSignOut} />}
              >
                {" "}
                تسجيل خروج{" "}
              </MenuItem>
            )}
          </NavLink>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
