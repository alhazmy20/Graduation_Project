import React, { useState } from "react";
import "../Navbar/Navbar.scss";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import AppMenu from "./components/AppMenu";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="menuIcon"
        style={{
          backgroundColor: "#249283",
          height: 60,
          paddingRight: 12,
          paddingTop: 12,
        }}
      >
        <MenuOutlined
          style={{
            color: "white",
            fontSize: 30,
          }}
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>

      <span className="headerMenu">
        <AppMenu />
      </span>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        closable={true}
        headerStyle={{ backgroundColor: "#249283" }}
        bodyStyle={{
          backgroundColor: "#249283",
          color: "white",
          fontSize: 24,
          textAlign: "center",
          border: "none",
        }}
      >
        <AppMenu isInline />
      </Drawer>
    </div>
  );
};

export default Navbar;
