import React from "react";
import "../Navbar.scss";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./RegisterationMenu.scss";
const RegisterationMenu = () => {
  return (
    <div className="register">
      <Link className="signUpNavBar" to="/signup">
        إنشاء حساب
      </Link>
      <Link className="loginNavBar" to="/login">
        تسجيل الدخول
      </Link>
    </div>
  );
};

export default RegisterationMenu;
