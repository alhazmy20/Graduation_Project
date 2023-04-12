import { Button, Modal } from 'antd'
import React from 'react'

const NewsModal = ({ modalOpen, setModalOpen, name }) => {
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
          <Button className="delButton">حذف</Button>
          <Button className="cancelButton">الغاء</Button>
    </div>
  </Modal>
  )
}

export default NewsModal