import React, { useState } from "react";
import "../Navbar/Navbar.scss";
import menu from "../../assets/images/menu.png";
import { Drawer } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
 
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <img onClick={showDrawer} className="huborger" src={menu} alt=""></img>
        <Drawer
          rootClassName="mobile__menu"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <Link className="link" to="/">
            <h6 className="mobile_link">تدريبي</h6>
          </Link>
          <Link className="link" to="/?">
            <h6 className="mobile_link">فرص التدريب</h6>
          </Link>
          <Link className="link" to="/news">
            <h6 className="mobile_link">اخبار التدريب</h6>
          </Link>
          <Link className="link" to="/?">
            <h6 className="mobile_link">نبذة عنا</h6>
          </Link>
          <Link className="link" to="/?">
            <h6 className="mobile_link">تواصل معنا</h6>
          </Link>
        </Drawer>
        <div className="logo ">
          <Link className="link" to="/">
            تدريبي
          </Link>
        </div>
        <div className="links ">
          <Link className="link" to="/?">
            <h6>فرص التدريب</h6>
          </Link>
          <Link className="link" to="/news">
            <h6>اخبار التدريب</h6>
          </Link>
          <Link className="link" to="/#about" reloadDocument>
            <h6>نبذة عنا</h6>
          </Link>
          <Link className="link" to="/?">
            <h6>تواصل معنا</h6>
          </Link>
        </div>
      </div>
      <div className="register">
        <button>إنشاء حساب</button>
        <button>تسجيل الدخول</button>
      </div>
    </nav>
  );
};

export default Navbar;
