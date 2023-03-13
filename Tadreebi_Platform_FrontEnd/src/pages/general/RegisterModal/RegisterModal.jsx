import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding } from "@fortawesome/free-solid-svg-icons";
import "./RegisterModal.scss";

import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const RegisterModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      title="إنشاء حساب"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
    >
      <div className="reg-modal">
        <Link to="/student/signup">
          <div className="icon-container">
            <FontAwesomeIcon className="user-icon" icon={faUser} />
            <span>الطلاب</span>
          </div>
        </Link>
        <Link to="/institution/signup">
          <div className="icon-container">
            <FontAwesomeIcon className="building-icon" icon={faBuilding} />
            <span>جهات التدريب</span>
          </div>
        </Link>
      </div>
    </Modal>
  );
};
export default RegisterModal;
