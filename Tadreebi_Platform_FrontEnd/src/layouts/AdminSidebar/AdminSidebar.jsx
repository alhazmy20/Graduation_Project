import React from "react";
import { NavLink} from "react-router-dom";
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

const AdminSidebar = () => {
  const auth = useAuth();

  const { toggleSidebar} =
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
                window.location.pathname === "/admin/manage-students" ||
                window.location.pathname === "/admin/manage-institutions" ||
                window.location.pathname === "/admin/manage-admins" ||
                window.location.pathname === "/admin/manage-supervisors"
                  ? "MenuItem"
                  : "MenuItem notActive"
              }
            >
              <SubMenu
                defaultOpen={
                  window.location.pathname === "/admin/manage-students" ||
                  window.location.pathname === "/admin/manage-institutions" ||
                  window.location.pathname === "/admin/manage-admins" ||
                  window.location.pathname === "/admin/manage-supervisors" 

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
                    to={"/admin/manage-institutions"}
                    end
                  >
                    <MenuItem> ادارة المنشآت </MenuItem>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                    }
                    to={`/admin/manage-students`}
                    end
                  >
                    <MenuItem> ادارة الطلاب </MenuItem>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                    }
                    to={"/admin/manage-supervisors"}
                    end
                  >
                    <MenuItem> ادارة مشرفين الجامعات </MenuItem>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "SubMenu activeMenu" : "SubMenu notActive"
                    }
                    to={"/admin/manage-admins"}
                    end
                  >
                    {auth?.user?.role === "SuperAdmin" && (
                      <MenuItem> ادارة المشرفين </MenuItem>
                    )}
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
  );
};

export default AdminSidebar;
