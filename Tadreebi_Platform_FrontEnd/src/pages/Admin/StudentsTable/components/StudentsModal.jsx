import "./StudentsModal.scss";
import { Modal } from "antd";
import React from "react";
import {Button} from "antd";

const StudentsModal = ({ modalOpen, setModalOpen, name }) => {
  return (
    <Modal
      title="تنبيه:"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
      className="mod"
    >

      <div className="delText">هل أنت متأكد من حذف الطالب {name}؟</div>
      <span className="smallDelText">*في حال قمت بالحذف لن يمكنك استرجاع حساب الطالب</span>
      <div className="StudentsModal">
            <Button className="delButton">حذف</Button>
            <Button className="cancelButton">الغاء</Button>
      </div>
    </Modal>
  );
};
export default StudentsModal;