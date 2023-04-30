import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useRevalidator } from 'react-router-dom';
import api from "../../../../data/axiosConfig";
import { displayMessage } from '../../../../util/helpers';

const NewsModal = ({ modalOpen, setModalOpen, name, newsId }) => {
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();

  const handleDeleteNews = async () => {
    try {
      setLoading(true);
      await api().delete(`api/news/${newsId}`);
      setLoading(false);
      setModalOpen(false);
      revalidator.revalidate(); //revalidate the data
      displayMessage("success", `تم حذف الخبر "${name}"`);
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

    <div className="delText">هل أنت متأكد من حذف الخبر: {name}؟</div>
    <span className="smallDelText">*في حال قمت بالحذف لن يمكنك استرجاع الخبر</span>
    <div className="StudentsModal">
          <Button className="delButton"
          onClick={handleDeleteNews}
          loading={loading}
          disabled={loading}
          >حذف</Button>
          <Button className="cancelButton" onClick={() => setModalOpen(false)}>الغاء</Button>
    </div>
  </Modal>
  )
}

export default NewsModal