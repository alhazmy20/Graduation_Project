import "./AdminsModal.scss";
import { Modal } from "antd";
import React from "react";
import {Button} from "antd";

const AdminsModal = ({ modalOpen, setModalOpen, name }) => {
  return (
    <Modal
      title="تنبيه:"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
      className="mod"
    >

      <div className="delText">هل أنت متأكد من حذف المشرف صاحب الإيميل {name}؟</div>
      <span className="smallDelText">*في حال قمت بالحذف لن يمكنك استرجاع حساب المشرف</span>
      <div className="StudentsModal">
            <Button className="delButton">حذف</Button>
            <Button className="cancelButton">الغاء</Button>
      </div>
    </Modal>
  );
};
export default AdminsModal;