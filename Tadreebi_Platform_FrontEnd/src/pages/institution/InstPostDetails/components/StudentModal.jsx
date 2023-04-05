import { Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import "./StudentModal.scss";

const StudentModal = ({ detailsOpen, setDetailsOpen }) => {
  return (
    <Modal
      open={detailsOpen}
      onOk={() => setDetailsOpen(false)}
      onCancel={() => setDetailsOpen(false)}
      footer={[]}
    >
      <div className="StudentModalContainer">
        <div className="AvatarName">
          <Avatar size={100} icon={<UserOutlined />} />
          <span>
            <strong>يزيد نفاع العلوي</strong>
          </span>
        </div>
        <div className="Row">
        <div className="ColOne">
          <strong>رقم الهوية الوطنية: 110XXXXXXXX</strong>
          <strong>الجوال: 05XXXXXXXXX</strong>
          <strong>البريد الالكتروني: xxxxxxx@hotmail.com</strong>
        </div>

        <div className="ColTwo">
          <strong>الجامعة: جامعة طيبة</strong>
          <strong>التخصص: نظم معلومات</strong>
          <strong>المعدل: 4.9/5</strong>
        </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentModal;
