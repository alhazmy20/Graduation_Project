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
          <span>الرجاء تسجيل الدخول للتقديم على الفرصة التدريبية</span>
        </div>
        <Link to="/login" className="applybutton">
          تسجيل الدخول
        </Link>
      </div>
    </Modal>
  );
};

export default ApplyLogin;
