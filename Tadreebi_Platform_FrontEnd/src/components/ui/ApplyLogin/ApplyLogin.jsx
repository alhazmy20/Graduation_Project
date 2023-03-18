import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import "./ApplyLogin.scss";
const ApplyLogin = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      title=""
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
    >
      <div className="Applymodal">
        <div className="Applycontainer">
          <span>للتقديم على الطلب الرجاء تسجيل الدخول</span>
        </div>
        <Link to="/student/signup" className="applybutton">
          تسجيل الدخول
        </Link>
      </div>
    </Modal>
  );
};

export default ApplyLogin;
