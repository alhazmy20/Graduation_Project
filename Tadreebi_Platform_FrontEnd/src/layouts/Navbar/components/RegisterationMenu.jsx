import React from "react";
import "../Navbar.scss";
import { Link } from "react-router-dom";
import { Button } from "antd";

const RegisterationMenu = () => {
  return (
    <div className="register">
      <Button className="signUpNavBar" type="link">
        إنشاء حساب
      </Button>
      <Link className="loginNavBar" to="/login">
        تسجيل الدخول
      </Link>
    </div>
  );
};

export default RegisterationMenu;
