import React from "react";
import RegisterationMenu from "./RegisterationMenu";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import UserInfo from "./UserInfo";
import { useAuth } from "../../../auth/useContext.js";
import "./AppMenu.scss";
const AppMenu = ({ isInline = false }) => {
  const auth = useAuth();

  const navigate = useNavigate();
  const InstitutionMenu = auth.user?.role === "Institution";
  const StudentMenu = auth.user?.role !== "Institution";

  const itemsMenu = [
    {
      label: "تدريبي",
      key: "/",
      style: { fontSize: 20 },
    },
    StudentMenu && {
      label: "فرص التدريب",
      key: "/training-opportunities",
    },

    {
      label: "شركائنا",
      key: "/InstitutionInfo",
    },
    InstitutionMenu && {
      label: "البرامج التدريبة ",
      key: "/institution/posts",
    },
    StudentMenu && {
      label: "اخبار التدريب",
      key: "/news",
    },

    {
      label: <a href="#about">نبذة عنا</a>,
      key: "/#about",
    },

    {
      label: "تواصل معنا",
      key: "تواصل معنا",
    },
  ];

  return (
    <div className="appMenuContainer">
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        className="navBarMenu"
        mode={isInline ? "inline" : "horizontal"}
        items={itemsMenu}
      ></Menu>

      {auth.user ? <UserInfo /> : <RegisterationMenu />}
    </div>
  );
};

export default AppMenu;
