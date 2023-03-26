import "./InstModal.scss";
import { Modal } from "antd";
import React from "react";
import {Button} from "antd";

const InstModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      title="هل أنت متأكد من حذف هذا البرنامج؟"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
    >
      <div className="instModal">
            <Button className="delButton">حذف</Button>
      </div>
    </Modal>
  );
};
export default InstModal;
