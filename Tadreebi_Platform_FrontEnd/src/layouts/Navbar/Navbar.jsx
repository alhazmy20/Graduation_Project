import React, { useState } from "react";
import "../Navbar/Navbar.scss";
// import menu from "../../assets/images/menu.png";
import { Button, Drawer, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import RegisterModal from "../../pages/general/RegisterModal/RegisterModal";

const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    // <nav className="navbar">
    //   <div className="container">
    //     <img onClick={showDrawer} className="huborger" src={menu} alt=""></img>
    //     <Drawer
    //       rootClassName="mobile__menu"
    //       placement="right"
    //       onClose={onClose}
    //       open={open}
    //     >
    //       <Link className="link" to="/">
    //         <h6 className="mobile_link">تدريبي</h6>
    //       </Link>
    //       <Link className="link" to="/?">
    //         <h6 className="mobile_link">فرص التدريب</h6>
    //       </Link>
    //       <Link className="link" to="/news">
    //         <h6 className="mobile_link">اخبار التدريب</h6>
    //       </Link>
    //       <Link className="link" to="/?">
    //         <h6 className="mobile_link">نبذة عنا</h6>
    //       </Link>
    //       <Link className="link" to="/?">
    //         <h6 className="mobile_link">تواصل معنا</h6>
    //       </Link>
    //     </Drawer>
    //     <div className="logo ">
    //       <Link className="link" to="/">
    //         تدريبي
    //       </Link>
    //     </div>
    //     <div className="links ">
    // <Link className="link" to="/?">
    //   <h6>فرص التدريب</h6>
    // </Link>
    //       <Link className="link" to="/news">
    //         <h6>اخبار التدريب</h6>
    //       </Link>
    //       <Link className="link" to="/#about" reloadDocument>
    //         <h6>نبذة عنا</h6>
    //       </Link>
    //       <Link className="link" to="/?">
    //         <h6>تواصل معنا</h6>
    //       </Link>
    //     </div>
    //   </div>
    // <div className="register">
    //   <button>إنشاء حساب</button>
    //   <button>تسجيل الدخول</button>
    // </div>
    // </nav>
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
        <AppMenu  />
      </span>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
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

const AppMenu = ({ isInline = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="appMenuContainer">
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        className="navBarMenu"
        mode={isInline ? "inline" : "horizontal"}
        items={[
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
        ]}
      ></Menu>

      <div className="register">
        <Button
          className="signUpNavBar"
          type="link"
          onClick={() => setIsModalOpen(true)}
        >
          إنشاء حساب
        </Button>
        <Button
          className="loginNavBar"
          type="link"
          onClick={() => setIsModalOpen(true)}
        >
          تسجيل الدخول
        </Button>
        <RegisterModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}  />
      </div>
    </div>
  );
};
export default Navbar;
