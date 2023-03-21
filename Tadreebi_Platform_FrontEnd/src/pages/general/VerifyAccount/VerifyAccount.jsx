import { Card } from "antd";
import React from "react";
import "./VerifyAccount.scss";
import emailBlocker from "../../../assets/images/email-blocker.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const VerifyAccount = () => {
  return (
    <div className="verify-account">
      <Card className="card">
        <div className="container">
          {" "}
          <img src={emailBlocker} alt="" />
          <h5 className="message">لم يتم التحقق من البريد الإلكتروني</h5>
          <span className="line"></span>
          <p className="content">
            لإكمال عملية التسجيل، يجب عليك تفعيل حسابك من خلال الرابط المرسل
            إلى عنوان بريدك الإلكتروني. اذا لم تتلق رسالة على بريدك الإلكتروني،
            فيرجى التحقق من البريد العشوائي.
          </p>
          <div className="link-to-home">
            <FontAwesomeIcon className="icon" icon={faHome} />
            <Link to='/' className='link'>الصفحة الرئيسية</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerifyAccount;
