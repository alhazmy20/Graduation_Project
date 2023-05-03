import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useRevalidator } from "react-router-dom";
import api from "../../../../data/axiosConfig";
import { displayMessage } from "../../../../util/helpers";

const PostDeleteModal = ({ modalOpen, setModalOpen, name, postId }) => {
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await api().delete(`api/posts/${postId}`);
      setLoading(false);
      setModalOpen(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage("success", `تم حذف الإعلان`);
    } catch (error) {
      setLoading(false);
      displayMessage("error", `هناك خطأ ما`);
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
      <div className="delText">هل أنت متأكد من حذف الاعلان: {name}؟</div>
      <span className="smallDelText">
        *في حال قمت بالحذف لن يمكنك استرجاع الاعلان
      </span>
      <div className="btnContainer">
        <Button
          className="redBtn"
          onClick={handleDeletePost}
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

export default PostDeleteModal;
