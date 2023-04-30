import "./StudentDeleteModal.scss";
import { Modal } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import { useRevalidator } from "react-router-dom";
import api from "../../../../data/axiosConfig";
import { displayMessage } from "../../../../util/helpers";

const StudentDeleteModal = ({ modalOpen, setModalOpen, name, studentId }) => {
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();

  const handleDeleteStudent = async () => {
    try {
      setLoading(true);
      await api().delete(`api/students/${studentId}`);
      setLoading(false);
      setModalOpen(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage("success", `تم حذف الطالب "${name}"`);
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
      <div className="delText">هل أنت متأكد من حذف الطالب "{name}"؟</div>
      <span className="smallDelText">
        *في حال قمت بالحذف لن يمكنك استرجاع حساب الطالب
      </span>
      <div className="btnContainer">
        <Button
          className="redBtn"
          onClick={handleDeleteStudent}
          loading={loading}
          disabled={loading}
        >
          حذف
        </Button>
        <Button className="greenBtn" onClick={() => setModalOpen(false)}>
          الغاء
        </Button>
      </div>
    </Modal>
  );
};
export default StudentDeleteModal;
