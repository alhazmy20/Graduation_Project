import React, { useContext } from "react";
import RegisterationMenu from "./RegisterationMenu";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import UserInfo from "./UserInfo";
import { AuthContext } from "../../../auth/useContext.js";

const AppMenu = ({ isInline = false }) => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const itemsMenu = [
    {
      label: "تدريبي",
      key: "/",
      style: { fontSize: 20 },
    },

    {
      label: "فرص التدريب",
      key: "/training-opportunities",
    },

    {
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

      {currentUser ? <UserInfo /> : <RegisterationMenu />}
    </div>
  );
};

export default AppMenu;
