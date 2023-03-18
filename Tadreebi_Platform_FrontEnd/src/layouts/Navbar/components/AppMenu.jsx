import React from "react";
import RegisterationMenu from "./RegisterationMenu";
import { useNavigate } from "react-router-dom";
import { Menu, Anchor } from "antd";
const AppMenu = ({ isInline = false }) => {
  const navigate = useNavigate();

  const itemsMenu = [
    {
      label: "تدريبي",
      key: "/",
      style: { fontSize: 20 },
    },

    {
      label: "فرص التدريب",
      key: "فرص التدريب",
    },

    {
      label: "اخبار التدريب",
      key: "/news",
    },

    {
      label: "نبذة عنا",
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
      <RegisterationMenu />
    </div>
  );
};

export default AppMenu;
