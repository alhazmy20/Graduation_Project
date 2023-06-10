import React, { useState } from "react";
import "./ProfileImage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faFolder,
  faXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Image, Modal, message } from "antd";
import axiosConfig from "../../../util/axiosConfig";
import { useAuth } from "../../../auth/useContext";
import { displayMessage } from "../../../util/helpers";

const ProfileImage = ({ name, personalPicture_url, id, userType }) => {
  const auth = useAuth();
  const formData = new FormData();
  const [imageSrc, setImageSrc] = useState(personalPicture_url);
  const [deleted, setDeleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setImageSrc(reader.result);
      setDeleted(true);

      // Create a new FormData object
      formData.append(
        userType === "institutions" ? "logo" : "personalPicture",
        file
      );

      // Send the image to the API using Axios
      try {
        await axiosConfig().post(
          `api/${userType}/${id || auth?.user?.id}/uploadImage?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        displayMessage("success", "تم تحديث الصورة الشخصية");
      } catch (error) {
        displayMessage("error", "لم يتم تحديث الصورة الشخصية");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const action =
      userType === "institutions"
        ? { deleteInstitutionLogo: "1" }
        : { deletePersonalPicture: "1" };
    try {
      const res = await axiosConfig().put(
        `api/${userType}/${id || auth?.user?.id}/uploadImage`,
        action
      );
      setImageSrc(null);
      setDeleted(false);
      setIsModalVisible(false);
      displayMessage("success", "تم حذف الصورة الشخصية");
    } catch (error) {
      displayMessage("error", " لم يتم حذف الصورة الشخصية");
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
      {contextHolder}
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
