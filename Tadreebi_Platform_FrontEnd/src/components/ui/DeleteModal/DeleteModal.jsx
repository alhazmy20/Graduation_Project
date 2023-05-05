import React, { useState } from "react";
import "./DeleteModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRevalidator } from "react-router-dom";
import axiosConfig from "../../../util/axiosConfig";
import { displayMessage } from "../../../util/helpers";
import { Button, Modal } from "antd";

const DeleteModal = ({ name, id, endpoint, deleteType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosConfig().delete(`api/${endpoint}/${id}`);
      setLoading(false);
      setIsModalOpen(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage("success", `تم حذف ${deleteType} "${name}"`);
    } catch (error) {
      setLoading(false);
      displayMessage("error", `هناك خطأ ما`);
    }
  };

  return (
    <span>
      <span onClick={() => setIsModalOpen(true)}>
        {
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
          />
        }
      </span>

      <Modal
        title="تنبيه:"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        className="delete-modal"
      >
        <div className="delText">
          هل أنت متأكد من حذف {deleteType} "{name}"؟
        </div>
        <span className="smallDelText">
          *في حال قمت بالحذف لن يمكنك استرجاع {deleteType}
        </span>
        <div className="btnContainer">
          <Button
            className="redBtn"
            onClick={handleDelete}
            loading={loading}
            disabled={loading}
          >
            حذف
          </Button>
          <Button className="greenBtn" onClick={() => setIsModalOpen(false)}>
            الغاء
          </Button>
        </div>
      </Modal>
    </span>
  );
};

export default DeleteModal;
