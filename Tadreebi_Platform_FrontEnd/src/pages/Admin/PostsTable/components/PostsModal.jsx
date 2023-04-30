import { Button, Modal } from 'antd'
import React from 'react'

const PostsModal = ( {modalOpen, setModalOpen, name }) => {
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
    <span className="smallDelText">*في حال قمت بالحذف لن يمكنك استرجاع الاعلان</span>
    <div className="btnContainer">
          <Button className="redBtn">حذف</Button>
          <Button className="greenBtn">الغاء</Button>
    </div>
  </Modal>
  )
}

export default PostsModal