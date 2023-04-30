import "./InstitutionDeleteModal.scss";
import { Modal } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import { useRevalidator } from "react-router-dom";
import api from "../../../../data/axiosConfig";
import { displayMessage } from "../../../../util/helpers";

const InstitutionDeleteModal = ({
  modalOpen,
  setModalOpen,
  name,
  institutionId,
}) => {
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();

  const handleDeleteInstitution = async () => {
    try {
      setLoading(true);
      await api().delete(`api/institutions/${institutionId}`);
      setLoading(false);
      setModalOpen(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage("success", `تم حذف المنشأة "${name}"`);
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
      <div className="delText">هل أنت متأكد من حذف "{name}"؟</div>
      <span className="smallDelText">
        *في حال قمت بالحذف لن يمكنك استرجاع حساب المنشأة
      </span>
      <div className="StudentsModal">
        <Button
          className="delButton"
          onClick={handleDeleteInstitution}
          loading={loading}
          disabled={loading}
        >
          حذف
        </Button>{" "}
        <Button className="cancelButton" onClick={() => setModalOpen(false)}>
          الغاء
        </Button>
      </div>
    </Modal>
  );
};
export default InstitutionDeleteModal;
