import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            تدريبي
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?">
            <h6>فرص التدريب</h6>
          </Link>
          <Link className="link" to="/?">
            <h6>اخبار التدريب</h6>
          </Link>
          <Link className="link" to="/?">
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
