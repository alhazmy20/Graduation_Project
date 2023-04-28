import "./AdminsModal.scss";
import { Modal } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import api from "../../../../data/axiosConfig";
import { displayMessage } from "../../../../util/helpers";

const AdminsModal = ({ modalOpen, setModalOpen, name, adminId }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAdmin = async () => {
    try {
      setLoading(true);
      await api().delete(`api/admins/${adminId}`);
      setLoading(false);
      setModalOpen(false);
      displayMessage("success", `تم حذف المشرف ${name}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Modal
      title="تنبيه:"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
      className="mod"
    >
      <div className="delText">هل أنت متأكد من حذف المشرف "{name}" ؟</div>
      <span className="smallDelText">
        *في حال قمت بالحذف لن يمكنك استرجاع حساب المشرف
      </span>
      <div className="StudentsModal">
        <Button
          className="delButton"
          onClick={handleDeleteAdmin}
          loading={loading}
          disabled={loading}
        >
          حذف
        </Button>
        <Button className="cancelButton" onClick={() => setModalOpen(false)}>
          الغاء
        </Button>
      </div>
    </Modal>
  );
};
export default AdminsModal;
