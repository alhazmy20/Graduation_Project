import React, { cloneElement, useState } from "react";
import "./ProfileImage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faFolder,
  faXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Image, Modal, notification } from "antd";
import api from "../../../data/axiosConfig";
import { useAuth } from "../../../auth/useContext";

const ProfileImage = ({ name, personalPicture_url, id, userType }) => {
  const auth = useAuth();
  const formData = new FormData();
  const [imageSrc, setImageSrc] = useState(personalPicture_url);
  const [deleted, setDeleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setImageSrc(reader.result);
      setDeleted(true);
      console.log(file);

      // Create a new FormData object
      formData.append(
        userType === "institutions" ? "logo" : "personalPicture",
        file
      );

      // Send the image to the API using Axios
      try {
       const res = await api().put(
          `api/${userType}/${id || auth.user.id}/uploadImage?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(...formData);
        notification.success({ message: "تم تحديث الصورة الشخصية بنجاح" });
      } catch (error) {
        console.log(error);
        notification.error({ message: "لم يتم تحديث الصورة الشخصية" });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const res = await api().put(
        `api/institutions/${id || auth.user.id}/upload`,
        { deleteInstitutionLogo: "1" }
      );
      console.log(res);
      setImageSrc(null);
      setDeleted(false);
      setIsModalVisible(false);
      notification.success({ message: "تم حذف الصورة الشخصية بنجاح" });
    } catch (error) {
      notification.error({ message: "لم يتم حذف الصورة الشخصية" });
    }
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
    (deleted || imageSrc) && {
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
        <span className="name">{name}</span>
      </div>
    </div>
  );
};

export default ProfileImage;
