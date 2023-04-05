import React, { useState } from "react";
import "./ProfileImage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faFolder,
  faXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Image, Modal } from "antd";
import axios from "axios";

const ProfileImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setDeleted(true);

      // Create a new FormData object
    //   const formData = new FormData();
    //   formData.append("image", file);

      // Send the image to the API using Axios
    //   axios
    //     .post("https://example.com/upload-image", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setImageSrc(null);
    setDeleted(false);
    setIsModalVisible(false);
    // Send the deleted image to the API here
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <label
          htmlFor="image-upload"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "11px",
            cursor: "pointer",
            color: "#4A98AE",
          }}
        >
          <FontAwesomeIcon name="folder-icon" icon={faFolder} />
          تحميل صورة
        </label>
      ),
    },
    deleted && {
      key: "2",
      label: (
        <span
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "11px",
            color: "red",
          }}
          onClick={handleImageDelete}
        >
          <FontAwesomeIcon name="folder-icon" icon={faXmark} />
          حذف الصورة
        </span>
      ),
    },
  ];
  return (
    <div className="profile-image">
      <div className="container">
        <div className="circle">
          <Image
            preview={{ mask: <FontAwesomeIcon icon={faEye} /> }}
            src={
              imageSrc ||
              "http://s3.eu-central-1.amazonaws.com/graduation-project-test1/students/personal_pictures/0cPAv3DmiR6OJoWWBWod0ef3V5PssfWVAness7k6.png"
            }
            alt=""
            width={75}
            height={75}
            style={{ fontSize: "18px", borderRadius: "50%" }}
            loading="lazy"
          />
          <Dropdown menu={{ items }} placement="bottom" className="menu">
            <FontAwesomeIcon className="icon" icon={faPen} />
          </Dropdown>
          <input
            type="file"
            id="image-upload"
            // ref={deleted ? React.createRef() : null}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />

          <Modal
            title="هل تريد حذف الصورة؟"
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="موافق"
            cancelText="إلغاء"
          >
            <p>سيتم حذف الصورة نهائياً. هل أنت متأكد؟</p>
          </Modal>
        </div>
        <span className="name">يزيد العلوي</span>
      </div>
    </div>
  );
};

export default ProfileImage;
