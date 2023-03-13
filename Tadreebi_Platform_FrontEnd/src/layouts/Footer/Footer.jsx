import React from "react";
import "../Footer/Footer.scss";
import instagram from "../../assets/images/instagram.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="copy">جميع الحقوق محفوظة لشركة تدريبي © 2023</div>
      <div className="social">
        <img src={twitter} alt=""></img>
        <img src={instagram} alt=""></img>
        <img src={linkedin} alt=""></img>
      </div>
    </footer>
  );
};

export default Footer;
