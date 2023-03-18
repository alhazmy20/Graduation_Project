import React, { useState } from "react";
import "../Navbar.scss";
import { Link } from "react-router-dom";
import { Button, Drawer, Menu } from "antd";

import RegisterModal from "../../../pages/general/RegisterModal/RegisterModal";
const RegisterationMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="register">
      <Button
        className="signUpNavBar"
        type="link"
        onClick={() => setIsModalOpen(true)}
      >
        إنشاء حساب
      </Button>
      <Link className="loginNavBar" to="/login">
        تسجيل الدخول
      </Link>
      <RegisterModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
    </div>
  );
};

export default RegisterationMenu;
