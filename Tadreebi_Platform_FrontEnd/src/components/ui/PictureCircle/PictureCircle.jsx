import React from "react";
import "./PictureCircle.scss";
import { PlusOutlined } from "@ant-design/icons";
import {  message, Modal, Upload } from "antd";
import { useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PictureCircle = (props) => {
  const defaultFile = {
    uid: "-1",
    name: "default.png",
    status: "done",
    url: "https://www14.0zz0.com/2023/03/21/05/888604514.png",
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([defaultFile]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   if (newFileList.length > 0 && newFileList[0].status === "uploading") {
  //     newFileList[0].status = "done";
  //   }
  //   setFileList(newFileList);
  // };

  const [messageShown, setMessageShown] = useState(false);

const handleChange = ({ fileList: newFileList }) => {
  if (newFileList.length > 0 && newFileList[0].status === "uploading") {
    newFileList[0].status = "done"
    if (!messageShown) {
      message.success('تم تحديث الصورة الشخصية بنجاح');
      setMessageShown(true);
    }
  } else {
    setMessageShown(false);
  }
  setFileList(newFileList);
};


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
          fontWeight: "500",
        }}
      >
        إضافة
      </div>
    </div>
  );

  return (
    <div className={`${props.className} picture-circle`}>
      <Upload
        action="http://localhost:4000/process_insert"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept=".jpeg, .png, .jpg"
      >
        {fileList.length === 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="صورة العرض"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default PictureCircle;
